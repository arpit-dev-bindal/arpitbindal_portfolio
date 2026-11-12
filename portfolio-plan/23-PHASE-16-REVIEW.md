# Phase 16: Private preview review

Date: 27 October 2026.
Status: Local review passes. Public release remains pending.

## Verified result

The full build, TypeScript checks, content validation, and all 31 tests pass.
All 51 existing browser check groups pass across eleven suites.
The dependency audit reports zero known vulnerabilities at the review date.
The accessibility scan reports zero violations across all ten routes.
The scan uses axe WCAG 2 A, AA, and WCAG 2.1 AA rules.
Automated results do not establish complete accessibility compliance.

The new release checks cover 200% CSS zoom at a 640-pixel viewport.
All ten routes retain layout without horizontal overflow in that test.
This test supplements narrow reflow checks; it does not replace browser text-only zoom review.
WebGL failure retains the poster and recovery control.
A blocked film request retains the poster and a visible failure message.

Axe requests manual review of video captions on Home.
The selected film has no audio or speech and shows decorative model motion.
The surrounding heading and layer descriptions provide context.
No speech captions are necessary for this silent visual study.
Screen-reader review remains open.

## Mobile lab samples

Chrome uses a 390×844 viewport, a cold cache, 4× CPU slowdown, and 150ms network latency.
The download limit is 200,000 bytes per second, approximately 1.6 Mbps.
Each route has one sample, with a four-second observation after load.

| Route | Observed LCP | Observed CLS | Resource transfer bytes |
| --- | --- | --- | --- |
| Home | 880 ms | 0.0152 | 698,913 |
| BackupData | 788 ms | 0 | 431,331 |

These local measurements are diagnostic samples, not field results or release guarantees.
Resource totals exclude the main document and later user-triggered media.
This run does not measure INP or physical GPU performance.

## Release issue list

| ID | Requirement | State | Next action |
| --- | --- | --- | --- |
| R1 | Final career and study facts | Open | Confirm public copy and resolve material source gaps |
| R2 | Resume download | Open | Supply or approve current resume content and PDF |
| R3 | Product screenshots and recordings | Open | Supply real product media or explicitly reduce this scope |
| R4 | Portrait and event evidence | Open | Supply real images and event records or approve omission |
| R5 | Physical iPhone Safari and Android Chrome | Open | Check navigation, scroll, video, and 3D controls |
| R6 | Desktop Safari and screen reader | Open | Complete manual controls and reading-order review |
| R7 | Usability review | Open | Ask independent readers to complete the planned employer tasks |
| R8 | Hosting and release | Open | Choose the deployment target and approve publication |
| R9 | Search configuration | Intentionally blocked | Review noindex, robots, canonical URLs, and share URLs during approved release |
| R10 | Higgsfield final charges | Unconfirmed | Retain the 34-credit reservation until charge records exist |

No confirmed functional defect remains from this local review.
The release issue list distinguishes missing evidence and untested environments from code failures.
The preview still contains explicit evidence limits and a private-review notice.
These must receive an editorial decision before publication.

## Release procedure for Phase 17

1. Resolve or explicitly accept the listed content and device requirements.
2. Confirm the hosting target and domain access.
3. Save the existing live site and its deployment configuration.
4. Prepare a private staging deployment with real HTTP 404 behavior.
5. Check the staging routes, media, security headers, and cache rules.
6. Prepare the exact public build and rollback reference.
7. Obtain publication approval for that build.
8. Deploy and verify all primary routes and old links.
9. Restore the previous deployment if primary navigation or contact fails.

The local preview server is a review tool, not the production hosting configuration.
No domain, DNS, publication, or external message changed during this phase.

## Reproduction

Run `npm run check` and `npm run build`.
Run the eleven existing browser check commands from package.json.
Run `npm run release:check` with Chrome, Playwright, axe-core, and the active local server.
Set `PLAYWRIGHT_MODULE` and `AXE_PATH` when those packages live outside the project.
The default axe path points to the temporary review installation.
Raw reports reside in `design/phase-16/review/`.

## Budget

This phase spent zero Higgsfield credits.
The ledger retains 34 reserved credits and 66 available credits.
