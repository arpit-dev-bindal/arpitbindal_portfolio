# Phase 5: BackupData study

Updated: 26 October 2026.
Status: the implemented study passes local checks; the complete case study awaits evidence.

## Preview

Open <http://127.0.0.1:4175/work/backupdata>.
Run `npm run preview` if the local server is inactive.

The page now uses a dedicated study component instead of the Phase 2 frame.
The introduction identifies Lighthouse, the contribution scope, and the unconfirmed project dates.
A light section contains the overview, contribution explorer, scope diagram, delivery list, and AI extension.
The contents rail moves keyboard focus to each section.
The related-work section links to Lighthouse and Contact.

The contribution explorer uses native disclosures.
Keyboard, touch, and no-JavaScript users can open the same content.
The diagram groups sources, the service, and developer tools.
It does not claim a runtime architecture or a confirmed data flow.
The page does not load the Home scene or film.

## Evidence used

The supplied draft letters support infrastructure, backend, Go SDK, Node.js SDK, and CLI contributions.
Arpit's earlier message supports the extension for memory and context between AI agents.
The page keeps those work areas in the Lighthouse context.
It does not combine them with later freelance and personal projects.

I checked the [current BackupData site](https://www.backupdata.io/) on 25 October 2026.
That site describes a broader product feature set.
It does not establish which features belong to Arpit's historical work.
The study therefore links to the current site without importing its feature or outcome claims.

## Open evidence

| Item | Needed material | Effect on the study |
| --- | --- | --- |
| Project dates | Confirmed start and end, or approximate period | Complete the header metadata |
| Technical choice 1 | Alternatives considered and measured results | Complete the source-specific backup account |
| Technical choice 2 | Problem, constraints, alternatives, choice, result | Add the second decision record |
| Product media | A public console or CLI image, or a redacted recording | Add the media stage and transcript |
| System flow | Confirmed components and the actual backup sequence | Replace the scope map with a system walkthrough |
| Results | Supported measurements, or qualitative results | Add outcomes without invented metrics |
| Reflection | A lesson and a future improvement | Add the personal technical account |

Arpit supplied an account of source-specific backup flows on 26 October 2026.
The study now explains the problem, custom flows, and Node.js, Go, and Python SDKs.
Alternatives considered, measured results, and a second decision remain open.
The page omits empty decision panels and artificial product recordings.
The current content does not meet all Phase 5 evidence requirements.
Keep the full study review open until these details arrive.

## Checks

`npm run check` passes TypeScript, 27 tests, and content validation.
`npm run study:check` passes five browser check groups.
The study checks cover four disclosures, section focus, five widths, reduced motion, direct fragments, and no-JavaScript use.
Normal test paths produce no application JavaScript errors.
The shared route checks also pass after the study replacement.

The browser scripts require Chrome and Playwright.
Set `PLAYWRIGHT_MODULE` if Playwright uses an external path.
The local preview server must run during browser checks.

See `design/phase-5/review/` for screenshots and the browser report.
Physical phone, Safari, and screen-reader checks remain open.

## Files

| File | Purpose |
| --- | --- |
| `src/site/studies/backupdata.ts` | Study sections and contribution content |
| `src/site/studies/study.css` | Responsive study presentation |
| `scripts/build-site.mjs` | Study route integration |
| `src/site/shell.ts` | Study stylesheet selection |
| `scripts/check-study.mjs` | Interaction and layout checks |

## Next work

Add confirmed decisions and real media when evidence arrives.
Phase 6 can build the Home composition around the current study route.
Final study approval remains separate from that implementation work.
The live domain remains unchanged.

## Technical account: 26 October 2026

Source U5 records Arpit's explanation of custom backup tooling.
Users needed backups across database and external storage technologies.
The implementation used source-specific flows and SDKs for Node.js, Go, and Python.
Named flow sources include SQL databases, PostgreSQL, AWS DynamoDB, and S3 data.
Arpit named Azure storage in the requirements context.
The exact Azure service and delivered connector scope remain unconfirmed.
The study does not claim a specific Azure connector or measured performance result.
