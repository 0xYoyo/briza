One-line: one line of store information — address, phone, hours — with a circled icon at the reading start; becomes a full-width tap target when `href` is set.

```jsx
<InfoRow icon="map-pin" label="כתובת" value="אבן גבירול 71, קניון גן העיר, קומת כניסה"
  href="https://maps.google.com/?q=..." />
<InfoRow icon="phone" label="טלפון" value="052-4381666" href="tel:+972524381666" />
```

Notes
- Phone numbers stay in Hebrew-reading order as written (052-4381666); wrap in `dir="ltr"` only if a browser reverses them.
- Stack rows inside a `Card`, separated by a hairline, not by extra margin.
- Use `tone="dark"` inside a navy visit/footer section.
