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

ui_paths:
  - (none yet — set when the project grows a UI)
ui_test_command: (none yet)

slack_channel_id: (optional — the notifications channel ID, enables the
watchdog's Slack verification)

max_fix_rounds: 2
