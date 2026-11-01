import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const ROOT_DIR = resolve(process.cwd());
const SKILLS_DIR = join(ROOT_DIR, 'skills');

describe('StoryCraft Skills Validation Suite', async () => {
  const entries = await readdir(SKILLS_DIR, { withFileTypes: true });
  const skillDirs = entries.filter(e => e.isDirectory()).map(e => e.name).sort();

  it('should contain all 23 specialized novel-writing skills', () => {
    assert.strictEqual(skillDirs.length, 23, `Expected 23 skills, found ${skillDirs.length}`);
  });

  for (const skillName of skillDirs) {
    describe(`Skill: ${skillName}`, () => {
      const skillPath = join(SKILLS_DIR, skillName, 'SKILL.md');

      it('should have a valid SKILL.md file', async () => {
        const fileStat = await stat(skillPath);
        assert.ok(fileStat.isFile(), 'SKILL.md must be a file');
      });

      it('should have valid YAML frontmatter with name and description', async () => {
        const content = await readFile(skillPath, 'utf8');
        assert.ok(content.startsWith('---\n'), 'Missing opening frontmatter delimiter');
        const end = content.indexOf('\n---\n', 4);
        assert.ok(end > 4, 'Missing closing frontmatter delimiter');
        const frontmatter = content.slice(4, end);
        assert.match(frontmatter, /^name:\s*[\w-]+$/m, 'Frontmatter missing valid name');
        assert.match(frontmatter, /^description:\s*.+$/m, 'Frontmatter missing valid description');
      });

      it('should satisfy all 9 canonical craft sections', async () => {
        const content = await readFile(skillPath, 'utf8');
        const checks = [
          { name: 'Overview', pattern: /(?:#|##)\s*Overview/i },
          { name: 'When to Use', pattern: /##\s*When to Use/i },
          { name: 'Core Principles / Methodology', pattern: /##\s*(?:Core Literary Methodology|Core Principles)/i },
          { name: 'Required Inputs / State', pattern: /##\s*(?:Required Project State|Required Inputs|Operational Protocol)/i },
          { name: 'Step-by-Step Execution', pattern: /##\s*Step-by-Step (?:Execution Protocol|Workflow)/i },
          { name: 'Quality Checklist', pattern: /##\s*(?:Quality Checklist|Verification Checklist)/i },
          { name: 'Anti-Patterns', pattern: /##\s*Anti-Patterns/i },
          { name: 'Concrete Examples', pattern: /##\s*(?:Concrete Examples|Examples)/i },
          { name: 'Session State Hook', pattern: /##\s*(?:Session State Hook|Success Criteria)/i }
        ];

        for (const check of checks) {
          assert.ok(check.pattern.test(content), `Missing mandatory section: ${check.name} in ${skillName}`);
        }
      });

      it('should be rich and comprehensive (exceeding 80 lines)', async () => {
        const content = await readFile(skillPath, 'utf8');
        const lines = content.split('\n');
        assert.ok(lines.length >= 80, `Skill ${skillName} is too short (${lines.length} lines)`);
      });
    });
  }
});
