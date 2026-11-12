# Phase 7: Lighthouse and 1MB

Date: 27 October 2026.
Status: dedicated study pages implemented; complete technical evidence remains open.

## Pages

- Lighthouse: <http://127.0.0.1:4175/work/lighthouse>
- 1MB: <http://127.0.0.1:4175/work/1mb>

Lighthouse now shows frontend ownership, internal tools, wallet and contract integration, role progression, and related products.
1MB now shows independent product and extension development, product context, and delivered components.
Both pages use the study layout from BackupData.
Both provide contents links, native contribution disclosures, readable scope maps, and next-study links.
The diagrams show confirmed work areas. They do not claim transaction order, architecture, or a recorded user workflow.

## Permission and evidence

Arpit authorized publication of all Lighthouse and 1MB details on 27 October 2026.
Source U6 records this permission.
Permission does not supply missing facts or authorize invented results.
The draft letters remain the factual sources for these pages.

The Lighthouse study now includes wallet names from the supplied records.
The text attributes those names to the records.
Individual integration dates remain unconfirmed.
The 1MB study separates product context from Arpit's contribution.
It does not claim particular extension permissions, collected fields, adoption, or reward outcomes.

## Remaining evidence

| Area | Needed material |
| --- | --- |
| Lighthouse | Real interface images; integration dates; two technical choices and their consequences |
| Wallet workflow | Confirmed states and error paths; a recording or screenshots |
| 1MB | Product dates; technical choices; product and extension screens |
| Extension behavior | Permissions, collected fields, user controls, storage, and transfer boundaries |
| Outcomes | Supported measurements or a qualitative account |

The implementation remains useful without those details.
Full case-study acceptance remains open until the evidence arrives.
The pages contain no simulated wallet connection or fake extension recording.

## Checks

`npm run check` covers TypeScript, 27 tests, and content validation.
`npm run products:check` covers both studies at five widths, keyboard controls, section focus, and no-JavaScript navigation.
`npm run site:check` covers shared routes and navigation.
All 27 tests, six product-study check groups, and seven shared route check groups pass.
The no-JavaScript check uses reduced motion to avoid smooth-scroll timing in browser automation.
Normal test paths produce no application JavaScript errors.
The browser scripts require Playwright and Chrome, with the preview server active.

Reports and screenshots live in `design/phase-7/review/`.
Physical phone, Safari, and screen-reader checks remain open.

## Files

| File | Purpose |
| --- | --- |
| `src/site/studies/product-studies.ts` | Shared study structure and the two page bodies |
| `src/site/studies/study.css` | Scope maps and responsive study layouts |
| `scripts/build-site.mjs` | Direct route integration |
| `scripts/check-product-studies.mjs` | Browser checks |

## Budget and next phase

This phase spent zero Higgsfield credits.
The portfolio allocation remains 100 credits.
Phase 8 builds the Turby study and gallery when original assets are available.
The live domain remains unchanged.
