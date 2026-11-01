# StoryCraft Skills - Architecture & Design Specification

**Document Version:** 1.0.0  
**Date:** 2026-11-01  
**Project:** `storycraft-skills`  
**Status:** Validated Design / Specification  

---

## 1. Executive Summary & Vision

`storycraft-skills` is an open-source, modular ecosystem of specialized AI Agent Skills tailored for long-form creative fiction and novel writing. While the prevailing AI agent ecosystem is saturated with programming, DevOps, and technical tools, `storycraft-skills` addresses the complex, high-nuance discipline of literary craft.

### 1.1 Core Objectives
- **Professional Craft Over Generic Prompts**: Equip AI agents with established literary methodologies (e.g., Dwight Swain's Scene & Sequel, Truby's 22-step story anatomy, Shawn Coyne's Story Grid, Deep Third POV, dialogue subtext analysis).
- **Universal Multiplatform Compatibility**: Maintain a single source of truth (`SKILL.md`) that transforms deterministically into formats compatible with **Antigravity**, **Claude Code / Claude Projects**, **Cursor**, and **OpenAI Codex / ChatGPT / Copilot**.
- **Long-Form State & Session Continuity**: Eliminate the "amnesia" problem across sessions and token limits through dedicated session checkpointing and narrative state tracking (`story-state.md`).
- **Community & Contributor Ready**: Provide an extensible architecture, automated linting, clear contribution standards, and genre-pack expansion pathways.

---

## 2. System Architecture & Multiplatform Engine

```
                           +---------------------------+
                           |   skills/*/SKILL.md       |
                           | (Single Source of Truth)  |
                           +-------------+-------------+
                                         |
                                         v
                         +-------------------------------+
                         | bin/storycraft.mjs Sync Engine |
                         |   (Zero-dependency Node CLI)  |
                         +---------------+---------------+
                                         |
         +-----------------+-------------+-------------+-----------------+
         |                 |                           |                 |
         v                 v                           v                 v
+-----------------+ +--------------+           +--------------+   +---------------+
|   Antigravity   | |    Cursor    |           | Claude Code  |   | Codex/ChatGPT |
| Native skills/  | | .cursor/rules|           |  CLAUDE.md   |   |   AGENTS.md   |
|     format      | |    (*.mdc)   |           |  & .claude/  |   |  & prompts/   |
+-----------------+ +--------------+           +--------------+   +---------------+
                                         |
                                         v
                           +---------------------------+
                           |           dist/           |
                           |  (Pre-compiled Exports    |
                           |   for Zero-Tooling Users) |
                           +---------------------------+
```

### 2.1 Single Source of Truth
Every skill is stored under `skills/<skill-name>/SKILL.md` utilizing standard YAML frontmatter and structured Markdown instructions written in English (the global standard for optimal LLM reasoning across Gemini, Claude, and GPT models), while instructing models to produce narrative prose in whatever target language the author specifies (e.g., Indonesian, English).

### 2.2 Zero-Dependency Sync Engine (`bin/storycraft.mjs`)
A lightweight, zero-external-dependency CLI built using native Node.js (`node:fs`, `node:path`, `node:process`) ensures instant cross-platform execution on Linux, macOS, and Windows.

**Supported CLI Commands:**
- `npx storycraft list`: Display a formatted terminal table of all available skills, categories, and stages.
- `npx storycraft sync --target <cursor|claude|codex|antigravity|all>`: Compile skills into platform-specific configurations.
- `npx storycraft init [dir]`: Initialize a fresh novel workspace with `story-state.md` and basic story bible templates.
- `npx storycraft test`: Validate all `SKILL.md` files against the schema (frontmatter validation, required sections, trigger formatting).

### 2.3 Platform Target Matrix
| Target Platform | Export Location | Format / Structure |
| :--- | :--- | :--- |
| **Antigravity** | `skills/<skill-name>/SKILL.md` or `.agents/skills/` | Standard directory-based skill format with YAML frontmatter. |
| **Cursor** | `.cursor/rules/<skill-name>.mdc` | Markdown with Cursor-compatible MDC frontmatter (`description`, `globs`, `alwaysApply: false`). |
| **Claude (Code & Web)** | `CLAUDE.md` and `.claude/rules/<skill-name>.md` | Project-level instructions index + modular rule files. |
| **Codex / ChatGPT** | `AGENTS.md` and `dist/codex/<skill-name>.md` | Unified agent prompt reference + copy-pasteable custom instructions. |
| **Zero-Tooling Authors** | `dist/` | Ready-to-copy folders directly committed in the repository. |

---

## 3. The 15 Novel Craft Skills Catalog

The 15 skills are organized into a sequential 6-stage narrative pipeline plus an essential session memory auxiliary:

### Stage 1: Ideation & Worldbuilding
1. **`novel-premise-hook`**
   - *Purpose*: Crafts high-concept premises, loglines, central dramatic questions, and reader hooks.
   - *Framework*: The 4-Element Logline (Protagonist, Inciting Incident, Goal, Antagonistic Force/Stakes), The Core Narrative Question.
2. **`novel-worldbuilder`**
   - *Purpose*: Designs internally consistent social, political, ecological, and magical/technological systems.
   - *Framework*: Sanderson's Laws of Magic, Iceberg Theory (90% below surface), integrated cultural implications without info-dumping.
3. **`novel-character-architect`**
   - *Purpose*: Develops multi-layered characters driven by internal psychology and character arcs.
   - *Framework*: The Ghost/Wound, The Lie, Want vs. Need, Internal/External Stakes, Idiolect & Mannerisms.

### Stage 2: Plotting & Chapter Structure
4. **`novel-plot-architect`**
   - *Purpose*: Blueprints macro narrative pacing and plot architecture.
   - *Framework*: 3-Act 8-Sequence Model, Dan Harmon Story Circle, Save the Cat Beat Sheet, Midpoint Mirror Moment.
5. **`novel-chapter-outline`**
   - *Purpose*: Translates macro beats into functional chapter outlines connected by causality.
   - *Framework*: The "Therefore / But" Causal Chain (Trey Parker/Matt Stone rule), Chapter Hooks & Cliffhangers.

### Stage 3: Scene Drafting & Beats
6. **`novel-scene-beater`**
   - *Purpose*: Guides micro-scene construction with dynamic dramatic tension.
   - *Framework*: Dwight Swain's Scene & Sequel (Goal → Conflict → Disaster / Reaction → Dilemma → Decision).
7. **`novel-sensory-immersion`**
   - *Purpose*: Implements visceral "Show, Don't Tell" through full 5-sense sensory grounding.
   - *Framework*: Visceral somatic responses, environmental physical textures, somatic objective correlative.
8. **`novel-deep-pov`**
   - *Purpose*: Collapses psychic distance in 1st and deep 3rd person narration.
   - *Framework*: Elimination of sensory filter verbs ("he saw", "she felt", "it seemed to him"), unmediated internal monologue.

### Stage 4: Dialogue & Voice
9. **`novel-dialogue-subtext`**
   - *Purpose*: Crafts realistic, multi-layered dialogue crackling with hidden agendas.
   - *Framework*: Text vs. Subtext, Power Dynamics & Conversation Tactics, Idiolect Rhythm, Elimination of "talking heads".
10. **`novel-prose-stylist`**
    - *Purpose*: Polishes prose rhythm, sentence variety, metaphorical freshness, and narrative voice.
    - *Framework*: Sentence cadence (short punch vs. lyrical flow), avoidance of clichés, active verb vigor, prose-fat trimming.

### Stage 5: Revision, Editing & Pacing
11. **`novel-pacing-doctor`**
    - *Purpose*: Diagnoses narrative tension and repairs saggy middles or rushed climaxes.
    - *Framework*: Tension Curve Analysis, Micro-tension injection, Scene-to-Sequel ratio calibration.
12. **`novel-structural-editor`**
    - *Purpose*: Audits narrative integrity, plot holes, and setup-to-payoff execution.
    - *Framework*: Chekhov's Gun tracker, Character Motivation consistency audit, Foreshadowing matrix.

### Stage 6: Continuity & Story Bible
13. **`novel-lore-bible`**
    - *Purpose*: Establishes and manages the official story bible (codex of characters, timeline, locations, magic rules).
    - *Framework*: Relational markdown linking, chronological timeline indexing, lore tag taxonomy.
14. **`novel-continuity-checker`**
    - *Purpose*: Audits draft chapters against the Lore Bible and preceding chapters for factual discrepancies.
    - *Framework*: Chronology tracking, character physical traits and age audit, inventory and injury continuity.

### Core Auxiliary: Session State & Persistence
15. **`novel-session-memory`**
    - *Purpose*: Overcomes LLM context window limits and session disconnection by tracking real-time story state and generating seamless resume prompts.
    - *Framework*: `story-state.md` management, active chapter/scene tracker, pending decisions log, and next-session bootstrap prompt.

---

## 4. Standard `SKILL.md` Specification

Each skill file must conform strictly to the following specification:

### 4.1 YAML Frontmatter Schema
```yaml
---
name: novel-<skill-slug>
description: "<Clear, action-oriented 1-3 sentence summary of when and how the agent must invoke this skill>"
version: "1.0.0"
category: "ideation | plotting | drafting | style | revision | continuity | auxiliary"
stage: <1 | 2 | 3 | 4 | 5 | 6 | 0>
tags: ["novel", "fiction", "<craft-tag>"]
---
```

### 4.2 Mandatory Content Sections
1. `# Overview & Purpose`
2. `## When to Use & Trigger Phrases`
3. `## Core Literary Methodology & Rules`
4. `## Required Project State & Inputs` (e.g., reference to `story-state.md`)
5. `## Step-by-Step Execution Protocol`
6. `## Quality Checklist & Verification Criteria`
7. `## Anti-Patterns & Prohibited AI Tropes`
8. `## Concrete Examples (Before vs. After Craft Application)`
9. `## Session State Hook` (instructions on how the agent updates `story-state.md` upon completing work)

---

## 5. Story State Specification (`story-state.md`)

The `novel-session-memory` skill maintains a `story-state.md` file in the author's novel project root with the following structure:

```markdown
# Novel Project State: [Title of Novel]
**Last Updated:** [Timestamp]  
**Current Active Chapter:** Chapter [N]  
**Current Active Scene:** Scene [M]  

## 1. Quick Narrative Summary
[2-3 sentences summarizing the story so far]

## 2. Active Plot Threads & Stakes
- **Main Plot:** [Status & Current Objective]
- **Subplot A:** [Status]
- **Unresolved Questions / Open Loops:** [List]

## 3. Session Checkpoint & Recent Decisions
- [Key decision or lore established in the most recent session]
- [Character state changes, injuries, or inventory updates]

## 4. Next Session Bootstrap Prompt
> "We are currently drafting Chapter [N], Scene [M]. Protagonist [Name] is facing [Immediate Conflict]. Refer to story-state.md and continue from beat [X]."
```

---

## 6. Repository Layout

```
storycraft-skills/
├── .github/
│   └── workflows/
│       └── ci.yml               # Automated test & build validation
├── bin/
│   └── storycraft.mjs           # Zero-dependency CLI & multiplatform sync engine
├── docs/
│   ├── superpowers/
│   │   └── specs/
│   │       └── 2026-11-01-storycraft-skills-design.md # This specification
│   ├── QUICKSTART.md            # Quick user guide for writers
│   └── ARCHITECTURE.md          # Internal architecture documentation
├── skills/
│   ├── novel-premise-hook/
│   │   └── SKILL.md
│   ├── novel-worldbuilder/
│   │   └── SKILL.md
│   ├── novel-character-architect/
│   │   └── SKILL.md
│   ├── novel-plot-architect/
│   │   └── SKILL.md
│   ├── novel-chapter-outline/
│   │   └── SKILL.md
│   ├── novel-scene-beater/
│   │   └── SKILL.md
│   ├── novel-sensory-immersion/
│   │   └── SKILL.md
│   ├── novel-deep-pov/
│   │   └── SKILL.md
│   ├── novel-dialogue-subtext/
│   │   └── SKILL.md
│   ├── novel-prose-stylist/
│   │   └── SKILL.md
│   ├── novel-pacing-doctor/
│   │   └── SKILL.md
│   ├── novel-structural-editor/
│   │   └── SKILL.md
│   ├── novel-lore-bible/
│   │   └── SKILL.md
│   ├── novel-continuity-checker/
│   │   └── SKILL.md
│   └── novel-session-memory/
│       └── SKILL.md
├── dist/                        # Pre-compiled multiplatform exports
│   ├── cursor/                  # .cursorrules & .cursor/rules/*.mdc
│   ├── claude/                  # CLAUDE.md & prompt rules
│   └── codex/                   # AGENTS.md & system instructions
├── templates/                   # Scaffolding templates for authors
│   ├── story-state.template.md
│   └── story-bible.template.md
├── CONTRIBUTING.md              # Community contribution guidelines & style guide
├── LICENSE                      # MIT License
├── package.json                 # CLI metadata, npm scripts & binary configuration
└── README.md                    # Rich project showcase & installation instructions
```

---

## 7. Open Source & Contribution Strategy (`CONTRIBUTING.md`)

To foster an active open-source community around novel writing skills:
1. **Skill Template Generator**: Contributors can run `node bin/storycraft.mjs new <skill-name>` to scaffold a fully compliant `SKILL.md` with boilerplate sections.
2. **Automated Linter**: Running `npm test` checks that all skills have valid YAML frontmatter, mandatory sections, no broken links, and adhere to prose style standards.
3. **Genre Expansion Roadmap**: Clear guidelines for submitting Genre Expansion Packs (e.g., `genre-cyberpunk`, `genre-grimdark-fantasy`, `genre-mystery-whodunit`, `genre-romance-tropes`).
4. **Inclusive Community Standards**: Clear code of conduct, PR review checklists, and transparent milestone tracking.

---

## 8. Verification & Quality Assurance Plan

1. **CLI Unit & Integration Tests**:
   - Verify `storycraft.mjs` successfully parses all 15 skills without errors.
   - Verify all compilation targets (`cursor`, `claude`, `codex`, `all`) generate expected files with valid syntaxes.
   - Verify `storycraft init` generates working `story-state.md` and template files.
2. **Skill Quality Audit**:
   - Confirm each skill contains actionable literary instructions, rigorous anti-pattern lists, and concrete before-and-after examples.
   - Confirm every skill includes the `story-state.md` synchronization hook.
3. **Multiplatform Functional Verification**:
   - Test skill loading in Antigravity (`skills/` directory discovery).
   - Test rule loading in Cursor (`.cursor/rules/*.mdc`).
   - Test unified instruction injection in Claude and Codex (`CLAUDE.md`, `AGENTS.md`).
