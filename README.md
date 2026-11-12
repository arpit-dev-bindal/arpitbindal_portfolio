# Arpit Bindal portfolio

The complete Option A website contains ten pages, interactive 3D, scroll video, project visuals, and a downloadable resume.
Read [the implementation record](portfolio-plan/26-COMPLETE-SITE-REVIEW.md) for checks and deployment scope.

## Start

Use Node.js 22.18 or later. The project records Node.js 22.23.1 in `.nvmrc`.

```sh
npm ci
npm run preview:clean
```

Open <http://127.0.0.1:4175/>.
Stop an earlier server on that port before a restart.
The preview command builds the current site and starts its local server.
Run the command again after source edits.
The current visitor presentation also appears with `npm run preview`.

## Build and check

```sh
npm run build
npm run check
```

The build writes static files to `dist/`.
The check command runs TypeScript, 31 tests, and content validation.
The build does not publish the site or change the live domain.

## Browser checks

The browser scripts require Chrome, Playwright, and an active preview server at port 4175.
Set `PLAYWRIGHT_MODULE` when Playwright lives outside the project.
Set `AXE_PATH` to an axe.min.js file for accessibility scans.
The release and completion scripts use a temporary axe installation by default.

```sh
npm run site:check
npm run completion:check
npm run release:check
```

The remaining page-specific check commands appear in package.json.
Reports from the current all-page review reside in `design/completion/review/`.
Earlier phase reports preserve historical implementation context.

## Content

`src/content/portfolio.ts` stores the career facts, projects, public contact data, and source references.
`src/content/validate.ts` checks dates, evidence references, and public records.
Public pages omit internal review instructions and unknown-date placeholder fields.
Approximate dates and illustrative examples retain clear labels.
The site excludes certifications.

## Site code

| Path | Purpose |
| --- | --- |
| `src/site/` | Static page templates and browser controls |
| `src/site/finish.css` | Shared Option A layout and interaction styles |
| `src/site/project-visuals.ts` | Contribution illustrations |
| `src/site/ai-map.ts` | Agent context concept map |
| `src/motion/` | Three.js model, GSAP scene, and scroll film |
| `scripts/build-site.mjs` | Page, asset, and browser bundle build |
| `public/` | Original Turby images, social images, and resume |

The site uses static HTML, TypeScript, React islands, Three.js, and GSAP.
It has no form backend or live AI service.
Native navigation and essential content work without JavaScript.

## Landing page

The landing page uses the ink and gilt theme: warm black, ivory, one antique-gold accent, Instrument Serif display type, and a fine particle scene. It has no sound. Testimonials live in `src/content/testimonials.ts`; an entry with `placeholder: true` renders as an empty, labelled slot.
`src/site/landing-page.ts` builds the sections from the content records.
`src/site/particles.ts` draws the cloud; scroll position blends the orb, galaxy, and brain shapes.
`src/site/theme.css` applies the theme to every route.
The build recolours the earlier stylesheets for the dark theme.

Set the visitor media in `src/content/media.ts`:

| Field | File location | Result |
| --- | --- | --- |
| `portrait` | `public/portrait/` | Cut-out portrait inside the hero name. `editorial.webp` was generated with Higgsfield from two photos Arpit supplied. |
| project logos | `public/logos/` | Brand logos beside each selected project. Each links to the brand website. Arpit supplied the files and addresses. |
| `talks` | None | Video previews on an event card |
| `proof` | `public/events/` | Event page crop on an event card |
| `photos` | `public/events/` | Photograph row on an event card |

An empty field renders a labelled media slot.
The earlier browser check scripts target the previous home page and need an update before use.

## Resume

Download [the resume](public/resume/arpit-bindal.pdf).
The two-page PDF derives from the confirmed public content records.
It contains tagged, selectable text and professional links.

```sh
npm run resume:build
npm run build
```

The resume command requires Playwright and Chrome.
Inspect the rendered PDF after content changes.

## Media and budget

The site uses the selected model-rendered film and original Turby artwork.
Generated candidates remain outside the visitor build because they changed the geometry.
The [credit ledger](portfolio-plan/13-HIGGSFIELD-BUDGET.md) retains the 100-credit total limit.
The ledger reserves 34 credits for completed earlier jobs and leaves 66 credits available.
This completion update spends zero Higgsfield credits.

## Deployment

The build currently retains noindex metadata and a disallow-all robots file.
Review those settings with the hosting target before an approved public release.
The canonical and share URLs use the intended arpitbindal.com domain.
The local preview server does not define production hosting, access control, or cache configuration.
No public deployment occurred during implementation.

## Design history

The original plan resides in `portfolio-plan/`.
The selected refresh plan is [Option A](portfolio-plan/24-DESIGN-REFRESH-PROPOSAL.md).
Comparison boards reside in `design/refresh-research/`.
The optional `design:*` and `motion:*` commands rebuild earlier prototypes for technical review.
