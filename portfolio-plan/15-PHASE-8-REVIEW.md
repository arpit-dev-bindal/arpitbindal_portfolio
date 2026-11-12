# Phase 8: Turby

Date: 27 October 2026.

## Result

The Turby route now has a dedicated study and six-image gallery.
Open <http://127.0.0.1:4175/work/turby>.

The study covers mascot design, collection generation, launch work, and mint supervision.
The supplied draft letters support those contributions.
The gallery uses original published JPEG files from the [official Turby page](https://lighthouse.storage/turby).
The page attributes the images and variant names to Lighthouse.
The files contain complete variants, not separate trait layers.
No generated artwork replaces historical project evidence.

## Gallery

The gallery shows a static contact sheet without JavaScript.
Each image link opens its original file.
JavaScript adds a native modal viewer with Previous, Next, and Close controls.
Arrow keys change the image; navigation wraps at both ends.
Escape closes the viewer and returns focus to its opener.
The browser keeps focus inside the modal while it is open.
The page restores its previous scroll setting after close.
Reduced motion removes the thumbnail transition.

## Assets

Six images use 640 × 640 pixel JPEG files.
Their combined transfer size is 558,440 bytes.
`public/turby/provenance.json` records source URLs, byte counts, retrieval date, and SHA-256 hashes.
The images retain their original bytes.
The study contains no mint transaction, wallet connection, price, or sales claim.

## Checks

`npm run check` passes TypeScript, 27 tests, and content validation.
`npm run turby:check` checks images, keyboard controls, focus, repeated use, touch, widths, and no-JavaScript links.
`npm run site:check` checks shared routes and navigation.
All four Turby check groups and seven shared route check groups pass.
The local server now sends JPEG files with the correct image content type.
Normal test paths produce no application JavaScript errors.
The browser scripts require Chrome and Playwright, with the local server active.
Reports and screenshots live in `design/phase-8/review/`.
Physical phone, Safari, and screen-reader checks remain open.

## Scope limits

The original layered files and trait metadata are not available in the workspace.
A live trait compositor would require those files and confirmed combination rules.
The current viewer therefore presents finished variants.
Project dates, automation rules, technical decisions, and measured results remain open.
The source page establishes published artwork, not those missing details.

## Files

| File | Purpose |
| --- | --- |
| `src/site/studies/turby.ts` | Dedicated study and gallery markup |
| `src/site/studies/turby-assets.ts` | Image names and accessible descriptions |
| `src/site/turby-gallery.ts` | Modal controls and focus behavior |
| `public/turby/` | Original images and source manifest |
| `scripts/check-turby.mjs` | Gallery browser checks |

## Budget and next phase

This phase spent zero Higgsfield credits.
The portfolio allocation remains 100 credits.
Phase 9 completes the AI Systems page.
The live domain remains unchanged.
