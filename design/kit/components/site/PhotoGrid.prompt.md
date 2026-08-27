One-line: the gallery — a lazy-loaded grid of store photos driven by an array of `{src, alt}` so images can be swapped without layout work.

```jsx
<PhotoGrid columns={2} photos={[{src:"assets/photos/window-display.png", alt:"חלון הראווה של בריזה בגן העיר"}]} onSelect={setOpen} />
```

Notes
- 6–10 photos, portrait 3:4, warm interior light — do not colour-grade toward cool tones or add filters.
- Every photo needs a real Hebrew alt sentence; never "תמונה 1".
- Tiles get a 12px radius and hairline border; no captions, no hover zoom.
