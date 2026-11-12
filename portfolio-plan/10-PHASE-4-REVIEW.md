# Phase 4: navigation and routes

Date: 25 October 2026.
Arpit authorized this phase with the request to start the next phase.

## Result

The site now has ten direct routes and a missing-page response.
All routes share one header, footer, mobile menu, and motion preference.
The Home route retains the Phase 3 model and scroll film.
Other routes do not request the Home motion module.

Run `npm run preview` and open <http://127.0.0.1:4175/>.
Run `npm run build` to create the static site in `dist/`.

| Route | Current content |
| --- | --- |
| `/` | Home frame with the interactive model and scroll film |
| `/work` | Four selected projects and the six SMDEVOPS projects |
| `/work/backupdata` | Existing study frame; full study follows in Phase 5 |
| `/work/lighthouse` | Confirmed summary and contribution |
| `/work/1mb` | Confirmed summary and product context |
| `/work/turby` | Confirmed summary and contribution |
| `/ai-systems` | Existing AI frame with separate employment and personal contexts |
| `/journey` | Career records, events, and the November plan |
| `/about` | Introduction and education |
| `/contact` | Email, LinkedIn, and GitHub links |

The content remains subject to final fact review.
The shorter pages provide useful destinations for navigation.
They do not replace the full page work in later phases.
The site does not show an unconfirmed resume or testimonial.

## Technical choices

The build produces HTML for every route.
Native links support direct access, reload, and browser history.
A JavaScript router adds no value at this stage.
The static output also preserves content when JavaScript fails.

The mobile menu uses a native disclosure.
It does not lock scroll or trap keyboard focus.
Escape closes the menu and returns focus to its control.
A desktop resize closes the menu and preserves useful focus.
Current-page and current-section labels support orientation.
The skip link moves focus to the main content.

The local server resolves both slash and non-slash route forms.
Unknown routes return a useful page with HTTP status 404.
The production host must support directory routes and the supplied 404 page.
Final canonical URLs and old-link support remain Phase 15 work.

## Source files

| File | Responsibility |
| --- | --- |
| `src/site/routes.ts` | Route names and navigation membership |
| `src/site/shell.ts` | Shared HTML header, footer, and page structure |
| `src/site/main.ts` | Mobile controls and shared motion preference |
| `src/site/home.tsx` | Deferred Home media components |
| `src/site/site.css` | Navigation and route layouts |
| `scripts/build-site.mjs` | Public content selection and static output |
| `scripts/check-site.mjs` | Route and browser checks |

The build reuses the Phase 2 frames and Phase 3 Home structure.
Later page phases will replace these bodies without changes to the shared shell.
The browser receives only the public content projection.
The production entry omits the Phase 3 test interface.

## Checks

Run `npm run check` for TypeScript, content validation, and the 27 existing tests.
Run `npm run site:check` with the local server active.
The browser script requires Playwright and Chrome.
Set `PLAYWRIGHT_MODULE` if Playwright uses an external path.

All 27 tests and seven browser check groups pass.
The browser checks cover 26 local links and all ten routes at four widths.
Normal test paths produce no application JavaScript errors.

The browser report lives in `design/phase-4/review/browser-checks.json`.
The same folder contains desktop and mobile screenshots.
The checks cover routes, local links, fragments, current-page labels, history, menu controls, and narrow layouts.
They also cover navigation without JavaScript and motion preference across routes.

Physical phone, Safari, and screen-reader checks remain open.
The static pages retain `noindex,nofollow` during private review.
The live domain remains unchanged.

## Next phase

Phase 5 builds the complete BackupData study.
Real product images and technical decisions still need evidence.
The next implementation will preserve these limits instead of inventing results.
