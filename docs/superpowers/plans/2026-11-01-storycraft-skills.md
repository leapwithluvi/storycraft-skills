# StoryCraft Skills Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete StoryCraft Skills ecosystem — 15 novel-craft agent skills, a zero-dependency CLI sync engine, multiplatform export targets, author templates, and contributor documentation.

**Architecture:** Single-source `skills/*/SKILL.md` files compiled by `bin/storycraft.mjs` (native Node.js, zero deps) into platform-specific formats for Antigravity, Cursor, Claude, and Codex. Pre-compiled `dist/` folder committed for zero-tooling users.

**Tech Stack:** Node.js (native modules only: `node:fs`, `node:path`, `node:process`), Markdown, YAML frontmatter.

**Spec:** `docs/superpowers/specs/2026-11-01-storycraft-skills-design.md`

## Global Constraints

- Zero external dependencies — only Node.js built-in modules
- All skill instructions written in English for optimal LLM reasoning across models
- Skills must support novel writing in any target language (English, Indonesian, etc.)
- Every `SKILL.md` must contain all 9 mandatory sections from spec §4.2
- YAML frontmatter must match schema from spec §4.1
- CLI must work on Linux, macOS, and Windows without build steps
- MIT License (already present)

## Review Focus

- A `SKILL.md` with missing mandatory sections would silently degrade agent behavior — `storycraft test` must catch and report this
- A malformed YAML frontmatter block breaks parsing — the CLI must handle gracefully with error messages, not crash
- The Cursor `.mdc` format requires specific frontmatter keys (`description`, `globs`, `alwaysApply`) — wrong format means Cursor ignores the rules entirely
- `storycraft init` writing into an existing directory must not overwrite user files — guard with existence checks
- `story-state.md` template must be self-documenting enough that a writer unfamiliar with the system can fill it in without reading docs

---

### Task 1: Project Foundation & CLI Scaffold

**Files:**
- Create: `package.json`
- Create: `bin/storycraft.mjs`

**Interfaces:**
- Produces: `parseSkill(skillDir)` → `{ name, description, version, category, stage, tags, body, sections }`, `getAllSkills(skillsDir)` → `Array<ParsedSkill>`, CLI entry point with subcommand routing

### Task 2: Author Templates

**Files:**
- Create: `templates/story-state.template.md`
- Create: `templates/story-bible.template.md`

### Task 3: Stage 1 Skills — Ideation & Worldbuilding (3 skills)

**Files:**
- Create: `skills/novel-premise-hook/SKILL.md`
- Create: `skills/novel-worldbuilder/SKILL.md`
- Create: `skills/novel-character-architect/SKILL.md`

### Task 4: Stage 2 Skills — Plotting & Chapter Structure (2 skills)

**Files:**
- Create: `skills/novel-plot-architect/SKILL.md`
- Create: `skills/novel-chapter-outline/SKILL.md`

### Task 5: Stage 3 Skills — Scene Drafting & Beats (3 skills)

**Files:**
- Create: `skills/novel-scene-beater/SKILL.md`
- Create: `skills/novel-sensory-immersion/SKILL.md`
- Create: `skills/novel-deep-pov/SKILL.md`

### Task 6: Stage 4 Skills — Dialogue & Voice (2 skills)

**Files:**
- Create: `skills/novel-dialogue-subtext/SKILL.md`
- Create: `skills/novel-prose-stylist/SKILL.md`

### Task 7: Stage 5 Skills — Revision, Editing & Pacing (2 skills)

**Files:**
- Create: `skills/novel-pacing-doctor/SKILL.md`
- Create: `skills/novel-structural-editor/SKILL.md`

### Task 8: Stage 6 Skills — Continuity & Story Bible (2 skills)

**Files:**
- Create: `skills/novel-lore-bible/SKILL.md`
- Create: `skills/novel-continuity-checker/SKILL.md`

### Task 9: Auxiliary Skill — Session Memory (1 skill)

**Files:**
- Create: `skills/novel-session-memory/SKILL.md`

### Task 10: CLI Sync Engine — Multiplatform Export

**Files:**
- Modify: `bin/storycraft.mjs` (add `sync`, `init`, `new` commands)

### Task 11: Pre-compiled Dist & Documentation

**Files:**
- Create: `dist/` (generated via CLI)
- Create: `README.md` (overwrite stub)
- Create: `CONTRIBUTING.md`
- Create: `docs/QUICKSTART.md`
- Create: `docs/ARCHITECTURE.md`
- Create: `.github/workflows/ci.yml`
