# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| 1.x (latest) | Yes |

## Reporting a Vulnerability

If you discover a security vulnerability within StoryCraft Skills, please report it responsibly.

### How to Report

1. **Do NOT open a public GitHub issue** for security vulnerabilities.
2. Send a detailed report to: **security@primeradiant.com**
3. Include the following information:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact assessment
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: Within 48 hours of your report.
- **Assessment**: Within 7 business days, we will assess the severity and confirm validity.
- **Resolution**: Critical vulnerabilities will be patched within 14 days of confirmation. Non-critical issues will be addressed in the next scheduled release.
- **Credit**: Reporters will be credited in the release notes (unless anonymity is requested).

## Security Model

StoryCraft Skills operates under a **zero-dependency, zero-network, local-only** security model.

### Architecture Guarantees

1. **Zero External Dependencies**: The project has no `dependencies` or `devDependencies` in `package.json`. All scripts use exclusively Node.js built-in modules (`node:fs`, `node:path`, `node:test`, `node:assert`). This eliminates supply chain attack vectors entirely.

2. **Zero Network Access**: No script, skill file, or plugin configuration makes any network call. There are no `fetch()`, `XMLHttpRequest`, `WebSocket`, `http.request()`, `curl`, or `wget` invocations anywhere in the codebase.

3. **Zero Code Execution Vectors**: No use of `eval()`, `Function()`, `child_process.exec()`, `child_process.spawn()`, or dynamic code generation. All JavaScript is static, deterministic, and auditable.

4. **Zero Telemetry**: StoryCraft does not collect, transmit, or store any telemetry, analytics, or usage data. All state files (`story-state.md`, `story-bible.md`, manuscript chapters) remain entirely local within the author's project directory.

5. **Content-Only Skills**: All 23 skill files are pure markdown documents containing literary craft instructions. They cannot execute code, access the filesystem, or make system calls on their own. They are inert text consumed by the host agent.

### File Integrity

- **Binary files**: Only `assets/storycraft-logo.jpg` (project logo, 162 KB JPEG). No other binary files exist or should exist in this repository.
- **Executable files**: Only `tests/run-validation.sh` (a bash wrapper that runs `npm test`). No other file should have executable permissions.
- **Plugin configurations**: All `.json` plugin manifests contain only static metadata (name, version, description, file paths). No URLs other than the project's own GitHub repository URL.

### CI/CD Security

- GitHub Actions workflows use **pinned SHA hashes** (not mutable tags) for all third-party actions to prevent supply chain attacks via tag hijacking.
- CI runs only `npm test` (local file validation). No deployments, no artifact uploads, no secret access.

## Contribution Security Requirements

All pull requests must pass the following security checks before merge:

1. **No new dependencies**: Any PR adding entries to `dependencies` or `devDependencies` will be rejected unless there is an extraordinary, documented justification.
2. **No network calls**: Any PR introducing `fetch`, `http`, `https`, `net`, `dgram`, `WebSocket`, or equivalent network APIs will be rejected.
3. **No dynamic code execution**: Any PR introducing `eval()`, `Function()`, `child_process`, or `vm.runInContext()` will be rejected.
4. **No binary additions**: Any PR adding binary files (other than standard image formats for documentation) requires explicit maintainer approval with a documented rationale.
5. **No secret material**: Any PR containing API keys, tokens, passwords, private keys, or `.env` files will be rejected immediately.

## Verification

Authors and contributors can verify the security posture of their local checkout at any time:

```bash
# Verify zero external dependencies
cat package.json | grep -A5 '"dependencies"'
ls node_modules 2>/dev/null && echo "WARNING: node_modules exists" || echo "CLEAN: no node_modules"

# Scan for network calls in code
grep -rn --include='*.js' --include='*.mjs' --include='*.sh' \
  -E '(fetch\(|http[s]?://|eval\(|exec\(|child_process|spawn|curl |wget )' \
  . --exclude-dir=.git --exclude-dir=node_modules

# Verify no unexpected executables
find . -type f -executable -not -path './.git/*'

# Verify no unexpected binary files
find . -type f -not -path './.git/*' \
  -not -name '*.md' -not -name '*.json' -not -name '*.js' -not -name '*.mjs' \
  -not -name '*.sh' -not -name '*.yml' -not -name '*.yaml' -not -name '*.txt' \
  -not -name '*.jpg' -not -name '*.png' -not -name '*.svg' \
  -not -name '.gitignore' -not -name '.gitattributes' -not -name 'LICENSE'

# Run the full test suite
npm test
```

## License

This security policy is part of the StoryCraft Skills project, licensed under the MIT License.
