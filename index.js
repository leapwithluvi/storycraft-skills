// StoryCraft Skills — Main Programmatic Entrypoint
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname));
const SKILLS_DIR = join(ROOT, 'skills');

export function getSkillsDir() {
  return SKILLS_DIR;
}

export function listSkillNames() {
  if (!existsSync(SKILLS_DIR)) return [];
  return readdirSync(SKILLS_DIR).filter(d => {
    return statSync(join(SKILLS_DIR, d)).isDirectory() && existsSync(join(SKILLS_DIR, d, 'SKILL.md'));
  });
}

export default {
  getSkillsDir,
  listSkillNames
};
