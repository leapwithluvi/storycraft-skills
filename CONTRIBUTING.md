# Contributing to StoryCraft Skills

Thank you for your interest in contributing to **StoryCraft Skills**! Our mission is to build the world's most disciplined, craft-accurate, and multiplatform AI skill library for novelists and story architects.

Whether you are fixing a typo, refining an existing literary methodology, or authoring a brand new Genre Expansion Pack, this guide covers everything you need to know.

---

## Code of Conduct

We are committed to providing a welcoming, constructive, and inclusive community for writers, narrative designers, and developers of all backgrounds. Please treat fellow contributors with kindness, empathy, and respect.

---

## Development Setup

StoryCraft Skills has **zero external runtime dependencies**. You only need [Node.js](https://nodejs.org/) (v18.0.0 or higher) and Git installed.

1. **Clone the repository:**
 ```bash
 git clone https://github.com/leapwithluvi/storycraft-skills.git
 cd storycraft-skills
 ```
2. **Verify installation & validation:**
 ```bash
 npm run validate
 ```
3. **Run the test suite:**
 ```bash
 npm test
 ```

---

## Anatomical Standards for `SKILL.md`

Every skill in StoryCraft resides in its own dedicated directory:
```
skills/
└── novel-<skill-name>/
 └── SKILL.md
```

### 1. YAML Frontmatter Requirements
The YAML header at the top of `SKILL.md` must adhere to this exact schema:

```yaml
---
name: novel-<skill-slug>
description: "<Clear, action-oriented 1-3 sentence summary of when and how the agent must invoke this skill>"
version: "1.0.0"
category: "ideation | plotting | drafting | style | revision | continuity | auxiliary"
stage: 0 | 1 | 2 | 3 | 4 | 5 | 6
tags: ["novel", "fiction", "<craft-tag>", "<optional-tags>"]
---
```

- `name` MUST start with `novel-`.
- `stage` must be an integer between `0` and `6`.
- `category` must match one of the 7 official categories.

### 2. Mandatory Content Sections
To ensure consistency and high-level reasoning across all LLMs, every `SKILL.md` **must** include the following 9 sections in order:

1. `# Overview & Purpose`
2. `## When to Use & Trigger Phrases`
3. `## Core Literary Methodology & Rules`
4. `## Required Project State & Inputs`
5. `## Step-by-Step Execution Protocol`
6. `## Quality Checklist & Verification Criteria`
7. `## Anti-Patterns & Prohibited AI Tropes`
8. `## Concrete Examples (Before vs. After Craft Application)`
9. `## Session State Hook`

---

## Creating a New Skill

Create a new directory under `skills/` and populate `SKILL.md`:

```bash
# Example: Creating a romance tropes skill
mkdir -p skills/novel-romance-rivalry
```

Create `skills/novel-romance-rivalry/SKILL.md` populated with all 9 required sections described below.

### Guidelines for Writing High-Quality Skills:
- **Literary Rigor**: Ground instructions in established narrative craft (e.g., K.M. Weiland, Robert McKee, John Gardner, Donald Maass, Jim Butcher, Brandon Sanderson).
- **Proactive & Actionable**: Tell the agent *exactly* what actions to take, what questions to ask, and what pitfalls to avoid.
- **Rich Before/After Examples**: Include at least two detailed before-and-after transformations comparing generic, flat writing with craft-polished prose.
- **Prohibit AI Tropes**: Explicitly ban lazy AI tendencies (filter words, smiling nodders, talking heads, unmotivated soap opera confessions).

---

## Genre Expansion Roadmap

We actively welcome Pull Requests introducing specialized **Genre Expansion Packs**:

- **Fantasy & World**: `novel-magic-costs`, `novel-faction-politics`, `novel-mythology-weaver`
- **Sci-Fi & Cyberpunk**: `novel-hard-scifi-physics`, `novel-cybernetic-body-horror`, `novel-space-naval-tactics`
- **Thriller & Mystery**: `novel-whodunit-clue-matrix`, `novel-red-herring-architect`, `novel-procedural-interrogation`
- **Romance & Drama**: `novel-enemies-to-lovers-beats`, `novel-emotional-intimacy-pacing`, `novel-slow-burn-tension`
- **Horror & Gothic**: `novel-dread-escalator`, `novel-uncanny-valley-atmosphere`, `novel-cosmic-insignificance`

---

## Testing & Validation

Before submitting a Pull Request, run the automated validator:

```bash
npm test
```

The test runner will verify:
- Valid YAML frontmatter and required metadata fields.
- Presence of all 9 mandatory sections.
- Body length adequacy (minimum 80 lines of substantive craft instructions).
- No placeholder or unfinished TODO tokens.

---

## Pull Request Submission Checklist

- [ ] My skill directory follows the `skills/novel-<slug>/SKILL.md` naming convention.
- [ ] Frontmatter contains valid `name`, `description`, `version`, `category`, `stage`, and `tags`.
- [ ] All 9 mandatory sections are present and fully fleshed out with deep literary craft.
- [ ] At least two concrete before-and-after craft examples are provided.
- [ ] `npm test` passes with zero errors.
- [ ] No extraneous dependencies or temporary build artifacts are included.
- [ ] Commit messages follow the Conventional Commits specification (e.g., `feat(skills): add novel-romance-rivalry skill`).

Thank you for helping writers craft unforgettable novels.
