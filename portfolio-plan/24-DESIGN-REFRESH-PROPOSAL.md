# Portfolio design refresh

Date: 29 October 2026.
Status: Arpit selected Option A. The first implementation slice now has its own review record.

## Recommended direction

Use Option A, Connected practice, as the base.
Use Option B for the project panels.
Use one short scene transition from Option C.
Keep the current charcoal, paper, rose accent, Space Grotesk, and four-layer model.
Keep the ten routes and the employer-first content order.

The main change is composition, not more controls.
Each interactive element must explain work, reveal useful detail, or help navigation.

## Audit of the current site

The local screenshot confirms the remaining layer buttons beneath the hero model.
Clean mode removes three options but retains five layer buttons and explanatory status text.
The film still exposes Play, Use scroll, Skip film, and playback state text.
Those controls make the scene resemble a component demonstration.
They do not explain Arpit's work clearly enough.

The Home project features use repeated two-column text rows without project visuals.
The Work page repeats that pattern, except for the original Turby image.
The AI summary is a list rather than a visual explanation.
The same four practice labels appear below the model and again in a separate strip.
Many sections share large padding, equal columns, thin borders, and similar entry motion.
The effect is repetition with little change in visual focus.

Public pages also contain editorial statements about missing evidence and draft sources.
These notes belong in the content register, except where a visitor needs a qualification.
A final interface should contain confirmed facts and selected examples.
It should omit unsupported sections instead of showing empty slots or review instructions.
A necessary label, such as “Illustrative example,” must remain beside a demonstration.
Approximate dates and planned work must also retain accurate labels.

## Research and application

These are design judgments from source review, not measured user research.

