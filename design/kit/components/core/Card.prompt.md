One-line: the only container style in the system — white surface, 1px warm hairline, 20px radius, soft warm shadow — used for hours, address, and "what you'll find" blocks.

```jsx
<Card>
  <h3>שעות פתיחה</h3>
  <HoursTable />
</Card>
```

Notes
- Never stack a card inside another card, and never add a colored left border.
- `interactive` only when the whole card is a link; otherwise no hover lift.
- On navy sections use `tone="dark"` instead of re-tinting a light card.
