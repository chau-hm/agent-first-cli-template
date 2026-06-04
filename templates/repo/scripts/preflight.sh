#!/usr/bin/env bash
set -euo pipefail

npm run ci

if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  git diff --check
fi