| Source | Relevant evidence | Proposed application |
| --- | --- | --- |
| [Scrolltide](https://www.scrolltide.co/) | Separate libraries for scroll templates, sections, shaders, and small interactive components | Treat each section as a designed scene with one main action |
| [Smooothy](https://smooothy.federic.ooo/) | CSS-led slider layout, snapping, drag response, and conditional activation | Borrow direct gallery feedback for Turby; retain visible controls and native page scroll |
| [SmoothUI](https://smoothui.dev/) | Motion primitives and reduced-motion support | Use polished feedback for real buttons, links, and disclosures |
| [Dennis Snellenberg](https://dennissnellenberg.com/) | Clear personal introduction and named work entries with contribution labels | Keep projects prominent and pair each title with a clear responsibility |
| [Rauno Freiberg](https://rauno.me/) | Compact introduction with direct access to craft, projects, and notes | Make small interactions useful and precise |
| [Bruno Simon](https://bruno-simon.com/) | A navigable 3D portfolio with input instructions and recovery controls | Use one memorable object; avoid turning employer navigation into a game |
| [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | Scroll-linked timelines, pinning, refresh, and responsive control | Use one bounded desktop story; preserve normal flow elsewhere |

The Dennis screenshot stopped at its greeting sequence during capture.
Its content informed the project structure; that capture does not verify later animation behavior.
The boards do not copy reference assets or claim to reproduce their motion.
No new library is necessary for the recommended refresh.

## Three options

| Option | Visual idea | Main interactions | Main tradeoff | Fit |
| --- | --- | --- | --- | --- |
| A — Connected practice | Existing model, integrated labels, distinct project scenes | Scroll chapters, subtle pointer tilt, animated contribution maps | Requires careful coordination between scene and content | Best base; closest to current direction |
| B — Project studio | Larger project visuals within an offset editorial grid | Project preview on hover or focus; Turby gallery; concise detail reveals | Real product captures will improve it further | Best treatment for Work and Home projects |
| C — System story | Wide model scene followed by a short visual narrative | One pinned transition, connected scope stages, one scroll film | Greater motion cost and longer reading path | Use one transition, not the whole site |

The boards show composition and density, not final animation or a new content claim.
Open `design/refresh-research/index.html` through the local server at port 4182.
Use the three buttons at the top to compare directions.
Those buttons belong to the review tool, not the proposed portfolio.

## Proposed Home sequence

### 1. Hero and model

Keep the existing headline or test the board's alternative headline during copy review.
Keep the model beside the introduction.
Increase the model's visual presence without covering text.
Use a soft rose edge light and one faint structural guide.
Avoid particles, a cursor replacement, and a full-screen background effect.

Remove Interface, Systems, Integration, Intelligence, and Assemble as separate button boxes.
Show one short HTML caption anchored beside the active model layer.
Scroll changes the caption and the corresponding layer position together.
The caption identifies real scope, such as “Systems / Infrastructure, backend, SDKs, CLI.”
A short pointer tilt gives immediate feedback on desktop.
A click or keyboard action on the object may inspect a layer.
Resume the scroll story when the visitor scrolls.

Retain a concise accessible “Explore the model” control when keyboard interaction needs an entry point.
Put optional quality and static-image controls inside one small “Display settings” disclosure.
Show failure guidance only after a real failure.
Use an intentional still composition for reduced motion.
Remove the always-visible reduced-motion status paragraph.
Keep the existing native Skip to content path.

Desktop story target: 70–90vh of added scroll, rather than the current 120vh.
Do not force a pin on short screens or mobile.
The hero and practice labels become one sequence instead of two repeated sections.

### 2. Selected work

Show three distinct project panels with approximately 55% of each panel devoted to a visual.
Keep one scope sentence and one clear study link beside each visual.

| Project | Available visual treatment | Interaction |
| --- | --- | --- |
| BackupData | Contribution diagram based on confirmed source flows and language SDKs | Selecting a source highlights its route into the shared tooling |
| Lighthouse | Integration map with named wallet systems from the supplied records | Hover or focus highlights an integration and its contribution label |
| 1MB | Product and extension relationship diagram | A native selector explains the two delivery surfaces |
| Turby | Original collection images | Finite gallery with drag, arrows, and keyboard access |

Diagrams must carry a “Contribution map” or “Concept” caption where appropriate.
They do not claim to be the actual architecture or original product interface.
Do not invent a dashboard, product recording, metric, terminal output, or successful backup result.
Actual screenshots can replace diagram panels when source files arrive.

Use a gentle image mask reveal and small pointer response on wide screens.
Use a 160–240ms active-state response for useful controls.
Keep the study link visible at all times.
Do not make project text depend on hover.

### 3. Film transition

Retain the exact model-rendered film.
Use it as one visual bridge, outside the active 3D scene.
Remove “Use scroll” and diagnostic mode text from the main visual.
Desktop scroll selects frames automatically when motion permits.
Show one compact Pause or Play control when useful.
Put alternate playback behavior inside Display settings.
Mobile uses a poster and explicit Play action.
Keep an accessible skip path and error recovery.
One rich visual owns the active frame budget at a time.

### 4. Applied AI

Replace the plain area list with one clear context diagram and a compact set of area links.
A selected area reveals one sentence and a link to the corresponding AI Systems section.
Use a short SVG path animation to explain a connection.
Keep it a concept diagram until Arpit confirms the architecture.
Do not add decorative streams, invented requests, or fake live activity.

### 5. Career and design range

Replace four equal career blocks with a continuous vertical rail.
Highlight the current section as the visitor reads.
Keep dates and role details visible in normal HTML.
Use Turby artwork as the visual break before contact.
Show event facts as compact entries until original photos arrive.
Do not reserve an empty portrait or event gallery.

### 6. Contact

Reduce the final empty space.
Keep a large email link, professional links, and Copy email feedback.
Use a restrained border or arrow response on hover and focus.
Avoid a duplicate full contact invitation on the Contact route.

## Changes across other pages

| Page | Proposed change |
| --- | --- |
| Work | Visual project index, original Turby art, and more compact earlier-project entries |
| Studies | Strong opening visual, short contribution summary, and interactive diagrams only where useful |
| AI Systems | Compact area navigation; examples behind clear visitor actions; no exposed debug state |
| Journey | Active year rail with closer spacing between related roles and events |
| About | Project examples beside responsibilities; no blank photo space |
| Contact | Keep the current direct flow; improve spacing and response states |

## Spacing and motion contract

Use 72–96px between major desktop sections and 40–56px on mobile as initial targets.
Use 24–40px between related items.
Keep paragraph width near 55–65 characters.
Reduce repeated introductory space before short sections.
Keep enough space for focus indicators and touch targets.

Use transforms, opacity, and SVG strokes for motion.
Reserve 3D and scroll video for the main narrative.
Use different motion for different purposes: reveal, inspect, connect, and navigate.
Do not animate every heading in the same way.
No letter scramble on essential copy, constant marquee, forced horizontal page scroll, or magnetic cursor.

Mobile retains direct project links and no hover-only behavior.
Reduced motion retains complete content, static diagrams, still images, and explicit playback.
No JavaScript retains reading order, links, and native disclosures.

## Work plan

| Step | Deliverable | Review condition |
| --- | --- | --- |
| 1 | Hero and selected-work vertical slice | First two sections feel complete without visible test controls |
| 2 | Shared visitor and review modes | Product controls serve visitors; editorial notes stay in review records |
| 3 | Project visuals and interactions | Each interaction explains a confirmed responsibility |
| 4 | AI, career, and contact composition | Repetition and unused space decrease without content loss |
| 5 | Motion, mobile, and failure review | Existing essential controls still work across input methods |

First implement the vertical slice, then compare it with the current page.
Do not apply a complete redesign before that visual review.
Keep existing routes, content records, and the current stack.
Replace the server-only clean-preview patch with a consistent visitor presentation during the refresh.
A later deployment must use that same visitor presentation.

## Acceptance checks

- No layer selector boxes, scroll-mode labels, or review instructions appear in the default visitor view.
- Every visible control has a clear visitor purpose.
- Home shows a useful project visual before its second major work feature.
- Project links remain visible without hover.
- Three-dimensional interaction does not block access to work or contact.
- No empty media slot appears when real assets are unavailable.
- A visitor can explain Arpit's scope within ten seconds.
- The visual sequence supports the career story without extra work to navigate it.
- Reduced motion and mobile retain a complete experience.

The existing automated checks will need updates where the intentional visitor interface changes.
A passing old control test is not proof of design quality.

## Budget

This research and the comparison boards spend zero Higgsfield credits.
The existing budget remains 34 credits reserved and 66 credits available.
The recommended design can use the existing model, film, original artwork, SVG, and CSS.
No paid asset generation is necessary for the first vertical slice.
