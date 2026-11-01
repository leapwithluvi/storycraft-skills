#!/usr/bin/env node

// StoryCraft Skills — Zero-dependency CLI & Multiplatform Sync Engine
// Parses SKILL.md files and compiles them into platform-specific formats.

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, copyFileSync, statSync } from 'node:fs';
import { join, resolve, basename, dirname, relative } from 'node:path';
import { argv, exit, cwd } from 'node:process';

// ─── ANSI Colors ───────────────────────────────────────────────────────────────
const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

// ─── Root Resolution ───────────────────────────────────────────────────────────
const ROOT = resolve(dirname(new URL(import.meta.url).pathname), '..');
const SKILLS_DIR = join(ROOT, 'skills');
const TEMPLATES_DIR = join(ROOT, 'templates');
const DIST_DIR = join(ROOT, 'dist');

// ─── YAML Frontmatter Parser (zero deps) ──────────────────────────────────────
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };

  const raw = match[1];
  const body = match[2];
  const meta = {};

  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;

    const key = trimmed.slice(0, colonIdx).trim();
    let value = trimmed.slice(colonIdx + 1).trim();

    // Handle quoted strings
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Handle arrays (inline YAML)
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(v => {
        v = v.trim();
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
          v = v.slice(1, -1);
        }
        return v;
      });
    }

    // Handle numbers
    if (!Array.isArray(value) && /^\d+$/.test(value)) {
      value = parseInt(value, 10);
    }

    meta[key] = value;
  }

  return { meta, body };
}

// ─── Section Detector ──────────────────────────────────────────────────────────
const REQUIRED_SECTIONS = [
  'Overview & Purpose',
  'When to Use & Trigger Phrases',
  'Core Literary Methodology & Rules',
  'Required Project State & Inputs',
  'Step-by-Step Execution Protocol',
  'Quality Checklist & Verification Criteria',
  'Anti-Patterns & Prohibited AI Tropes',
  'Concrete Examples',
  'Session State Hook',
];

