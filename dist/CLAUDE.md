# StoryCraft Skills — Novel Writing Agent Instructions

> These rules equip the AI assistant with professional novel-writing craft.
> 15 specialized skills across the full fiction writing pipeline.

## Stage 0

- **novel-session-memory**: Use to maintain persistent narrative state across AI sessions, token window limits, and project pauses — manages story-state.md, tracks active chapters and character conditions, and generates zero-latency resume bootstrap prompts.
  - Rule file: `.claude/rules/novel-session-memory.md`

## Stage 1

- **novel-character-architect**: Use when designing complex, psychologically coherent characters — constructs the Want vs. Need engine, the Lie They Believe, the Origin Wound (Ghost), internal contradictions, and foil dynamics to sustain narrative arcs.
  - Rule file: `.claude/rules/novel-character-architect.md`
- **novel-premise-hook**: Use when developing the foundational concept for a novel — crafts high-concept premises, compelling loglines, central dramatic questions, and opening hooks that seize reader attention from page one.
  - Rule file: `.claude/rules/novel-premise-hook.md`
- **novel-worldbuilder**: Use when designing fictional worlds, settings, magic systems, technology levels, social hierarchies, and sensory environments for a novel — ensures worlds feel lived-in, organically integrated into plot, and free of encyclopedic info-dumps.
  - Rule file: `.claude/rules/novel-worldbuilder.md`

## Stage 2

- **novel-chapter-outline**: Use when decomposing structural acts into granular, chapter-by-chapter roadmaps — defines chapter goals, points of view, scene/sequel balance, emotional shifts (+/-), and irresistible cliffhangers or thematic resonances.
  - Rule file: `.claude/rules/novel-chapter-outline.md`
- **novel-plot-architect**: Use when designing macro-level story architecture, structural acts, major turning points, pinch points, and thematic climaxes — supports Three-Act/Nine-Block, Save the Cat Writes a Novel, Dan Wells 7-Point, and Kishōtenketsu.
  - Rule file: `.claude/rules/novel-plot-architect.md`

## Stage 3

- **novel-deep-pov**: Use when drafting or editing prose to eliminate psychic distance — removes sensory filter words ('she saw', 'he felt', 'she wondered'), merges authorial voice into character consciousness, and grounds perceptions in somatic immediacy.
  - Rule file: `.claude/rules/novel-deep-pov.md`
- **novel-scene-beater**: Use when drafting or revising granular scene beats within a chapter — applies Jim Butcher's Scene & Sequel dynamics, 'In Late, Out Early' editing, micro-tension injection, and conflict escalation.
  - Rule file: `.claude/rules/novel-scene-beater.md`
- **novel-sensory-immersion**: Use when drafting or polishing descriptions to eradicate generic visual-only prose — incorporates the 5+1 Sensory Framework (sound, smell, taste, tactile texture, thermal dynamics, and visceral proprioception) to make scenes tangible and evocative.
  - Rule file: `.claude/rules/novel-sensory-immersion.md`

## Stage 4

- **novel-dialogue-subtext**: Use when drafting or editing dialogue to eradicate expository, on-the-nose exchanges — crafts layered subtext, distinct character idiolects, conversational power dynamics, and tactical conversational maneuvers.
  - Rule file: `.claude/rules/novel-dialogue-subtext.md`
- **novel-prose-stylist**: Use when polishing draft prose for musical cadence, sentence-length variety, active verb vigor, precision nouns, and metaphorical freshness — eliminates verbal bloat, clichés, and mechanical phrasing.
  - Rule file: `.claude/rules/novel-prose-stylist.md`

## Stage 5

- **novel-pacing-doctor**: Use when diagnosing narrative drag, saggy middles, or rushed climaxes — calculates scene-to-sequel compression ratios, audits tension curves, and injects micro-deadlines and narrative ticking clocks.
  - Rule file: `.claude/rules/novel-pacing-doctor.md`
- **novel-structural-editor**: Use when executing developmental and structural manuscript audits — tracks setup-and-payoff matrices, audits Chekhov's guns, detects plot holes and motivational inconsistencies, and ensures thematic cohesion across the narrative arc.
  - Rule file: `.claude/rules/novel-structural-editor.md`

## Stage 6

- **novel-continuity-checker**: Use when auditing chapters for factual inconsistencies, timeline contradictions, character physical drift, inventory leaks, and magic rule violations — compares draft text against the canonical Story Bible.
  - Rule file: `.claude/rules/novel-continuity-checker.md`
- **novel-lore-bible**: Use when creating, expanding, and curating the comprehensive project story bible — organizes relational character dossiers, world laws, chronological timelines, faction hierarchies, and thematic motifs into a single canonical source of truth.
  - Rule file: `.claude/rules/novel-lore-bible.md`

