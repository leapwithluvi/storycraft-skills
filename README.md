# 🖋️ StoryCraft

> **StoryCraft is a complete fiction writing methodology and agentic skill system for your AI coding and writing agents, built on top of 20 composable literary craft skills and persistent session memory that make sure your agent writes publishable, immersive novels.**

[![CI](https://github.com/leapwithluvi/storycraft-skills/actions/workflows/ci.yml/badge.svg)](https://github.com/leapwithluvi/storycraft-skills/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-success.svg)](package.json)
[![Skills Library](https://img.shields.io/badge/skills-20%20novel%20skills-purple.svg)](skills/)
[![Multiplatform](https://img.shields.io/badge/platforms-Antigravity%20%7C%20Cursor%20%7C%20Claude%20%7C%20Codex%20%7C%20Gemini-orange.svg)](#installation)

---

## 📑 Table of Contents

- [How it Works](#how-it-works)
- [Installation](#installation)
  - [Antigravity](#antigravity)
  - [Cursor](#cursor)
  - [Claude Code](#claude-code)
  - [OpenAI Codex App & CLI](#openai-codex-app--cli)
  - [Gemini CLI](#gemini-cli)
  - [OpenCode](#opencode)
- [The Basic Workflow](#the-basic-workflow)
- [What's Inside: The 20 Skills Library](#whats-inside-the-20-skills-library)
- [Solving AI Amnesia: The State Persistence Engine](#solving-ai-amnesia-the-state-persistence-engine)
- [Literary Craft Philosophy](#literary-craft-philosophy)
- [CLI Reference](#cli-reference)
- [Contributing](#contributing)
- [License](#license)

---

## 💡 How it Works

It starts from the moment you fire up your AI assistant. As soon as it sees you want to write a novel, it doesn't just jump into churning out generic, cliché-ridden melodrama. Instead, it steps back and initiates **`using-storycraft`** and **`novel-brainstorming`** to draw out what you're really trying to say, your emotional core, and your target audience.

Once a bulletproof premise is signed off:
1. **The Blueprint**: Your agent architectures the world, character misbeliefs, and a Three-Act or 7-Point structure using **`novel-character-architect`** and **`novel-plot-architect`**.
2. **The Chapter Beats**: It breaks your acts into 2,500–4,000 word chapter roadmaps with measurable Value Shifts (+ to -) using **`novel-chapter-outline`**.
3. **Deep POV Drafting**: Once you say "write", it launches **`novel-chapter-drafter`** (or **`novel-scene-beater`**), composing scenes where sensory details, subtextual dialogue, and character neurobiology take precedence over dry exposition.
4. **Forensic Auditing**: It runs Chekhov's Gun checks and wound continuity using **`novel-continuity-checker`** and **`novel-structural-editor`**.
5. **Session Checkpointing**: When token limits approach or you conclude a session, **`novel-session-memory`** updates `story-state.md` and generates a zero-latency resume bootstrap prompt.

Because skills trigger via intuitive slash commands (e.g. `/novel-character-architect`, `/novel-chapter-drafter`) or autonomous routing, you never lose narrative momentum.

---

## 📦 Installation

Installation differs by harness. StoryCraft provides pre-compiled, zero-tooling distributions in `dist/` alongside native plugin manifests.

### Antigravity
Install as an Antigravity plugin:
```bash
agy plugin install https://github.com/leapwithluvi/storycraft-skills
```
*Or copy the pre-compiled `.agents/` folder directly into your novel project:*
```bash
cp -r dist/.agents /path/to/your/novel-project/
```
In your Antigravity chat, all skills are immediately available via slash command (e.g., `/using-storycraft`, `/novel-brainstorming`, `/novel-chapter-drafter`).

### Cursor
In your novel workspace, copy the Cursor rules:
```bash
cp -r dist/.cursor /path/to/your/novel-project/
```
Cursor Agent automatically activates all 20 `.cursor/rules/*.mdc` files based on your writing context.

### Claude Code
Install the plugin or copy the pre-compiled instructions:
```bash
cp dist/CLAUDE.md /path/to/your/novel-project/
cp -r dist/.claude /path/to/your/novel-project/
```

### OpenAI Codex App & CLI
Copy the Codex rules into your project root:
```bash
cp dist/AGENTS.md /path/to/your/novel-project/
cp -r dist/codex /path/to/your/novel-project/
```

### Gemini CLI
Install the extension:
```bash
gemini extensions install https://github.com/leapwithluvi/storycraft-skills
```

### OpenCode
Follow the instructions in [`.opencode/INSTALL.md`](.opencode/INSTALL.md) or copy `dist/AGENTS.md` and `dist/codex/` into your OpenCode project directory.

---

## ⚡ The Basic Workflow

```
[using-storycraft]  ──► Autonomous Project Diagnosis & Skill Router
        │
        ▼
[novel-brainstorming]  ──► Socratic Intent Discovery, Theme & Tone Comps
        │
        ▼
[novel-premise-hook]   ──► 4-Element Logline & Core Dramatic Question
        │
        ▼
[novel-character-architect] + [novel-worldbuilder]  ──► Lie/Want/Need & World Rules
        │
        ▼
[novel-genre-specialist] ──► Obligatory Scenes & Trope Subversion
        │
        ▼
[novel-plot-architect] + [novel-twist-architect] ──► Macro Acts & Fair-Play Twists
        │
        ▼
[novel-chapter-outline] ──► Granular Value Shifts (+/-) & Cliffhangers
        │
        ▼
[novel-chapter-drafter] ──► Autonomous Chapter Drafting (Single or Batch)
        │                 (Synthesizes Deep POV, Sensory & Subtext)
        ▼
[novel-continuity-checker] + [novel-pacing-doctor] ──► Forensic Wound & Pacing Audit
        │
        ▼
[novel-session-memory] ──► Updates story-state.md & Generates Resume Bootstrap
```

---

## 📚 What's Inside: The 20 Skills Library

### Stage 0: Meta & Creative Discovery
- **[`using-storycraft`](skills/using-storycraft/)** (`/using-storycraft`): Evaluates workspace state, diagnoses bottlenecks, and routes you to the exact next skill needed.
- **[`novel-brainstorming`](skills/novel-brainstorming/)** (`/novel-brainstorming`): Conducts a Socratic interview to unearth emotional core, themes, tone comps, and ending visions before outlining.
- **[`novel-session-memory`](skills/novel-session-memory/)** (`/novel-session-memory`): Checkpoints active chapters, injuries, and inventory in `story-state.md` to prevent AI context-window amnesia.

### Stage 1: Ideation & World Architecture
- **[`novel-premise-hook`](skills/novel-premise-hook/)** (`/novel-premise-hook`): Formulates the 4-Element Logline, Core Dramatic Question, and What-If escalator.
- **[`novel-character-architect`](skills/novel-character-architect/)** (`/novel-character-architect`): Crafts the Lie Believed, Origin Wound (Ghost), Want vs. Need, and ensemble foils.
- **[`novel-worldbuilder`](skills/novel-worldbuilder/)** (`/novel-worldbuilder`): Sanderson’s Laws of Magic, Iceberg Principle, and sensory ecology.
- **[`novel-genre-specialist`](skills/novel-genre-specialist/)** (`/novel-genre-specialist`): Obligatory scenes, pacing ratios, and trope subversion across Fantasy, Sci-Fi, Mystery, Thriller, Romance, Horror, and Webnovels.

### Stage 2: Plotting & Narrative Architecture
- **[`novel-plot-architect`](skills/novel-plot-architect/)** (`/novel-plot-architect`): Three-Act Nine-Block, Dan Wells 7-Point, Midpoint Reversals, and Kishōtenketsu.
- **[`novel-twist-architect`](skills/novel-twist-architect/)** (`/novel-twist-architect`): Fair-play clue planting, red herrings, Recontextualization twists, and Peripeteia & Anagnorisis.
- **[`novel-chapter-outline`](skills/novel-chapter-outline/)** (`/novel-chapter-outline`): Chapter roadmaps with McKee Value Shifts (+/-), Swain's Scene/Sequel, and multi-POV coordination.

### Stage 3: Scene & Chapter Drafting
- **[`novel-chapter-drafter`](skills/novel-chapter-drafter/)** (`/novel-chapter-drafter`): Workhorse engine for drafting 2,500–4,500 word chapters in single or batch mode, reading state and prior chapters.
- **[`novel-scene-beater`](skills/novel-scene-beater/)** (`/novel-scene-beater`): In Late / Out Early cutting, micro-tension injection, and "Yes, but / No, and" outcomes.
- **[`novel-sensory-immersion`](skills/novel-sensory-immersion/)** (`/novel-sensory-immersion`): 5+1 sensory framework (sound, smell, tactile friction, temperature, proprioception) and defamiliarization.
- **[`novel-deep-pov`](skills/novel-deep-pov/)** (`/novel-deep-pov`): Eliminates filter words (*she saw*, *he felt*), Gardner Level 5 psychic distance, and neurobiological reaction sequences.

### Stage 4: Dialogue & Voice Styling
- **[`novel-dialogue-subtext`](skills/novel-dialogue-subtext/)** (`/novel-dialogue-subtext`): Text vs. Subtext, conversational power dynamics, distinct character idiolects, and prop stage business.
- **[`novel-prose-stylist`](skills/novel-prose-stylist/)** (`/novel-prose-stylist`): Gary Provost sentence cadence, muscular action verbs, precision nouns, and cliché execution.

### Stage 5: Revision & Developmental Editing
- **[`novel-pacing-doctor`](skills/novel-pacing-doctor/)** (`/novel-pacing-doctor`): Tension curve diagnosis, Act 2 middle repair, time dilation/compression, and ticking clocks.
- **[`novel-structural-editor`](skills/novel-structural-editor/)** (`/novel-structural-editor`): Setup-and-Payoff matrix auditing, Chekhov’s Gun tracking, and Idiot Plot prevention.

### Stage 6: Continuity & Story Bible
- **[`novel-lore-bible`](skills/novel-lore-bible/)** (`/novel-lore-bible`): Single Source of Truth management for `story-bible.md`, relational character dossiers, and master timelines.
- **[`novel-continuity-checker`](skills/novel-continuity-checker/)** (`/novel-continuity-checker`): 5-Vector forensic audits (biometrics, biological wound decay, inventory custody, spatial travel logistics).

---

## 🧠 Solving AI Amnesia: The State Persistence Engine

When drafting an 80,000+ word manuscript, AI context windows inevitably truncate. StoryCraft solves memory loss via two dedicated files generated by `npx storycraft init`:

1. **`story-bible.md` (Permanent Canon)**: The immutable constitution of your characters, world rules, magic costs, and chronological master timeline.
2. **`story-state.md` (Living Checkpoint)**: Automatically updated after every chapter. Tracks active injuries, inventory deltas, and generates the **Next Session Bootstrap Prompt**:

```markdown
> "We are writing 'The Iron Meridian'. Currently drafting Chapter 8, Scene 1 from the Deep POV of Kira Vance. In the previous scene, Kira secured the Obsidian Dagger of Voros from the subterranean vault, but suffered second-degree frostbite on her right hand. She is now standing on the southern glass terrace with 15 minutes before the perimeter cordon seals. Refer to story-state.md and story-bible.md. Continue drafting from Beat 1: navigating the grease-slick roof gutters."
```

Paste this single prompt into any fresh AI session, and your agent resumes writing with 100% factual accuracy in less than five seconds.

---

## 🏛️ Literary Craft Philosophy

- **Show, Don't Tell**: If a character is terrified, their diaphragm locks and their molars ache; they don't "feel very scared."
- **Fair-Play Twists**: Never lie to the reader. Plant clues under emotional distraction and linguistic camouflage so the reveal feels both surprising and inevitable.
- **Sanderson's Laws of Magic**: Limitations, physical costs, and vulnerabilities create more drama than raw infinite power.
- **Gary Provost Sentence Rhythm**: Alternate 3-word punchy sentences with rolling, lyrical compound clauses to make prose sing acoustically.
- **Neurobiological Sequence**: Characters flinch and experience visceral somatic shocks before their intellectual brains rationalize what just happened.

---

## 🛠️ CLI Reference

StoryCraft includes an ultra-lightweight, zero-dependency CLI:

```bash
# Initialize templates (story-state.md, story-bible.md, manuscript/chapter-01.md)
node bin/storycraft.mjs init ./my-new-novel

# List all 20 skills across all 6 stages
node bin/storycraft.mjs list

# Validate all SKILL.md files against mandatory literary sections
node bin/storycraft.mjs test

# Sync/compile skills into all platform formats (Cursor, Claude, Codex, Antigravity)
node bin/storycraft.mjs sync --target all

# Scaffold a brand-new skill template
node bin/storycraft.mjs new romance-rivalry
```

---

## 🤝 Contributing

We welcome contributions from fiction authors, editors, narrative designers, and prompt architects!
- Read [**`CONTRIBUTING.md`**](CONTRIBUTING.md) for skill authoring standards.
- Run `npm test` to validate formatting before submitting Pull Requests.
- Explore adding Genre Expansion Packs (Cyberpunk, Grimdark, Whodunit, Romantasy).

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.