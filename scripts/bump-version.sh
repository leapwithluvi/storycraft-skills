#!/usr/bin/env bash
set -e

# Version bumper script for StoryCraft Skills
NEW_VERSION="$1"

if [ -z "$NEW_VERSION" ]; then
  echo "Usage: ./scripts/bump-version.sh <new-version>"
  exit 1
fi

echo "Bumping StoryCraft Skills version to $NEW_VERSION..."

# Update package.json
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.version = '$NEW_VERSION';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"

# Update .version-bump.json
node -e "
const fs = require('fs');
const vb = JSON.parse(fs.readFileSync('.version-bump.json', 'utf8'));
vb.currentVersion = '$NEW_VERSION';
fs.writeFileSync('.version-bump.json', JSON.stringify(vb, null, 2) + '\n');
"

echo "Version successfully bumped to $NEW_VERSION"
