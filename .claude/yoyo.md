# Yoyo-loop config

repo_slug: briza
linear_team: YOY
test_command:
lint_command:
typecheck_command:

sensitive_paths:
  - .github/workflows/
  - migrations/
  - "**/*.env*"
  - package.json
  - Makefile
  - ".claude/**"
  - docs/PRD.md
  - CNAME
  - netlify.toml
  - vercel.json
  - wrangler.toml

max_fix_rounds: 2
