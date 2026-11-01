# 🖋️ StoryCraft Skills

> **The Professional AI Agent Ecosystem for Fiction Writers & Novel Architects**  
> 15 granular, battle-tested literary craft skills, persistent session continuity, and zero-dependency multiplatform support for **Antigravity, Cursor, Claude, Codex, and OpenCode**.

[![CI](https://github.com/leapwithluvi/storycraft-skills/actions/workflows/ci.yml/badge.svg)](https://github.com/leapwithluvi/storycraft-skills/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-success.svg)](package.json)
[![Skills Catalog](https://img.shields.io/badge/skills-15%20novel%20skills-purple.svg)](skills/)

---

## 🌟 Why StoryCraft Skills?

Most AI writing assistants generate cliché-choked, passive, melodrama-heavy prose with flat characters and forgotten plot points after three chapters.

**StoryCraft Skills** reimagines AI-assisted fiction writing. Instead of asking a generic LLM to "write a fantasy novel," you equip your agent with **15 specialized literary craft skills** spanning the entire professional fiction pipeline—from high-concept premise testing to deep-POV scene drafting, subtextual dialogue warfare, and forensic continuity auditing.

### ✨ Key Features
- **🎯 15 Granular Craft Skills**: Each skill is a dedicated masterclass in narrative technique (Sanderson's Laws, Swain's Scene & Sequel, Gardner's Psychic Distance, McKee's Value Shifts, Chekhov's Gun).
- **🧠 Zero-Latency Session Persistence**: Solves LLM amnesia and token limits using `story-state.md` and `novel-session-memory`.
- **⚡ Native Slash Commands**: Directly invoke any skill in Antigravity or your favorite harness using `/<skill-name>` (e.g., `/novel-character-architect`, `/novel-scene-beater`).
- **🌐 100% Multiplatform**: Single source of truth compiled to Antigravity (`.agents/`), Cursor (`.cursor/rules/*.mdc`), Claude (`CLAUDE.md`), and Codex (`AGENTS.md`).
- **📦 Zero-Dependency CLI**: Built entirely on native Node.js (`node:fs`, `node:path`). No `node_modules` required.

---

## 📚 The 15 Novel Skills Pipeline

| Stage | Skill Folder | Slash Command | Category | Core Craft Framework |
| :--- | :--- | :--- | :--- | :--- |
| **0** | [`novel-session-memory`](skills/novel-session-memory/) | `/novel-session-memory` | `auxiliary` | `story-state.md` tracker, zero-latency resume bootstrap prompt |
| **1** | [`novel-premise-hook`](skills/novel-premise-hook/) | `/novel-premise-hook` | `ideation` | 4-Element Logline, Core Dramatic Question, What-If Escalator |
| **1** | [`novel-worldbuilder`](skills/novel-worldbuilder/) | `/novel-worldbuilder` | `ideation` | Iceberg Principle, Sanderson's Laws of Magic, Sensory Ecology |
| **1** | [`novel-character-architect`](skills/novel-character-architect/) | `/novel-character-architect` | `ideation` | Want vs. Need, The Lie Believed, The Origin Wound, Foils |
| **2** | [`novel-plot-architect`](skills/novel-plot-architect/) | `/novel-plot-architect` | `plotting` | 3-Act 9-Block, Dan Wells 7-Point, Midpoint Reversal, Kishōtenketsu |
| **2** | [`novel-chapter-outline`](skills/novel-chapter-outline/) | `/novel-chapter-outline` | `plotting` | Value Shifts (+/-), Swain's Scene/Sequel, Multi-POV scheduling |
| **3** | [`novel-scene-beater`](skills/novel-scene-beater/) | `/novel-scene-beater` | `drafting` | In Late / Out Early, Micro-Tension, "Yes, but / No, and" |
| **3** | [`novel-sensory-immersion`](skills/novel-sensory-immersion/) | `/novel-sensory-immersion` | `drafting` | 5+1 Sensory Anchors, Defamiliarization, Objective Correlative |
| **3** | [`novel-deep-pov`](skills/novel-deep-pov/) | `/novel-deep-pov` | `drafting` | Filter Word Eradication, Gardner's Psychic Distance, Neurobiology |
| **4** | [`novel-dialogue-subtext`](skills/novel-dialogue-subtext/) | `/novel-dialogue-subtext` | `style` | Text vs. Subtext, Power Dynamics, Character Idiolects, Props |
| **4** | [`novel-prose-stylist`](skills/novel-prose-stylist/) | `/novel-prose-stylist` | `style` | Gary Provost Cadence, Muscular Active Verbs, Precision Nouns |
| **5** | [`novel-pacing-doctor`](skills/novel-pacing-doctor/) | `/novel-pacing-doctor` | `revision` | Tension Curve Analysis, Time Dilation/Compression, Ticking Clocks |
| **5** | [`novel-structural-editor`](skills/novel-structural-editor/) | `/novel-structural-editor` | `revision` | Setup-and-Payoff Matrix, Chekhov's Gun, Idiot Plot Prevention |
| **6** | [`novel-lore-bible`](skills/novel-lore-bible/) | `/novel-lore-bible` | `continuity` | Single Source of Truth `story-bible.md`, Relational Taxonomies |
| **6** | [`novel-continuity-checker`](skills/novel-continuity-checker/) | `/novel-continuity-checker` | `continuity` | 5-Vector Continuity Matrix, Chain of Custody, Wound Decay |

---

## 🚀 Quick Start Guide

### 1. Initialize a New Novel Workspace
In your novel project folder, run:
```bash
npx storycraft init
```
This generates:
- `story-state.md`: Your living session checkpoint and resume engine.
- `story-bible.md`: Your canonical world and character encyclopedia.

### 2. Install Skills on Your Preferred Platform

#### Option A: Antigravity IDE & Antigravity CLI
Copy the pre-compiled `.agents/` folder into your novel workspace:
```bash
cp -r dist/.agents /path/to/your/novel-project/
```
Now in your Antigravity chat, you can invoke any skill via slash command:
- `/novel-premise-hook` — Test and sharpen your opening concept
- `/novel-character-architect` — Build a protagonist with an internal Lie
- `/novel-chapter-outline` — Generate tight, high-stakes chapter beats
- `/novel-scene-beater` — Draft kinetic scene-and-sequel action
- `/novel-session-memory` — Checkpoint progress before ending session

#### Option B: Cursor
Copy the pre-compiled Cursor rules:
```bash
cp -r dist/.cursor /path/to/your/novel-project/
```
Cursor automatically detects all 15 `.cursor/rules/*.mdc` files.

#### Option C: Claude Desktop & Claude Projects
Copy `dist/CLAUDE.md` and `dist/.claude/` into your novel project or paste `CLAUDE.md` into your Project Custom Instructions.

#### Option D: Codex & OpenCode
Copy `dist/AGENTS.md` and `dist/codex/` into your workspace.

---

## 🛠️ StoryCraft CLI Reference

StoryCraft comes with an ultra-lightweight CLI:

```bash
# List all 15 skills across all stages
node bin/storycraft.mjs list

# Validate all SKILL.md files against mandatory literary sections
node bin/storycraft.mjs test

# Sync/export skills to all platforms (Cursor, Claude, Codex, Antigravity)
node bin/storycraft.mjs sync --target all

# Scaffold a new skill template
node bin/storycraft.mjs new romance-rivalry

# Initialize novel templates in target directory
node bin/storycraft.mjs init ./my-new-novel
```

---

## 🧠 Solving AI Amnesia: The Session State Engine

When writing an 80,000+ word novel with AI, the context window will eventually reset. StoryCraft eliminates memory loss through a continuous two-file system:

1. **`story-bible.md` (Permanent Canon)**: Contains the world laws, magic rules, character biographies, and chronological master timeline.
2. **`story-state.md` (Living Checkpoint)**: Updated after every session with current chapter, scene coordinates, physical character conditions, inventory changes, and the **Next-Session Bootstrap Prompt**:

```markdown
> "We are writing 'The Iron Meridian'. Currently drafting Chapter 8, Scene 1 from the Deep POV of Kira Vance. In the previous scene, Kira secured the Obsidian Dagger of Voros from the subterranean vault, but suffered frostbite on her right hand. She is now standing on the southern glass terrace with 15 minutes before the perimeter cordon seals. Refer to story-state.md and story-bible.md. Continue drafting from Beat 1."
```

When you start a new chat tomorrow, simply paste this bootstrap prompt. Your AI agent resumes writing with 100% continuity in less than five seconds.

---

## 🤝 Contributing & Community

StoryCraft Skills is an open-source project welcoming fiction authors, narrative designers, and prompt engineers.
- Want to contribute a genre-specific skill pack (e.g., Cyberpunk, Grimdark Fantasy, Cozy Mystery, Enemies-to-Lovers Romance)?
- Check out [CONTRIBUTING.md](CONTRIBUTING.md) to learn how to scaffold and test new skills.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.