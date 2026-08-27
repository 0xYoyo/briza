One-line: the page opener — storefront photo, navy bottom scrim, glowing wordmark, tagline, and the WhatsApp button.

```jsx
<PhotoHero image="assets/photos/storefront-sign.png"
  alt="חלון הראווה של בריזה עם השלט המואר בקניון גן העיר"
  tagline="בגדי נשים מיובאים, מבחר שמתחדש כל שבוע, ויחס אישי כבר ארבעים שנה.">
  <Button variant="whatsapp" size="lg" icon="whatsapp" href={WHATSAPP_LINK} fullWidth>דברו איתנו בוואטסאפ</Button>
</PhotoHero>
```

Notes
- Text always sits on the scrim at the bottom — never centred over the middle of the photo, where the mannequins are.
- One action only. A second action here competes with the sticky `WhatsAppBar`.
- Do not tint or duotone the photo; the warm interior light against the navy fascia is the brand's contrast.
