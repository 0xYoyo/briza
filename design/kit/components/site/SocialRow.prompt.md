One-line: row of 56px circular social links that silently hides any network whose profile does not exist yet.

```jsx
<SocialRow links={[{network:"instagram",href:"…"},{network:"facebook"},{network:"tiktok",href:"…"}]} />
```

Notes
- Links with no `href` are dropped, so the row never shows a dead icon (PRD §3.7).
- Brand glyphs stay monochrome ice/navy — never the platforms' own colours.
- Lives in the footer only; the WhatsApp conversion action is a `Button`, not an icon here.
