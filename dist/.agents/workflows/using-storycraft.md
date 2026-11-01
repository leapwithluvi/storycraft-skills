# /using-storycraft Workflow

Use at the start of any novel-writing session or when the author is unsure what step to take next — inspects project state, diagnoses narrative bottlenecks, and routes execution to the exact appropriate StoryCraft skill.

## Activated Skill Instructions

When this workflow or slash command is triggered, the agent must adopt the persona, methodology, and execution protocol defined in [using-storycraft](file://.agents/skills/using-storycraft/SKILL.md):


# Overview & Purpose

This meta-skill acts as the central conductor and autonomous workflow orchestrator of the entire StoryCraft ecosystem. Much like `using-superpowers` in software engineering agents, `using-storycraft` ensures that an AI agent never dives blindly into generating generic prose or ungrounded plots. Instead, it systematically assesses the author's current project lifecycle, inspects existing files (`story-state.md`, `story-bible.md`, `manuscript/`), and guides both author and agent to the single highest-leverage craft skill needed next.

The agent uses this skill to:
- Conduct an automated **Project Diagnostic Audit** upon opening a novel workspace.
- Identify the exact **Production Phase (Stages 0 through 6)** currently underway.
- Detect **Missing Prerequisites** (e.g., attempting to draft Chapter 8 without an outline or character Lie).
- Provide a clear, actionable **Phase Routing Recommendation** so the author never feels overwhelmed.

## When to Use & Trigger Phrases

**Activate this skill when:**
- Starting a brand-new chat session in an existing novel workspace.
- The author opens with a broad prompt: "What should we do next?", "Where are we?", or "Let's continue my novel."
- The author is overwhelmed and doesn't know which specialized skill to call.
- Onboarding a new novel project into the StoryCraft directory layout.
- Resuming work after days or weeks away from the manuscript.

**Example trigger phrases:**
- "Where are we on my novel?"
- "What's our next step?"
- "Help me navigate my project"
- "Audit my novel progress"
- "/using-storycraft"
- "Start today's writing session"

## Core Literary Methodology & Rules

### 1. The Production Hierarchy of Needs
Writing a novel is a sequential assembly process. Attempting downstream stages without upstream foundations produces structural collapse:
```
Stage 0: Creative Brainstorming & Theme Discovery
   ↓
Stage 1: Premise, Character Wound & World Ecology
   ↓
Stage 2: Macro Plot, Turning Points & Chapter Breakdown
   ↓
Stage 3: Granular Scene Beating & Deep POV Chapter Drafting
   ↓
Stage 4: Dialogue Subtext & Line Prose Styling
   ↓
Stage 5: Tension Pacing & Structural Setup-Payoff Auditing
   ↓
Stage 6: Continuity Verification & Story Bible Canonization
```
- *The Cardinal Rule*: Never draft prose (Stage 3) if the character lacks an active Want and the scene lacks an opposing disaster (Stage 1 & 2).

### 2. The Workspace Triage Protocol
Upon activation, the agent inspects the file tree in order:
1. Does `story-state.md` exist? $\rightarrow$ Read current coordinates (Chapter, Scene, POV, Word Count).
2. Does `story-bible.md` exist? $\rightarrow$ Check for filled Character Dossiers and World Rules.
3. Does `manuscript/` exist? $\rightarrow$ Check the latest written chapter file and word count.

### 3. Skill Recommendation Routing Matrix

| Project Condition | Primary Skill to Route | Secondary / Fallback Skill |
| :--- | :--- | :--- |
| No premise or just a raw idea | `novel-brainstorming` | `novel-premise-hook` |
| Premise exists, but characters feel flat | `novel-character-architect` | `novel-genre-specialist` |
| Characters exist, but world/magic is empty | `novel-worldbuilder` | `novel-lore-bible` |
| Cast & world locked, but no plot arc | `novel-plot-architect` | `novel-twist-architect` |
| Macro plot locked, need chapter plans | `novel-chapter-outline` | `novel-pacing-doctor` |
| Outline ready, ready to draft scenes | `novel-chapter-drafter` | `novel-scene-beater` |
| Draft exists, feels distant or clunky | `novel-deep-pov` | `novel-sensory-immersion` |
| Dialogue feels robotic or on-the-nose | `novel-dialogue-subtext` | `novel-prose-stylist` |
| Chapter completed, need continuity check | `novel-continuity-checker` | `novel-structural-editor` |
| Ending session or token window high | `novel-session-memory` | `novel-lore-bible` |

## Required Project State & Inputs

**Before executing this skill, check for:**
- File existence: `story-state.md`, `story-bible.md`, `manuscript/`.
- Conversation context: Did the author provide a specific task or request an open session check-in?

**If no files exist:** Offer to run `storycraft init` or initiate `novel-brainstorming` to birth the project.

## Step-by-Step Execution Protocol

1. **Step 1: Rapid Environment Scan**
   - Check if `story-state.md` exists. If found, extract:
     - Active Chapter & Scene.
     - POV Character.
     - Last session checkpoint and pending decisions.
   - Scan `manuscript/` for the latest file (e.g., `chapter-03.md`).

2. **Step 2: Calculate Stage Completion**
   - Evaluate whether earlier stages have unresolved gaps (e.g., missing antagonist Lie, unresolved plot hole).

3. **Step 3: Present the Executive Status Dashboard**
   - Provide a concise 4-line status summary:
     - 📖 **Novel Title & Current Coordinates**
     - 🎯 **Current Milestone Objective**
     - ⚠️ **Identified Blockers or Open Loops**
     - 🚀 **Recommended Next Skill**

4. **Step 4: Offer Clear Action Paths**
   - Give the author two distinct paths forward:
     - **Path A (The Recommended Primary Flow)**: Execute the next sequential skill.
     - **Path B (The Fast-Track Alternative)**: Jump straight to drafting or editing if the author has immediate creative momentum.

## Quality Checklist & Verification Criteria

- [ ] Does the agent accurately identify the novel's current phase without hallucinating progress?
- [ ] Are recommendations grounded in the strict Stage 0–6 literary hierarchy?
- [ ] Is the output concise, avoiding overwhelming the author with twenty options at once?
- [ ] Does the agent seamlessly transition into the selected skill once the author confirms?

## Anti-Patterns & Prohibited AI Tropes

- ❌ **The "Just Start Writing" Trap**: Diving into Chapter 1 drafting when the author has not defined the protagonist's flaw or the core dramatic question.
- ❌ **The Overwhelming Menu**: Dumping all 20 skills in a giant wall of text instead of diagnosing and recommending the single best action.
- ❌ **The Amnesiac Reboot**: Asking the author "What is your novel about?" when `story-bible.md` already contains complete dossiers.

## Concrete Examples (Before vs. After Craft Application)

### Example 1: Resuming an In-Progress Novel Project

**Before (Unassisted AI Responding to "What should we do?"):**
> Hello! You can do whatever you want! We could write a new chapter, brainstorm some characters, make a magic system, or edit previous work. What sounds fun to you today?

**After (Using-StoryCraft Autonomous Triage):**
> 🧭 **StoryCraft Status Dashboard: *The Obsidian Meridian***  
> - **Current Coordinates:** Chapter 4 (Scene 2: Subterranean Canal) | POV: Kira Vance  
> - **Current Word Count:** ~11,200 words  
> - **Active Conflict:** Kira has escaped the archives with the cipher, but her left shoulder is dislocated and Captain Brandt is sealing the floodgates in 30 minutes.  
> 
> 🔍 **Diagnostic Assessment:**  
> Your chapter beats for Chapter 4 are outlined, but Scene 2 has not been drafted yet. Kira's active physical trauma requires tight sensory grounding.  
> 
> 🚀 **Recommended Next Step:**  
> Invoke **`/novel-chapter-drafter`** (or `/novel-scene-beater`) to draft Scene 2, integrating her injury limitations via **`novel-deep-pov`**.  
> 
> Shall we begin drafting Scene 2, or would you prefer to review Chapter 3 first with **`/novel-continuity-checker`**?

## Session State Hook

When completing project orchestration:
1. Always synchronize any newly determined project goals into `story-state.md` under `## 2. Active Plot Threads & Stakes`.
2. Seamlessly transfer execution to the invoked skill.

