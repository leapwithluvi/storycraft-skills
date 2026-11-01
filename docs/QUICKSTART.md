# StoryCraft Skills — Quickstart Guide for Authors 🚀

Welcome to StoryCraft Skills! This guide walks you through setting up a professional novel workspace and drafting your first chapter using the 15-skill pipeline.

---

## Step 1: Initialize Your Novel Workspace

Open your terminal in your novel's project directory and run:

```bash
# If using npx or local script
npx storycraft init
```

This creates two essential files in your folder:
1. `story-bible.md`: The permanent encyclopedia of your world, characters, magic rules, and master timeline.
2. `story-state.md`: The living checkpoint that tracks where you are right now and prevents AI memory loss.

---

## Step 2: Install Skills for Your AI Platform

Choose the platform you use:

### For Antigravity IDE / Antigravity CLI
Copy the pre-compiled `.agents/` folder into your novel workspace:
```bash
cp -r path/to/storycraft-skills/dist/.agents ./
```
Now in your Antigravity chat, you can invoke any skill via slash command:
- `/novel-premise-hook`
- `/novel-character-architect`
- `/novel-scene-beater`
- `/novel-session-memory`

### For Cursor
Copy the `.cursor/` rules:
```bash
cp -r path/to/storycraft-skills/dist/.cursor ./
```

### For Claude (Desktop or Web Projects)
Copy `CLAUDE.md` and `.claude/` into your project directory.

### For OpenAI Codex / OpenCode
Copy `AGENTS.md` and `codex/` into your project directory.

---

## Step 3: Phase 1 — Develop Your Premise & Cast

Start a conversation with your AI assistant and use the ideation skills:

### 1. Polish the Core Premise
Type:
> `/novel-premise-hook I have an idea about an underwater city where memories are taxed by an ancient syndicate, and an ex-diver discovers her dead daughter's memories in a contraband vault.`

The agent will apply the **4-Element Logline Formula**, identify the **Core Dramatic Question**, and run the **What-If Escalator**.

### 2. Build Your Protagonist & Antagonist
Type:
> `/novel-character-architect Let's flesh out the diver, Kira. What is the Lie she believes, her Ghost wound, and her Want vs. Need?`

The agent creates a psychological dossier complete with contradictory flaws, somatic tells, and foil relationships.

---

## Step 4: Phase 2 — Plotting & Chapter Roadmaps

### 1. Build the Macro Plot
Type:
> `/novel-plot-architect Help me structure the Three-Act / Nine-Block plot for this novel. What is the Midpoint shift?`

The agent maps the major turning points, pinch points, and the 75% Dark Night of the Soul.

### 2. Outline Chapter 1
Type:
> `/novel-chapter-outline Break down Chapter 1 into tight beats. What is the Value Shift (+ to -) and the closing cliffhanger?`

---

## Step 5: Phase 3 — Drafting Scenes with Maximum Immersion

When drafting prose, pair the drafting skills for cinematic quality:

### 1. Beat the Scene (Scene & Sequel)
Type:
> `/novel-scene-beater Draft Scene 1 of Chapter 1 with Kira breaking into the decompression valve. Apply 'In Late, Out Early'.`

### 2. Inject Multi-Sensory Textures
Type:
> `/novel-sensory-immersion Add olfactory, tactile, and thermal sensations to this decompression scene. Remove visual-only descriptions.`

### 3. Eliminate Filter Words with Deep POV
Type:
> `/novel-deep-pov Polish this draft into Deep POV. Remove all 'she saw', 'she felt', and 'she wondered'.`

---

## Step 6: Phase 4 & 5 — Subtextual Dialogue & Revision

### 1. Subtextual Dialogue
Type:
> `/novel-dialogue-subtext Kira is confronting her former handler in a tea shop. Make the dialogue cold and subtextual, using tea brewing as stage business.`

### 2. Pacing & Momentum Check
Type:
> `/novel-pacing-doctor Audit Chapter 3. Does it suffer from Act 2 drag? How can we inject a ticking clock?`

### 3. Continuity & Canon Verification
Type:
> `/novel-continuity-checker Audit Chapter 4 against story-bible.md. Did Kira remember her injured shoulder from Chapter 2?`

---

## Step 7: Saving Progress & Never Losing Context

Before closing your editor or when your AI conversation approaches token limits:

Type:
> `/novel-session-memory Checkpoint today's work and prepare the next session bootstrap prompt.`

The agent will update `story-state.md` with your new chapter coordinates, active injuries, inventory changes, and give you a **Next Session Bootstrap Prompt**.

When you resume tomorrow, simply paste the bootstrap prompt in a fresh chat, and your agent will pick up seamlessly where you left off! 🖋️
