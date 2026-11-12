# Phase 2: visual review

Date: 24 October 2026.
Status: frames ready for review. Arpit's visual approval remains open.

## Open the frames

[Open the local design review](http://127.0.0.1:4173/).

The review provides Home, BackupData, and AI Systems.
Each page supports desktop, tablet, and mobile widths.
The page controls select a frame. The size controls change its width.
The full-page link opens the selected page without the review controls.

Start the preview again with:

```sh
npm run design:preview
```

The server serves only `design/phase-2` on `127.0.0.1:4173`.
It does not serve the career source register or the supplied letters.
Set `PORT` if another application uses port 4173.

## Review images

| Frame | Desktop | Mobile |
| --- | --- | --- |
| Home opening | [Desktop image](../design/phase-2/review/home-desktop-top.png) | [Mobile image](../design/phase-2/review/home-mobile-top.png) |
| First project | [Desktop image](../design/phase-2/review/home-desktop-work.png) | [Mobile image](../design/phase-2/review/home-mobile-work.png) |
| BackupData study | [Desktop image](../design/phase-2/review/backupdata-desktop-top.png) | [Mobile image](../design/phase-2/review/backupdata-mobile-top.png) |
| AI Systems | [Desktop image](../design/phase-2/review/ai-systems-desktop-top.png) | [Mobile image](../design/phase-2/review/ai-systems-mobile-top.png) |

The review folder also contains full-page images and a review overview.

## Design direction

The concept remains **From interface to infrastructure**.
The design serves employers for senior engineering and technical leadership roles.

Design settings:

- Layout variation: 7/10.
- Final motion target: 7/10.
- Preview motion: 3/10.
- Content density: 3/10.

The opening pairs a large statement with one metal object.
Four separate layers represent interface, systems, integration, and intelligence.
The object uses silver surfaces and a recessed rose edge.
The generated image establishes material and composition only.
The final Three.js geometry can differ after performance tests.

Light sections provide space for project evidence.
Dark sections contain the opening, film, career summary, and contact action.
This follows Arpit's explicit request for dark and light sections.

## Visual system

| Element | Frame specification |
| --- | --- |
| Dark surface | `#101216` |
| Light surface | `#F2F3F5` |
| Text on dark | `#F4F5F7`; secondary `#AFB6C2` |
| Text on light | `#161A20`; secondary `#535D6B` |
| Accent | `#E75B7F` on dark; `#AA294E` for text on light |
| Display type | Space Grotesk, weights 500 and 600 |
| Body type | System sans-serif |
| Technical type | IBM Plex Mono, weight 400 |
| Desktop margins | 5vw; maximum 80px |
| Mobile margins | 22px |
| Content width | Maximum 1440px |
| Section space | 120px desktop; 72px mobile |
| Control height | Minimum 44px |
| Corners | 4px controls; 12px media; 20px reserved for dialogs |

The fonts and licenses reside in the asset folder.
The preview makes no external font request.
The font files use TTF for this review. Production can use optimized WOFF2 files.

## Page decisions

### Home

The opening shows the work link before the object on mobile.
The first project feature gives BackupData a separate light area.
The scope diagram names confirmed deliverables without a fabricated product screen.
Lighthouse and 1MB use compact disclosures in this frame.
The full Home build will give those projects separate features when real media exists.

The film occupies a wide frame after selected work.
AI Systems follows the film, before the career summary.
The career summary preserves both Lighthouse roles and the approximate SMDEVOPS end month.
The contact area supplies direct email and professional links.

This frame focuses on the opening, first project, and overall section rhythm.
Turby, event media, and extended career content remain later page work.
The unavailable recommendation stays absent.
Journey and About links target preview sections until their separate pages exist.

### BackupData

The introduction names the project, scope, and employer.
The study uses a contents rail on desktop and a short link list on mobile.
The first content section describes confirmed responsibility.
The next section shows a scope diagram.

Explicit evidence slots reserve space for product media and two technical decisions.
They do not invent screenshots, metrics, architecture, or past decisions.
The final section connects BackupData to Lighthouse's agent context work.

### AI Systems

The introduction separates Lighthouse from later freelance and personal work.
November remains planned at the source review date.
The first section shows the agent context contribution and a concept diagram.
Five disclosures cover the later AI areas.
Each disclosure shows supported text and the intended evidence format.

No real AI recording or transcript exists in the supplied evidence.
The frame therefore shows an example position, with an explicit pending label.
This evidence gap remains open for the final AI page.

## Component behavior

| Component | Behavior in this preview | Later implementation |
| --- | --- | --- |
| Desktop header | Working page and section links | Separate production routes |
| Mobile menu | Native dialog; Escape; focus return | Same access behavior |
| Main object | Generated poster with a short entry reveal | Three.js scene and equivalent layer controls |
| Project feature | Readable copy, scope diagram, study link | Real media and GSAP entry sequence |
| Earlier feature references | Native disclosures | Separate spacious Home features |
| Study contents | Anchor links; desktop sticky rail | Final section list |
| AI work areas | Native disclosures | Confirmed examples and media controls |
| Film | Clearly identified still concept | Scroll-controlled video with fallback |
| Motion control | On/off state; session preference | Shared setting across GSAP, Three.js, and video |

The preview uses small image reveals through the Web Animations API.
It does not contain a GSAP or Three.js runtime.
The production plan still uses GSAP and Three.js.
Phase 3 will test those systems before full page construction.

## Motion storyboard for Phase 3

| Position | Visual action | Text and control behavior |
| --- | --- | --- |
| Opening | Show separated metal layers beside the heading | Keep the heading and work link still |
| Story start | Hold the camera; select Interface | Show the first explanation |
| Story middle | Bring Systems and Integration into alignment | Change one explanation at a time |
| Story end | Join Intelligence with the other layers | Offer Assemble and individual layer controls |
| Selected work | Stop the scene; reveal one project image | Preserve normal page flow |
| Film entry | Start the film at the current scroll position | Keep Skip film and playback controls available |
| Film progress | Move forward or backward with scroll | Hold the exact frame when scroll stops |
| AI section | Stop the film | Keep the diagram and text still |

One controller will own the model transforms.
Manual layer selection will suspend scroll control until the visitor resumes the story.
The prototype will test that behavior before production implementation.
The pinned story will add no more than 120vh of scroll distance.
The film will remain in normal page flow.
Only one rich visual will move in the viewport at a time.

Mobile will use the poster by default and offer optional 3D.
Reduced motion will remove pinning, camera travel, automatic video, and entry reveals.
All facts and links will remain available without motion.

## Verification

| Check | Result |
| --- | --- |
| Page widths | All three pages pass at 360, 390, 768, 1024, and 1440px |
| Horizontal overflow | None at tested widths |
| Images | All referenced images load |
| Fonts | Space Grotesk loads locally |
| Headings | One main heading on each page |
| Menu | Open, Escape, focus return, and Contact navigation pass |
| Review controls | Page selection, size selection, and frame navigation pass |
| Disclosures | AI expansion passes |
| Motion | Preference control, session persistence, and reduced motion pass |
| Contrast | Six main text/background pairs exceed 4.5:1 |
| Browser errors | None during the checks |
| Existing content tests | All 18 pass; TypeScript passes |

Browser checks used desktop Chrome with viewport changes.
They do not establish results on physical phones or Safari.
The full access and performance checks remain in the release plan.
Visual inspection found an image height defect. The corrected frames pass an added size check.

The machine-readable results appear in `design/phase-2/review/browser-checks.json`.
The check script uses Playwright from the available workspace runtime.
Set `PLAYWRIGHT_MODULE` to that package's `index.mjs` when it does not exist in local dependencies.
The script requires a local Chrome installation and the preview server.

## Asset sources

- The internal image tool generated `layers-concept.png` for this phase.
- [Google Fonts: Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) supplies the display font.
- [Google Fonts: IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) supplies the technical font.
- Font license files remain beside the local font files.
- The supplied source register supplies career and project text.

## Review status

| Decision | State |
| --- | --- |
| Frame production | Complete |
| Desktop and mobile checks | Pass within the stated test scope |
| Typography, palette, and space | Ready for Arpit's review |
| Layered object direction | Ready for Arpit's review |
| Real project media and AI example | Evidence pending |
| Visual approval | Open |
| Phase 3 scene and film prototype | Next after visual review |

The frames form a concrete review proposal.
They do not change the live site or claim release readiness.
