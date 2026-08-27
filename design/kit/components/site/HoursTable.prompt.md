One-line: definition-list of opening hours with hairline rows, tabular numerals, and an optional bolded "היום" row.

```jsx
<HoursTable todayIndex={0} />
```

Notes
- `brizaHours` holds the real hours (ראשון–חמישי 9:30–19:00, שישי 9:30–14:00, שבת סגור) — use it rather than retyping them.
- Hours are grouped as on the door; do not expand into seven rows.
- Live in a `Card` next to the address row; never inside the hero.