function detectSections(body) {
  const found = [];
  for (const line of body.split('\n')) {
    const headingMatch = line.match(/^#{1,3}\s+(.+)/);
    if (headingMatch) {
      found.push(headingMatch[1].trim());
    }
  }
  return found;
}

function validateSections(found) {
  const missing = [];
  for (const req of REQUIRED_SECTIONS) {
    const hasIt = found.some(f => f.toLowerCase().includes(req.toLowerCase().split('(')[0].trim().split('&')[0].trim()));
    if (!hasIt) {
      // More lenient: check if any found heading contains key words from the required section
      const keywords = req.toLowerCase().split(/[\s&]+/).filter(w => w.length > 3);
      const lenientMatch = found.some(f => {
        const fLower = f.toLowerCase();
        return keywords.filter(k => fLower.includes(k)).length >= Math.ceil(keywords.length * 0.5);
      });
      if (!lenientMatch) missing.push(req);
    }
  }
  return missing;
}

// ─── REQUIRED Frontmatter Fields ───────────────────────────────────────────────
const REQUIRED_META = ['name', 'description', 'version', 'category', 'stage', 'tags'];

function validateMeta(meta, skillName) {
  const missing = REQUIRED_META.filter(k => !(k in meta));
  const errors = [];
  if (missing.length > 0) {
    errors.push(`Missing frontmatter fields: ${missing.join(', ')}`);
  }
  if (meta.name && meta.name !== 'using-storycraft' && !meta.name.startsWith('novel-')) {
    errors.push(`Skill name must start with "novel-" or be "using-storycraft": got "${meta.name}"`);
  }
  const validCategories = ['ideation', 'plotting', 'drafting', 'style', 'revision', 'continuity', 'auxiliary'];
  if (meta.category && !validCategories.includes(meta.category)) {
    errors.push(`Invalid category "${meta.category}". Must be one of: ${validCategories.join(', ')}`);
  }
  if (meta.stage !== undefined && (typeof meta.stage !== 'number' || meta.stage < 0 || meta.stage > 6)) {
    errors.push(`Stage must be a number between 0 and 6: got "${meta.stage}"`);
  }
  return errors;
}

// ─── Skill Parser ──────────────────────────────────────────────────────────────
function parseSkill(skillDir) {
  const skillFile = join(skillDir, 'SKILL.md');
  if (!existsSync(skillFile)) return null;

  const content = readFileSync(skillFile, 'utf-8');
  const { meta, body } = parseFrontmatter(content);
  const sections = detectSections(body);

  return {
    dir: skillDir,
    name: meta.name || basename(skillDir),
    description: meta.description || '',
    version: meta.version || '0.0.0',
    category: meta.category || 'unknown',
    stage: meta.stage ?? -1,
    tags: meta.tags || [],
    meta,
    body,
    sections,
    raw: content,
  };
}

function getAllSkills() {
  if (!existsSync(SKILLS_DIR)) return [];
  return readdirSync(SKILLS_DIR)
    .filter(d => statSync(join(SKILLS_DIR, d)).isDirectory())
    .map(d => parseSkill(join(SKILLS_DIR, d)))
    .filter(Boolean)
    .sort((a, b) => (a.stage ?? 99) - (b.stage ?? 99) || a.name.localeCompare(b.name));
}

// ─── CLI Commands ──────────────────────────────────────────────────────────────

function cmdList() {
  const skills = getAllSkills();
  if (skills.length === 0) {
    console.log(`${C.yellow}No skills found in ${SKILLS_DIR}${C.reset}`);
    return;
  }

  const stageNames = {
    0: 'Auxiliary',
    1: 'Ideation & Worldbuilding',
    2: 'Plotting & Structure',
    3: 'Scene Drafting & Beats',
    4: 'Dialogue & Voice',
    5: 'Revision & Editing',
    6: 'Continuity & Story Bible',
  };

  console.log(`\n${C.bold}${C.cyan}📚 StoryCraft Skills Catalog${C.reset}\n`);
  console.log(`${C.dim}${'─'.repeat(80)}${C.reset}`);

  let currentStage = -1;
  for (const skill of skills) {
    if (skill.stage !== currentStage) {
      currentStage = skill.stage;
      const stageName = stageNames[currentStage] || `Stage ${currentStage}`;
      console.log(`\n${C.bold}${C.magenta}  Stage ${currentStage}: ${stageName}${C.reset}`);
      console.log(`${C.dim}  ${'─'.repeat(76)}${C.reset}`);
    }
    const badge = `${C.green}v${skill.version}${C.reset}`;
    const cat = `${C.dim}[${skill.category}]${C.reset}`;
    console.log(`  ${C.cyan}${skill.name.padEnd(30)}${C.reset} ${badge}  ${cat}`);
    console.log(`  ${C.dim}${skill.description.slice(0, 74)}${C.reset}`);
    console.log();
  }

  console.log(`${C.dim}${'─'.repeat(80)}${C.reset}`);
  console.log(`${C.bold}Total: ${skills.length} skills${C.reset}\n`);
}

function cmdTest() {
  const skills = getAllSkills();
  if (skills.length === 0) {
    console.log(`${C.yellow}No skills found to test.${C.reset}`);
    return;
  }

  console.log(`\n${C.bold}${C.cyan}🧪 StoryCraft Skill Validator${C.reset}\n`);

  let totalErrors = 0;
  let passCount = 0;

  for (const skill of skills) {
    const errors = [];

    // Validate frontmatter
    errors.push(...validateMeta(skill.meta, skill.name));

    // Validate sections
    const missingSections = validateSections(skill.sections);
    if (missingSections.length > 0) {
      errors.push(`Missing required sections: ${missingSections.join(', ')}`);
    }

    // Validate body length (a real skill should have substantial content)
    if (skill.body.trim().length < 500) {
      errors.push(`Skill body is too short (${skill.body.trim().length} chars). Expected 500+ chars of instruction.`);
    }

    if (errors.length === 0) {
      console.log(`  ${C.green}✓${C.reset} ${skill.name}`);
      passCount++;
    } else {
      console.log(`  ${C.red}✗${C.reset} ${skill.name}`);
      for (const err of errors) {
        console.log(`    ${C.red}└─ ${err}${C.reset}`);
      }
      totalErrors += errors.length;
    }
  }

  console.log(`\n${C.dim}${'─'.repeat(60)}${C.reset}`);
  if (totalErrors === 0) {
    console.log(`${C.green}${C.bold}✓ All ${passCount}/${skills.length} skills passed validation.${C.reset}\n`);
  } else {
    console.log(`${C.red}${C.bold}✗ ${passCount}/${skills.length} passed, ${totalErrors} error(s) found.${C.reset}\n`);
    exit(1);
  }
}

// ─── Sync Engine ───────────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function syncToCursor(skills, outDir) {
  const rulesDir = join(outDir, '.cursor', 'rules');
  ensureDir(rulesDir);

  for (const skill of skills) {
    const mdc = `---
description: "${skill.description}"
globs:
alwaysApply: false
---

${skill.body}`;
    writeFileSync(join(rulesDir, `${skill.name}.mdc`), mdc);
  }
  return skills.length;
}

