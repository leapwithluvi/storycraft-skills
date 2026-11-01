#!/usr/bin/env bash
set -euo pipefail

echo "=========================================="
echo "StoryCraft Skills - Test Suite Execution"
echo "=========================================="

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

echo "Checking node environment..."
node --version

echo "Running skill validator..."
node "${ROOT_DIR}/scripts/validate-skills.mjs"

echo "Running repository cleanliness audit..."
# Ensure dist/ and bin/ do not exist as tracked files
if git ls-files | grep -E '^(dist/|bin/)' > /dev/null; then
  echo "ERROR: Tracked files found in dist/ or bin/. Dist and bin must not be tracked."
  exit 1
fi

echo "=========================================="
echo "All StoryCraft validation checks passed!"
echo "=========================================="
