# Phase 6: Home

Date: 26 October 2026.
Arpit authorized the next phase after the BackupData update.

## Implemented page

Home now uses `src/site/home-page.ts` instead of the Phase 2 HTML frame.
The build selects public records and creates the page without browser access to source notes.

The page follows this order:

1. Introduction, interactive model, work link, contact link, and direct AI link.
2. Four areas of work: interface, systems, integration, intelligence.
3. Separate BackupData, Lighthouse, and 1MB project sections.
4. One film controlled by scroll.
5. Lighthouse agent memory and separate freelance and personal AI work.
6. Career progression with a link to Journey.
7. Turby and public contributions, with links to their pages.
8. Shared contact footer.

The introduction and project links remain readable without animation.
The page omits the unconfirmed testimonial and resume.
November work retains its planned label.
Real project images remain part of the final asset phase.
The project sections use text until those images arrive.

## Motion

The existing Three.js model retains its layer controls and short desktop pin.
The film retains normal flow, scroll reversal, and manual playback.
Section headings and project rows move upward by 24 pixels as they enter view.
GSAP animates position without hiding the text.
The site motion control and system preference remove these transforms.
Mobile retains the still image until the visitor enables the model.

The page keeps one main rich visual active at a time through the existing runtime controls.
The scene and film use the same geometry.
This phase creates no new generated media.

## Checks

`npm run check` passes TypeScript, 27 tests, and content validation.
`npm run site:check` checks all routes and layouts at four widths.
`npm run home:check` checks Home content paths, motion control, film reversal, and fallback content.

All four Home check groups and seven shared route check groups pass.
Normal Home test paths produce no application JavaScript errors.

The browser scripts require Chrome and Playwright, with the preview server active.
Set `PLAYWRIGHT_MODULE` when Playwright uses an external module path.
The Home report and screenshots live in `design/phase-6/review/`.
Physical phone, Safari, screen-reader, and performance checks remain open.
The ten-second clarity review still needs independent readers.

## Files

| File | Responsibility |
| --- | --- |
| `src/site/home-page.ts` | Public Home content and layout |
| `src/site/home.css` | Responsive Home styles |
| `src/site/home.tsx` | Media components and GSAP section motion |
| `scripts/build-site.mjs` | Home build integration |
| `scripts/check-home.mjs` | Home browser checks |

## Credit budget

The portfolio has a total Higgsfield limit of 100 credits.
This phase spent zero Higgsfield credits.
See `13-HIGGSFIELD-BUDGET.md` before any generation.

## Next phase

Phase 7 completes the Lighthouse and 1MB studies.
BackupData still needs remaining decision details, dates, measurements, and real product evidence.
The live domain remains unchanged.
