#!/usr/bin/env node

/**
 * StoryCraft Skills - Canonical Skill Validator
 * Validates frontmatter, structure, and required sections for all skills in skills/
 */

import { readdir, readFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const ROOT_DIR = resolve(process.cwd());
const SKILLS_DIR = join(ROOT_DIR, 'skills');

const REQUIRED_SECTION_PATTERNS = [
  { name: 'Overview', pattern: /(?:#|##)\s*Overview/i },
  { name: 'When to Use', pattern: /##\s*When to Use/i },
  { name: 'Core Principles / Methodology', pattern: /##\s*(?:Core Literary Methodology|Core Principles)/i },
  { name: 'Required Inputs / Project State', pattern: /##\s*(?:Required Project State|Required Inputs|Operational Protocol)/i },
  { name: 'Step-by-Step Execution', pattern: /##\s*Step-by-Step (?:Execution Protocol|Workflow)/i },
  { name: 'Quality / Verification Checklist', pattern: /##\s*(?:Quality Checklist|Verification Checklist)/i },
  { name: 'Anti-Patterns', pattern: /##\s*Anti-Patterns/i },
  { name: 'Concrete Examples', pattern: /##\s*(?:Concrete Examples|Examples)/i },
  { name: 'Session State Hook / Success Criteria', pattern: /##\s*(?:Session State Hook|Success Criteria)/i }
];

async function validateSkill(skillDirName) {
  const skillFile = join(SKILLS_DIR, skillDirName, 'SKILL.md');
  const errors = [];

  try {
    const fileStat = await stat(skillFile);
    if (!fileStat.isFile()) {
      return { skill: skillDirName, errors: ['SKILL.md is not a file'] };
    }
  } catch (err) {
    return { skill: skillDirName, errors: ['Missing SKILL.md in skill directory'] };
  }

  const content = await readFile(skillFile, 'utf8');

  // 1. Validate YAML Frontmatter
  if (!content.startsWith('---\n')) {
    errors.push('Missing opening YAML frontmatter delimiter (---)');
  }

  const frontmatterEnd = content.indexOf('\n---\n', 4);
  if (frontmatterEnd === -1) {
    errors.push('Missing closing YAML frontmatter delimiter (---)');
  } else {
    const frontmatterText = content.slice(4, frontmatterEnd);
    if (!/^name:\s*[\w-]+$/m.test(frontmatterText)) {
      errors.push('YAML frontmatter missing valid "name" property');
    }
    if (!/^description:\s*.+$/m.test(frontmatterText)) {
      errors.push('YAML frontmatter missing valid "description" property');
    }
  }

  // 2. Validate Required Sections
  for (const { name, pattern } of REQUIRED_SECTION_PATTERNS) {
    if (!pattern.test(content)) {
      errors.push(`Missing mandatory section: "${name}"`);
    }
  }

  // 3. Validate Minimum Substance Length (must be comprehensive)
  const lines = content.split('\n');
  if (lines.length < 80) {
    errors.push(`Skill content is too brief (${lines.length} lines). Expected at least 80 lines of deep craft instruction.`);
  }

  // 4. Validate No Slop / Placeholder Text
  if (/\[TODO\]|\[Insert here\]|<your-|placeholder/i.test(content)) {
    errors.push('Contains unfinished placeholder or TODO tokens');
  }

  return { skill: skillDirName, errors, lineCount: lines.length };
}

async function main() {
  console.log('StoryCraft Skills - Running Comprehensive Skill Validation...\n');

  let entries;
  try {
    entries = await readdir(SKILLS_DIR, { withFileTypes: true });
  } catch (err) {
    console.error(`Error reading skills directory at ${SKILLS_DIR}:`, err.message);
    process.exit(1);
  }

  const skillDirs = entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();

  if (skillDirs.length === 0) {
    console.error('No skill directories found in skills/');
    process.exit(1);
  }

  let totalErrors = 0;
  for (const dirName of skillDirs) {
    const result = await validateSkill(dirName);
    if (result.errors.length > 0) {
      console.log(`FAIL: ${dirName}`);
      for (const err of result.errors) {
        console.log(`  - ${err}`);
      }
      totalErrors += result.errors.length;
    } else {
      console.log(`PASS: ${dirName} (${result.lineCount} lines)`);
    }
  }

  console.log(`\nValidation complete: ${skillDirs.length} skills checked, ${totalErrors} errors found.`);
  if (totalErrors > 0) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error during validation:', err);
  process.exit(1);
});
