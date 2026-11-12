# Phase 14: Motion and media integration

Date: 27 October 2026.

## Approval and result

Arpit approved the Phase 13 media selection.
The site build now copies the selected model-rendered film and posters from the Phase 13 exports.
Generated candidates remain outside the site because they changed the geometry.
The original product media requirements remain open.

Shared GSAP reveals now cover Home, studies, Work, Journey, About, and Contact.
Each reveal moves a section by 20 pixels without hiding its text.
The shared controller excludes content already inside the viewport when it starts.
It refreshes after fonts, images, and disclosure changes.
It clears motion when the page becomes hidden or the visitor disables motion.
It restores the correct state after browser history navigation.

The film now stops scroll updates outside its visible area.
A desktop-to-mobile resize changes the film to native playback controls.
Off-screen and hidden-tab events pause playback.
The film does not restart automatically when the page returns.

## Reduced motion correction

Browser checks found an inline smooth-scroll style left by GSAP refresh.
The site now gives its reduced-motion and Motion off rules priority over that inline style.
Motion off removes reveal transforms, stops the scene, and pauses the film.
System reduced motion avoids scene creation and automatic film loading.
All content retains a static baseline without JavaScript.

## Checks

TypeScript, 29 tests, content validation, and the site build pass.
Five integration check groups pass.
Four Home check groups pass, including forward and reverse film scroll.
Seven shared route and navigation check groups pass.
The integration test compares site media bytes with the approved exports.
The hidden-tab check simulates the document visibility event.
It does not replace a physical device or browser background-tab test.
Physical phone, Safari, and screen-reader checks remain open.
The browser reports contain no application JavaScript errors.

## Files

| File | Purpose |
| --- | --- |
| `src/site/page-motion.ts` | Shared reveals and lifecycle controls |
| `src/motion/ScrollFilm.tsx` | Visibility and responsive playback controls |
| `scripts/build-site.mjs` | Approved media selection |
| `scripts/check-integrated-motion.mjs` | Motion and media integration checks |

## Budget and next phase

This phase spent zero Higgsfield credits.
The ledger still reserves 34 credits for the completed Phase 13 jobs.
The remaining allocation is 66 credits. Final per-job charges remain unconfirmed.
Phase 15 covers metadata and support for old links.
The live domain remains unchanged.
