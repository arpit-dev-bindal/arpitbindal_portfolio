# Phase 12: Contact

Date: 27 October 2026.

## Result

The Contact page now provides email, LinkedIn, GitHub, and links to portfolio details.
The email address remains selectable text and a native mail link.
The Copy email button appears when JavaScript loads.
A status region announces success or manual-copy instructions after failure.
The control retains keyboard focus and prevents duplicate requests during a pending copy.
The Contact footer omits the repeated contact invitation.

## Checks

TypeScript, all 29 tests, and content checks pass.
The site build passes.
Four Contact browser check groups and seven shared navigation check groups pass.
The Contact tests cover keyboard copy, exact address, failure, and unavailable clipboard access.
The tests replace the browser clipboard with a controlled test object.
They do not change the user's clipboard or send email.
The tests verify the mail link destination, not an external email application.
Both professional links match the content records.
The page fits 320, 390, 768, 1024, and 1440 pixel widths.
Email, profile links, and portfolio links remain available without JavaScript.
The browser report contains no application JavaScript errors.
Desktop and mobile screenshots show readable text and clear controls.
Reports and screenshots reside in `design/phase-12/review/`.
Physical device, native clipboard permission, email application, Safari, and screen-reader checks remain open.

## Remaining input

No resume file exists in the supplied profile.
The page omits the download link until a confirmed PDF exists.
Resume publication and PDF access remain open parts of the original acceptance criteria.
The page makes no availability or response-time promise.
It uses no form backend and collects no visitor data.

## Files

| File | Purpose |
| --- | --- |
| `src/site/contact-page.ts` | Contact content and links |
| `src/site/contact-controls.ts` | Copy action and status |
| `src/site/contact.css` | Desktop and mobile layouts |
| `scripts/check-contact.mjs` | Contact browser checks |

## Budget and next phase

This phase spent zero Higgsfield credits.
Total spend remains zero of the 100-credit limit.
Phase 13 covers final media production.
The live domain remains unchanged.
