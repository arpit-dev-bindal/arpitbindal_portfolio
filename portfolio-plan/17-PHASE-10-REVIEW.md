# Phase 10: Work archive

Date: 27 October 2026.

## Result

The Work route now contains four selected studies and six earlier projects.
Open <http://127.0.0.1:4175/work>.

The selected studies cover BackupData, Lighthouse, 1MB, and Turby.
The Turby entry uses original collection artwork with a source link.
A separate link opens AI Systems.
The light archive section groups all six earlier projects under SMDEVOPS LLP.
The employment period describes the role, not individual project dates.

## Controls and access

Each archive entry uses a native disclosure control.
Enter, Space, touch, and mouse controls open each entry.
Direct links open the correct entry when JavaScript is available.
Browser history and reload retain access to the selected entry.
The controls also work without JavaScript.
Reduced motion and the site motion switch disable the disclosure mark transition.

## Checks

`npm run check` passes TypeScript, 29 tests, and content validation.
`npm run build` builds all ten routes and the missing-page response.
`npm run work:check` passes four browser check groups.
`npm run site:check` passes seven route and navigation check groups.
The Work page fits widths of 320, 390, 768, 1024, and 1440 pixels.
The checks cover keyboard controls, touch, direct links, browser history, reload, and no-JavaScript access.
The browser reports contain no application JavaScript errors.
Desktop and mobile screenshots show clear spacing and readable content.
Reports and screenshots reside in `design/phase-10/review/`.
The browser scripts require Playwright, Chrome, and the active preview server.
Physical phone, Safari, and screen-reader checks remain open.

## Remaining evidence

Individual project dates, responsibilities, technical choices, and measured results still need confirmation.
The archive marks these limits beside each product description.
Original media for the earlier projects remains unavailable.
The page does not add unsupported results or project dates.

## Files

| File | Purpose |
| --- | --- |
| `src/site/work-page.ts` | Studies and archive content |
| `src/site/work.css` | Desktop and mobile layout |
| `src/site/work-archive.ts` | Direct-link controls |
| `scripts/check-work.mjs` | Browser checks |

## Budget and next phase

This phase spent zero Higgsfield credits.
Total spend remains zero of the 100-credit limit.
Phase 11 covers Journey and About.
The live domain remains unchanged.