function syncToClaude(skills, outDir) {
  const rulesDir = join(outDir, '.claude', 'rules');
  ensureDir(rulesDir);

  // Individual rule files
  for (const skill of skills) {
    writeFileSync(join(rulesDir, `${skill.name}.md`), skill.body);
  }

  // Aggregated CLAUDE.md
  let claudeMd = `# StoryCraft Skills — Novel Writing Agent Instructions\n\n`;
  claudeMd += `> These rules equip the AI assistant with professional novel-writing craft.\n`;
  claudeMd += `> ${skills.length} specialized skills across the full fiction writing pipeline.\n\n`;

  const byStage = {};
  for (const s of skills) {
    const stage = s.stage ?? 0;
    if (!byStage[stage]) byStage[stage] = [];
    byStage[stage].push(s);
  }

  for (const [stage, stageSkills] of Object.entries(byStage).sort((a, b) => a[0] - b[0])) {
    claudeMd += `## Stage ${stage}\n\n`;
    for (const s of stageSkills) {
      claudeMd += `- **${s.name}**: ${s.description}\n`;
      claudeMd += `  - Rule file: \`.claude/rules/${s.name}.md\`\n`;
    }
    claudeMd += '\n';
  }

  writeFileSync(join(outDir, 'CLAUDE.md'), claudeMd);
  return skills.length;
}

function syncToCodex(skills, outDir) {
  const codexDir = join(outDir, 'codex');
  ensureDir(codexDir);

  // Individual files
  for (const skill of skills) {
    const content = `# ${skill.name}\n\n> ${skill.description}\n\n${skill.body}`;
    writeFileSync(join(codexDir, `${skill.name}.md`), content);
  }

  // Aggregated AGENTS.md
  let agentsMd = `# StoryCraft Skills — Novel Writing Agent Instructions\n\n`;
  agentsMd += `> Professional AI agent skills for novel writing craft.\n`;
  agentsMd += `> See individual files in \`dist/codex/\` for full instructions.\n\n`;

  for (const s of skills) {
    agentsMd += `## ${s.name}\n\n${s.description}\n\n`;
    agentsMd += `Full instructions: \`dist/codex/${s.name}.md\`\n\n---\n\n`;
  }

  writeFileSync(join(outDir, 'AGENTS.md'), agentsMd);
  return skills.length;
}

function syncToAntigravity(skills, outDir) {
  const skillsDir = join(outDir, '.agents', 'skills');
  const workflowsDir = join(outDir, '.agents', 'workflows');
  ensureDir(skillsDir);
  ensureDir(workflowsDir);

  for (const skill of skills) {
    const targetDir = join(skillsDir, skill.name);
    ensureDir(targetDir);
    writeFileSync(join(targetDir, 'SKILL.md'), skill.raw);

    // Generate workflow file for slash-command invocation (e.g. /novel-character-architect)
    const workflowContent = `# /${skill.name} Workflow

${skill.description}

## Activated Skill Instructions

When this workflow or slash command is triggered, the agent must adopt the persona, methodology, and execution protocol defined in [${skill.name}](file://.agents/skills/${skill.name}/SKILL.md):

${skill.body}
`;
    writeFileSync(join(workflowsDir, `${skill.name}.md`), workflowContent);
  }
  return skills.length;
}

