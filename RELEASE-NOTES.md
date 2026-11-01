# Release Notes

## Release v1.0.0 (2026-11-01)

Initial release of StoryCraft Skills: a complete fiction writing methodology and agentic skill system for novel architects, fiction authors, and writing agents.

### Highlights

- **20 Specialized Fiction Skills**: Complete literary pipeline spanning Stage 0 (Meta & Ideation) through Stage 6 (Continuity & Story Bible).
- **Zero-Latency State Persistence**: Solves LLM context-window truncation and memory loss via `story-state.md` checkpoints and the Next Session Bootstrap Prompt.
- **Autonomous Chapter Drafter**: Single and multi-chapter batch drafting engine (`novel-chapter-drafter`) that ingests project state and prior chapter files.
- **Publishing Format Flexibility**: Native support for Webnovels (rapid pacing, 1,500w chapters, cliffhanger hooks), Traditional Commercial Novels (80k-100k words, 3-act structure), Light Novels, and Serial Fiction.
- **Zero-Dependency CLI & Compiler**: `bin/storycraft.mjs` natively validates, tests, scaffolds, and exports all skills into platform-specific formats.
- **Multi-Harness Plugin Architecture**: Pre-compiled distributions and manifests for Antigravity, Cursor, Claude Code, OpenAI Codex, Devin, Factory Droid, Gemini CLI, Grok, Kimi Code, OpenCode, Pi, Qwen Code, Hermes Agent, and Muse.

### Skills Included in v1.0.0

#### Stage 0: Meta & Creative Discovery
- `using-storycraft`: Diagnostic project auditor and autonomous skill router.
- `novel-brainstorming`: Socratic creative interview, theme discovery, and comp title alignment.
- `novel-session-memory`: Real-time session checkpointing and bootstrap prompt generation.

#### Stage 1: Ideation & World Architecture
- `novel-premise-hook`: 4-Element Logline, Core Dramatic Question, and What-If escalation.
- `novel-character-architect`: Psychological Lie, Origin Wound (Ghost), Want vs. Need, and ensemble foils.
- `novel-worldbuilder`: Sanderson's Laws of Magic, Iceberg Principle, and sensory ecology.
- `novel-genre-specialist`: Obligatory scene enforcement, trope subversion, and publishing format adaptation.

#### Stage 2: Plotting & Narrative Architecture
- `novel-plot-architect`: Three-Act Nine-Block, Dan Wells 7-Point, Midpoint Reversals, and Kishotenketsu.
- `novel-twist-architect`: Fair-Play Clue Protocol, three-dimensional red herrings, and Recontextualization twists.
- `novel-chapter-outline`: Chapter roadmaps with McKee Value Shifts (+/-), Swain's Scene/Sequel, and multi-POV scheduling.

#### Stage 3: Scene & Chapter Drafting
- `novel-chapter-drafter`: Full chapter and batch execution engine reading state and preceding manuscript files.
- `novel-scene-beater`: In Late / Out Early cutting, micro-tension injection, and "Yes, but / No, and" outcomes.
- `novel-sensory-immersion`: 5+1 sensory architecture (sound, smell, touch, temperature, somatics) and defamiliarization.
- `novel-deep-pov`: Sensory filter word eradication, Gardner Level 5 psychic distance, and neurobiological reaction sequences.

#### Stage 4: Dialogue & Voice Styling
- `novel-dialogue-subtext`: Text vs. Subtext, conversational power dynamics, distinct idiolects, and prop stage business.
- `novel-prose-stylist`: Gary Provost sentence cadence, active verb vigor, precision nouns, and cliché elimination.

#### Stage 5: Revision & Developmental Editing
- `novel-pacing-doctor`: Tension curve analysis, Act 2 middle repair, time dilation/compression, and ticking clocks.
- `novel-structural-editor`: Setup-and-Payoff matrix auditing, Chekhov's Gun tracking, and Idiot Plot prevention.

#### Stage 6: Continuity & Story Bible
- `novel-lore-bible`: Single Source of Truth `story-bible.md` management and relational taxonomies.
- `novel-continuity-checker`: 5-vector forensic audits (biometrics, wound decay, inventory custody, spatial travel).
