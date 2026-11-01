# StoryCraft Skills — Quickstart Guide for Authors

Welcome to StoryCraft Skills. This guide walks you through setting up a professional novel workspace, selecting your target publishing format, and drafting your chapters using the 21-skill pipeline.

---

## Step 1: Initialize Your Novel Workspace

Open your terminal in your novel's project directory and run:

```bash
# Initialize templates and project structure
npx storycraft init
```

This creates the canonical project hierarchy:
- `story-bible.md`: The permanent encyclopedia of your world, characters, magic rules, and master timeline.
- `story-state.md`: The living checkpoint tracking active chapters, injuries, and the Next Session Bootstrap Prompt.
- `docs/storycraft/`: Planning briefs (`pitch-brief.md`, `market-analysis.md`, `plot-architecture.md`, `chapter-roadmaps.md`).
- `docs/storycraft/audits/`: Continuity and structural audit reports.
- `manuscript/`: Clean markdown chapter files (`chapter-01.md`).

---

## Step 2: Install Skills for Your AI Platform

Choose the platform you use:

### For Antigravity IDE and Antigravity CLI
Install as a plugin:
```bash
agy plugin install https://github.com/leapwithluvi/storycraft-skills
```
Or copy skills into your novel workspace's `.agents/skills`:
```bash
mkdir -p .agents/skills
cp -r path/to/storycraft-skills/skills/* .agents/skills/
```
In your Antigravity chat, all skills are immediately available via slash commands:
- `/using-storycraft`
- `/novel-brainstorming`
- `/novel-market-analyst`
- `/novel-chapter-drafter`
- `/novel-session-memory`

### For Cursor
Copy `AGENTS.md` and `skills/` into your novel project:
```bash
cp path/to/storycraft-skills/AGENTS.md ./
cp -r path/to/storycraft-skills/skills ./
```

### For Claude (Desktop or Web Projects)
Copy `CLAUDE.md` and `skills/` into your project directory:
```bash
cp path/to/storycraft-skills/CLAUDE.md ./
cp -r path/to/storycraft-skills/skills ./
```

### For OpenAI Codex and OpenCode
Copy `AGENTS.md` and `skills/` into your project directory:
```bash
cp path/to/storycraft-skills/AGENTS.md ./
cp -r path/to/storycraft-skills/skills ./
```

---

## Step 3: Phase 0 — Session Start and Brainstorming

Start a conversation with your assistant:

### 1. Project Triage
Type:
> `/using-storycraft`

The agent scans your workspace, diagnoses your current progress, and guides you to the optimal next skill.

### 2. Socratic Brainstorming
Type:
> `/novel-brainstorming I have an idea about an underwater salvage diver who discovers an intact Victorian train at the bottom of the trench.`

The agent conducts a focused 1-on-1 interview exploring theme, tone, comp titles, and emotional stakes, saving the output to `docs/storycraft/pitch-brief.md`.

---

## Step 4: Phase 1 — Market Strategy and World Architecture

### 1. Market and Publishing Platform Alignment
Type:
> `/novel-market-analyst Where should I publish this story? Compare Royal Road serialization vs. Amazon KDP vs. Traditional Print.`

The agent evaluates reader demographics, top genre tropes, release schedules, and monetization funnels, saving the strategy to `docs/storycraft/market-analysis.md`.

### 2. Lock the Premise and Cast
Type:
> `/novel-premise-hook Formulate the 4-element logline and Core Dramatic Question.`
> `/novel-character-architect Let's build the protagonist's Lie, Origin Wound (Ghost), and Want vs. Need.`
> `/novel-worldbuilder Establish the deep-sea pressure mechanics and oxygen costs under Sanderson's Laws.`

---

## Step 5: Phase 2 — Plot Architecture and Fair-Play Twists

### 1. Macro Plot Structure
Type:
> `/novel-plot-architect Structure the Three-Act / Nine-Block arc. What is the Midpoint shift?`

Saves the structural roadmap to `docs/storycraft/plot-architecture.md`.

### 2. Fair-Play Plot Twists
Type:
> `/novel-twist-architect Design a Recontextualization twist for the 75% turn. Plant clues under emotional distraction.`

Saves the clue and red herring matrix to `docs/storycraft/twist-matrix.md`.

### 3. Chapter-by-Chapter Roadmaps
Type:
> `/novel-chapter-outline Break Act 1 into chapters. Calculate McKee Value Shifts (+/-) and cliffhangers.`

Saves the chapter breakdown to `docs/storycraft/chapter-roadmaps.md`.

---

## Step 6: Phase 3 — Autonomous Chapter Drafting

When you are ready to write:

### 1. Single or Batch Chapter Drafting
Type:
> `/novel-chapter-drafter Draft Chapter 1 based on our roadmap and story bible.`
> *Or:*
> `/novel-chapter-drafter Batch draft Chapters 1 through 3 with continuity checkpoints.`

The agent reads `story-state.md`, `story-bible.md`, and preceding chapters, drafting full 2,500–4,500 word chapters into `manuscript/chapter-[N].md` with Deep POV (zero filter words), sensory immersion, and subtextual dialogue.

---

## Step 7: Phase 4 & 5 — Revision and Continuity Auditing

### 1. Forensic Continuity Audit
Type:
> `/novel-continuity-checker Audit Chapter 2 against story-bible.md and story-state.md. Check injury decay and inventory.`

Saves the audit report into `docs/storycraft/audits/continuity-audit-ch02.md`.

### 2. Pacing and Tension Check
Type:
> `/novel-pacing-doctor Audit Chapter 4. Check for Act 2 drag and inject a ticking clock.`

---

## Step 8: Saving Progress and Session Persistence

Before closing your editor or when your AI conversation approaches token limits:

Type:
> `/novel-session-memory Checkpoint today's work and prepare the next session bootstrap prompt.`

The agent updates `story-state.md` with new chapter coordinates, active injuries, and inventory changes, providing an authoritative **Next Session Bootstrap Prompt**.

When you resume tomorrow, paste the bootstrap prompt in a fresh chat, and your agent picks up seamlessly where you left off.