function cmdSync(target) {
  const skills = getAllSkills();
  if (skills.length === 0) {
    console.log(`${C.yellow}No skills found to sync.${C.reset}`);
    return;
  }

  console.log(`\n${C.bold}${C.cyan}🔄 StoryCraft Sync Engine${C.reset}\n`);

  const targets = target === 'all' ? ['cursor', 'claude', 'codex', 'antigravity'] : [target];
  const validTargets = ['cursor', 'claude', 'codex', 'antigravity'];

  for (const t of targets) {
    if (!validTargets.includes(t)) {
      console.log(`${C.red}Unknown target: ${t}. Valid: ${validTargets.join(', ')}${C.reset}`);
      exit(1);
    }

    const outDir = DIST_DIR;
    ensureDir(outDir);

    let count = 0;
    switch (t) {
      case 'cursor': count = syncToCursor(skills, outDir); break;
      case 'claude': count = syncToClaude(skills, outDir); break;
      case 'codex': count = syncToCodex(skills, outDir); break;
      case 'antigravity': count = syncToAntigravity(skills, outDir); break;
    }

    console.log(`  ${C.green}✓${C.reset} ${t}: ${count} skill(s) exported to ${C.dim}${relative(ROOT, outDir)}/${C.reset}`);
  }

  console.log(`\n${C.green}${C.bold}Sync complete.${C.reset}\n`);
}

function cmdInit(targetDir) {
  const dir = resolve(targetDir || cwd());
  ensureDir(dir);

  console.log(`\n${C.bold}${C.cyan}📝 StoryCraft Workspace Init${C.reset}\n`);

  const files = [
    { src: 'story-state.template.md', dest: 'story-state.md' },
    { src: 'story-bible.template.md', dest: 'story-bible.md' },
  ];

  for (const { src, dest } of files) {
    const srcPath = join(TEMPLATES_DIR, src);
    const destPath = join(dir, dest);

    if (existsSync(destPath)) {
      console.log(`  ${C.yellow}⚠${C.reset} ${dest} already exists — skipped (won't overwrite)`);
    } else if (!existsSync(srcPath)) {
      console.log(`  ${C.red}✗${C.reset} Template not found: ${src}`);
    } else {
      copyFileSync(srcPath, destPath);
      console.log(`  ${C.green}✓${C.reset} Created ${dest}`);
    }
  }

  // Create manuscript folder and chapter 1 scaffold
  const manuscriptDir = join(dir, 'manuscript');
  ensureDir(manuscriptDir);
  const ch1Dest = join(manuscriptDir, 'chapter-01.md');
  const chSrc = join(TEMPLATES_DIR, 'chapter.template.md');
  if (!existsSync(ch1Dest) && existsSync(chSrc)) {
    copyFileSync(chSrc, ch1Dest);
    console.log(`  ${C.green}✓${C.reset} Created manuscript/chapter-01.md`);
  }

  // Create docs/storycraft planning and audit directories
  const docsStorycraftDir = join(dir, 'docs', 'storycraft');
  const auditsDir = join(docsStorycraftDir, 'audits');
  ensureDir(docsStorycraftDir);
  ensureDir(auditsDir);
  console.log(`  ${C.green}✓${C.reset} Created docs/storycraft/ (planning & pitch briefs)`);
  console.log(`  ${C.green}✓${C.reset} Created docs/storycraft/audits/ (continuity & structural reports)`);

  console.log(`\n${C.green}Novel workspace ready at ${C.bold}${dir}${C.reset}\n`);
}

