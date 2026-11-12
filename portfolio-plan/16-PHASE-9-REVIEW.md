# Phase 9: AI Systems

Date: 27 October 2026.

## Result

The AI Systems route now uses a dedicated page instead of the Phase 2 frame.
Open <http://127.0.0.1:4175/ai-systems>.

The page separates Lighthouse agent memory from later freelance and personal work.
November continuation retains its planned label.
Individual project dates and completion states remain unconfirmed.
The page covers automation, RAG, LoRA, voice systems, MCP services, and evidence criteria.

## Examples

| Area | Current example | Evidence status |
| --- | --- | --- |
| Agent memory | Concept map and BackupData link | Confirmed work area; architecture remains unconfirmed |
| Automation | Local amount rule with a human-review path | Illustrative rule; no external action |
| RAG | Fictional source passage, supported answer, and unresolved question | Static illustration; no retrieval or model call |
| LoRA | Matched-input comparison plan | Real outputs and scores remain unavailable |
| Voice | Fictional transcript with human handoff | Design illustration; no recording or live call |
| MCP | Local role/tool allowlist and denied requests | Illustrative policy; no authentication or server connection |

The examples do not represent client work or production measurements.
The page labels each illustration at its point of use.
The evaluation section describes future evidence criteria, not completed evaluations.
The page does not collect data or call an external AI service.

## Controls and access

The automation example checks the 50-unit boundary and rejects invalid numbers.
The MCP example allows only the support role with order.read.
Every other role/tool pair receives a denial in the local example.
Results use a live output element.
Visible labels identify every input and select control.
Native disclosures retain the example outcomes and contract without JavaScript.
Section links move keyboard focus to the selected section.

## Checks

`npm run check` passes TypeScript, 29 tests, and content validation.
Two new tests cover numeric boundaries and default-deny behavior.
`npm run ai:check` covers controls, requests, section focus, five widths, and no-JavaScript content.
`npm run site:check` covers the shared routes and navigation.
All four AI check groups and seven shared route check groups pass.
Normal test paths produce no application JavaScript errors.
The controls clear earlier results when inputs change.
The browser scripts require Playwright and Chrome, with the preview server active.
Reports and screenshots live in `design/phase-9/review/`.
Physical phone, Safari, and screen-reader checks remain open.

## Remaining evidence

- Individual names, dates, client contexts, and completion states.
- Automation triggers, actual business rules, and failure behavior.
- RAG source data, retrieval method, and evaluation results.
- LoRA base model, data rights, matched outputs, and regressions.
- Voice recording, transcript, interruption behavior, and handoff result.
- MCP contracts, authentication, permissions, and actual denied-request evidence.

The implementation is ready for review.
Full historical case studies still require those records.

## Files

| File | Purpose |
| --- | --- |
| `src/site/ai-page.ts` | Content, examples, and status labels |
| `src/site/ai.css` | Responsive layout and labeled controls |
| `src/site/ai-examples.ts` | Pure local example rules |
| `src/site/ai-controls.ts` | Form actions and live results |
| `tests/ai-examples.test.mjs` | Rule boundary and default-deny checks |
| `scripts/check-ai.mjs` | Browser checks |

## Budget and next phase

This phase spent zero Higgsfield credits.
The portfolio allocation remains 100 credits.
Phase 10 completes the Work archive.
The live domain remains unchanged.
