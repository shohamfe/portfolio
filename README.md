# Shoham Fellner — Portfolio

Personal portfolio and interactive resume. Built from a Figma design, from concept to
production.

**Live:** _domain pending_

---

## Stack

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16 (App Router, static) | `next/font` self-hosts four families with no layout shift; real HTML per route for crawlers |
| Language | TypeScript (strict) | |
| Styling | Tailwind v4 + `cva` + `cn` | Every interaction library this design needs is Tailwind-native |
| Motion | [`motion`](https://motion.dev) | Drag, scroll-linked animation, springs — one library instead of four |
| Smooth scroll | [Lenis](https://lenis.dev) | |
| Tooltips | [`@floating-ui/react`](https://floating-ui.com) | Cursor-following positioning with correct ARIA, rather than a hand-rolled listener |
| Icons | `react-icons/pi` (Phosphor) | Brand logos are exported from Figma; Phosphor covers UI icons |

### No UI kit — on purpose

MUI and Meta's [Astryx](https://astryx.atmeta.com/) were both evaluated and rejected.

The design needs roughly four components a library would actually supply: a pill button, an
icon button, a chip, and a tooltip. Everything else — the folder canvas, the sticky notes, the
ruler scrollbar, the timeline — is bespoke. That made this a styling-engine decision, not a
component-library one, and a kit would have cost more in overrides than it saved.

## Design system

Tokens live in [`src/app/globals.css`](src/app/globals.css) in two layers:

1. **Palette primitives** — raw values lifted verbatim from the Figma variable set.
   Components never read these directly.
2. **Semantic tokens** — `surface-page`, `text-strong`, `text-dormant`, `accent`, and friends.
   This is the only layer components consume, so re-theming never touches a component.

Type scale (`text-h1` … `text-tiny`) and the four font families map 1:1 to the Figma text
styles. Tailwind's default 4px spacing scale already matches the Figma unit scale, so spacing
needed no customisation.

Fonts: **Syne** (display), **Google Sans Flex** (body), **Google Sans Code** (mono),
**Inter** (small text). Only the weights the design actually uses are requested.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build    # production build
npm run lint     # eslint
npx tsc --noEmit # typecheck
```

## Accessibility

Motion is central to this site, so `prefers-reduced-motion` **degrades** rather than disables:
Lenis is bypassed and transforms land instantly, but nothing disappears.

Decisions worth stating plainly:

- **Cursors are CSS**, not JavaScript. A JS cursor requires `cursor: none`, which overrides the
  pointer size and contrast settings some people depend on. Only the label pill that trails the
  arrow is JS-driven.
- **The ruler scrollbar is a visualisation, not a replacement.** Native scrolling, keyboard
  scrolling, and Page Up/Down all still work.
- **Dimmed resume sections keep AA contrast.** Text that is out of focus is still text someone
  might be reading.
- Draggable elements are keyboard-operable or explicitly marked decorative.

## Project structure

```
src/
  app/          routes, layout, global tokens
  components/   one folder per component; variants in *.variants.ts
  constants/    site metadata, tech catalogue
  lib/          shared helpers
public/
  cursors/      custom cursor SVGs
  logos/        technology logos, exported from Figma
```

## Credits

- [Magnetic effect](https://21st.dev/@ibelick/components/magnetic/nested) — @ibelick
- [Interactive hover button](https://21st.dev/@dillionverma/components/interactive-hover-button) — @dillionverma

## License

MIT