function cmdNew(skillName) {
  if (!skillName) {
    console.log(`${C.red}Usage: storycraft new <skill-name>${C.reset}`);
    exit(1);
  }

  const slug = skillName.startsWith('novel-') ? skillName : `novel-${skillName}`;
  const skillDir = join(SKILLS_DIR, slug);

  if (existsSync(skillDir)) {
    console.log(`${C.red}Skill "${slug}" already exists at ${skillDir}${C.reset}`);
    exit(1);
  }

  ensureDir(skillDir);

  const template = `---
name: ${slug}
description: "TODO: Write a clear, action-oriented 1-3 sentence summary"
version: "1.0.0"
category: "ideation"
stage: 1
tags: ["novel", "fiction"]
---

# Overview & Purpose

TODO: Describe the skill's purpose and what aspect of novel craft it addresses.

## When to Use & Trigger Phrases

TODO: Define when the agent should activate this skill. Include example trigger phrases.

## Core Literary Methodology & Rules

TODO: Document the literary frameworks, principles, and techniques this skill applies.

## Required Project State & Inputs

TODO: What files, data, or context must be available before executing this skill?

## Step-by-Step Execution Protocol

TODO: Provide the exact step-by-step workflow the agent follows.

## Quality Checklist & Verification Criteria

TODO: Define the criteria for evaluating the output quality.

## Anti-Patterns & Prohibited AI Tropes

TODO: List specific bad patterns the agent must avoid.

## Concrete Examples (Before vs. After Craft Application)

TODO: Show before/after comparisons of generic vs. craft-polished writing.

## Session State Hook

TODO: Define how the agent updates \`story-state.md\` after completing work with this skill.
`;

  writeFileSync(join(skillDir, 'SKILL.md'), template);
  console.log(`\n${C.green}✓${C.reset} Scaffolded new skill: ${C.bold}${slug}${C.reset}`);
  console.log(`  ${C.dim}Edit: ${join(skillDir, 'SKILL.md')}${C.reset}\n`);
}

// ─── Help ──────────────────────────────────────────────────────────────────────
function cmdHelp() {
  console.log(`
${C.bold}${C.cyan}📚 StoryCraft Skills CLI${C.reset}
${C.dim}Professional AI agent skills for novel writing craft${C.reset}

${C.bold}Usage:${C.reset}
  storycraft <command> [options]

${C.bold}Commands:${C.reset}
  ${C.cyan}list${C.reset}                         List all available skills
  ${C.cyan}test${C.reset}                         Validate all SKILL.md files
  ${C.cyan}sync --target <platform>${C.reset}     Export skills to platform format
  ${C.cyan}init [dir]${C.reset}                   Initialize a novel writing workspace
  ${C.cyan}new <skill-name>${C.reset}             Scaffold a new skill template
  ${C.cyan}help${C.reset}                         Show this help message

${C.bold}Sync Targets:${C.reset}
  cursor        →  .cursor/rules/*.mdc
  claude        →  CLAUDE.md + .claude/rules/*.md
  codex         →  AGENTS.md + dist/codex/*.md
  antigravity   →  .agents/skills/*/SKILL.md
  all           →  All of the above

${C.bold}Examples:${C.reset}
  ${C.dim}npx storycraft list${C.reset}
  ${C.dim}npx storycraft sync --target cursor${C.reset}
  ${C.dim}npx storycraft sync --target all${C.reset}
  ${C.dim}npx storycraft init ./my-novel${C.reset}
  ${C.dim}npx storycraft new magic-system${C.reset}
`);
}

// ─── Main Router ───────────────────────────────────────────────────────────────
const args = argv.slice(2);
const command = args[0];

switch (command) {
  case 'list':
    cmdList();
    break;
  case 'test':
    cmdTest();
    break;
  case 'sync': {
    const targetIdx = args.indexOf('--target');
    const target = targetIdx !== -1 ? args[targetIdx + 1] : 'all';
    cmdSync(target);
    break;
  }
  case 'init':
    cmdInit(args[1]);
    break;
  case 'new':
    cmdNew(args[1]);
    break;
  case 'help':
  case '--help':
  case '-h':
    cmdHelp();
    break;
  default:
    if (command) {
      console.log(`${C.red}Unknown command: ${command}${C.reset}\n`);
    }
    cmdHelp();
    break;
}
