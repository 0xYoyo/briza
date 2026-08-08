# Yoyo-loop config

repo_slug: briza
linear_team: YOY
test_command: npm run test
lint_command: npm run lint
typecheck_command: npm run typecheck

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

ui_paths:
  - src/**
  - public/**
ui_test_command: npm run test:ui

slack_channel_id: C0BL7QBNER4

max_fix_rounds: 2
