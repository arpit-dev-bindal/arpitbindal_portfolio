# Complete Option A website

Date: 29 October 2026.
Status: Visitor implementation complete. Public deployment has not occurred.

## Delivered site

All ten planned pages now use the completed Option A presentation.
Home includes the interactive model, contribution panels, scroll film, AI context map, career rail, and original Turby artwork.
Work includes all four studies and six earlier SMDEVOPS projects.
Each main study opens with a relevant visual and confirmed scope.
AI Systems provides a context diagram and optional, clearly labeled examples.
Journey provides an active year rail with accurate role periods and public contributions.
About connects responsibilities, original artwork, leadership, and education.
Contact provides email, copy feedback, public profiles, and the resume download.

The design retains charcoal, paper, rose accents, Space Grotesk, and the original four-layer geometry.
Shared spacing, hover states, focus states, disclosures, and section navigation now follow one presentation.
The visitor pages do not expose internal draft-review instructions or unknown-date placeholder fields.
The normal preview and clean preview now show the same completed visitor content.
Optional scene and playback controls remain available through compact disclosures.

## Content and evidence

The site uses the supplied career and project records.
Approximate dates, planned work, and illustrative examples retain clear labels.
Generated diagrams explain scope without claiming to reproduce production architecture.
The site does not invent product screenshots, metrics, testimonials, portrait photographs, or event photographs.
Missing original media no longer creates an empty visitor-facing slot.
Source gaps remain in the content records and earlier review files.
Those gaps do not become verified facts through this visual update.
Real product captures can replace the scope illustrations when available.

## Resume

The site now includes a two-page resume at `/resume/arpit-bindal.pdf`.
The generated PDF uses the same confirmed public content records as the site.
It includes career roles, selected projects, public contributions, and education.
It excludes certifications, unsupported metrics, and future completion claims.
Chrome marks the PDF as tagged. A visual check confirms both pages and their spacing.
The file contains selectable text and clickable professional links.
Tagging does not establish a complete screen-reader audit.
The editable generation script lives at `scripts/build-resume.mjs`.

## Checks

TypeScript, all 31 tests, content validation, and the full build pass.
The existing twelve browser suites cover 54 check groups.
The final study rerun replaces an obsolete expectation for an internal review disclosure.
All browser suites pass with the intentional visitor interface changes.

The completion scan checks every page with axe against the selected WCAG A and AA rules.
It checks five viewport widths: 320, 390, 768, 1024, and 1440 pixels.
It checks every route at 320 pixels without JavaScript.
It checks the PDF response, AI disclosures, and active career navigation.
It finds no automated accessibility violations, page-wide overflow, internal review placeholders, or application JavaScript errors.

The additional release checks pass zoom, WebGL failure, film failure, and mobile load samples.
The final zoom correction keeps the long hero word inside the page at 200%.
Axe retains manual-review items for some dynamic controls, color contrast, and the silent film.
The raw report preserves these incomplete items rather than treating them as confirmed passes.
The cold-load mobile samples record Home LCP at 1,072ms and BackupData LCP at 924ms.
Those local samples do not establish field performance or physical device behavior.
Physical phone, desktop Safari, and manual screen-reader checks remain external review tasks.
Automated accessibility results do not establish complete compliance.

## Run and edit

Run `npm ci` once after checkout.
Run `npm run preview:clean` to build and start the local visitor preview.
Open <http://127.0.0.1:4175/>.
Run `npm run build` for static output in `dist/`.
Run `npm run check` for TypeScript, unit tests, and content validation.
Run `npm run completion:check` with Playwright, axe-core, and the preview server available.
Use `PLAYWRIGHT_MODULE` and `AXE_PATH` for external tool installations.
Run `npm run resume:build` to regenerate the PDF after approved content edits.
The PDF script requires Playwright and Chrome.

## Deployment boundary

This task completes the local website implementation.
The live arpitbindal.com site and its domain settings remain unchanged.
The build retains preview noindex and robots rules until an approved release.
Hosting configuration, publication, and physical device verification belong to deployment review.
Historical review files describe their earlier phase state; this document records the current implementation.

## Budget

This update spends zero Higgsfield credits.
The ledger retains 34 reserved credits and 66 available credits.
Final charges for the earlier image and video remain unconfirmed.
