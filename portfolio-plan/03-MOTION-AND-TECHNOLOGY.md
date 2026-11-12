# Motion and technology

## Technology choice

Use Next.js, React, TypeScript, CSS variables, GSAP, and Three.js through React Three Fiber.
The first release uses static content and browser-side visual components.
Confirm compatible package versions when development starts.
The planning task does not lock versions from changing documentation.

| Tool | Responsibility | Limit |
| --- | --- | --- |
| Next.js | Routes, rendered content, metadata, images | Keep main content outside browser-only components |
| React | Components and discrete interface state | Do not store animation frames in React state |
| TypeScript | Content types and component contracts | Validate required public fields |
| CSS variables | Color, space, typography, section themes | Use one token system |
| GSAP | Text entrances, chapter timelines, diagram motion | One owner for each animated property |
| ScrollTrigger | Scroll progress and the short pinned sequence | Native page scroll remains active |
| `@gsap/react` | Scoped setup and cleanup | Remove delayed callbacks and listeners correctly |
| Three.js / React Three Fiber | Main layered object and spatial transformations | One active WebGL canvas per page |
| Drei | Selected helpers where useful | Import only required helpers |
| Smooothy | Optional event or Turby gallery | Keep it outside the primary career and project paths |
| SmoothUI | Component references | Select patterns; do not import an unrelated visual system |

Next.js supports a boundary between server content and browser interactions.
Use that boundary to keep the career facts available before visual code loads.
Source: [Next.js component guidance](https://nextjs.org/docs/app/getting-started/server-and-client-components).

### Library decisions

GSAP owns the main motion system.
CSS handles simple button, link, and focus changes.
The plan does not need a second animation library for these controls.
Smooothy remains optional because its slider does not control page scroll.
The initial build uses native scroll and CSS scroll snap for simple galleries.
Add Smooothy only if the gallery prototype shows a clear benefit.
Source: [Smooothy repository](https://github.com/vallafederico/smooothy).

Do not combine Lenis, ScrollSmoother, and another page scroll controller.
The recommended first release needs none of them.
ScrollTrigger can coordinate motion with native scroll.
Source: [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).

## Home motion sequence

All values below are design targets.
The prototype will test them on real devices.
Content remains visible if motion code fails.

| ID | Trigger | Animated content | Timing or range | Purpose | Mobile / reduced motion |
| --- | --- | --- | --- | --- | --- |
| H1 | First paint and enhancement ready | Headline moves up 16px; opacity reaches one | 600ms; line delay 70ms | Establish text order | Show text immediately in reduced mode |
| H2 | Scene ready | Object moves from poster pose to final pose | 800ms; no delayed navigation | Introduce depth | Poster by default on narrow screens |
| H3 | Pointer moves within object area | Outer group tilts at most 4 degrees | 350ms catch-up | Show material and depth | Disable for touch and reduced motion |
| H4 | Story reaches viewport top | Four layers separate and reconnect | Extra scroll distance: 120vh maximum; `scrub: 0.6` | Explain scope | Four static rows; no pin |
| H5 | Project image enters lower viewport | Image rises 20px; opacity reaches one | 650ms; once | Direct attention to work | Static or 200ms fade |
| H6 | Project link receives hover or focus | Arrow moves 4px | 180ms | Confirm interaction | Same focus treatment; no tilt |
| H7 | AI section enters view | Diagram steps highlight in order | 900ms once | Show context transfer | All steps visible |
| H8 | Career summary enters view | Date and role rows appear | 450ms; 80ms spacing | Establish sequence | Static entries |
| H9 | Contact enters view | Object crop shifts at most 12px | Short scroll range, optional | Close the visual story | Static image |

### H4 storyboard

Phase 3 starts with separate layers to match the approved frame direction.
The camera stays fixed. The object provides the small rotation.

The main structure has four layers and one central connection.
The layers represent areas of responsibility, not specific infrastructure components.

| Progress | Visual state | Text | Camera |
| --- | --- | --- | --- |
| 0–20% | Four separate layers | Interface | Stable three-quarter view |
| 20–45% | Separation reaches its maximum | Systems | Small object rotation |
| 45–70% | Layers move together | Integration | Object rotation returns toward center |
| 70–90% | Final layer aligns | Intelligence | Return toward the initial view |
| 90–100% | Complete structure settles | Complete product responsibility | Hold; then release the pin |

Keep the text in the document, outside the canvas.
The labels do not depend on perspective or color alone.
The Skip to selected work link moves focus to the next heading.
It also completes the visual timeline without an animated scroll.
The sequence never locks the wheel, keyboard, or touch gesture.
Only the visual wrapper pins; its child objects animate.
Reserve pin spacing to prevent overlap.

## Motion on other pages

| Component | Motion | Timing | Interruption rule |
| --- | --- | --- | --- |
| Mobile menu | Panel fades; links move up 8px | 220ms | Escape closes immediately |
| Study image | Small entrance only | 500ms | No replay on every scroll reversal |
| Study diagram | Selected step gains emphasis | 250ms | New selection replaces prior motion |
| Archive expansion | Content appears without long height animation | 180ms | Repeated clicks preserve the final state |
| Event gallery | Slide moves to selected item | 300–450ms | Drag or button input takes control |
| Turby traits | Selected asset fades into the composite | 180ms | No infinite automatic cycle |
| Voice transcript | Active line follows actual playback time | Playback-driven | Pause freezes the active line |
| Copy email | Text changes to Copied | Immediate; reset after 2 seconds | Email remains selectable |
| Route entry | Optional short content fade | 150ms | Never hold navigation for an exit animation |

## Video controlled by scroll

The user explicitly requested video scroll animation after the visual preview.
Use the material film once, between Selected work and AI Systems.
Its frame stays in normal page flow without a second pinned chapter.
Forward scroll advances the film; backward scroll moves it toward the first frame.
When scroll stops, the displayed frame holds.
Use a stable composition that remains useful at any frame.

ScrollTrigger maps the section range to the available video duration.
Start when the frame reaches 80 percent of the viewport height.
End when its bottom reaches 20 percent of the viewport height.
Wait for valid metadata and available media before enabling time control.
Keep only the latest requested time while a seek remains active.
Avoid a queue of outdated seek requests.
The browser's `currentTime` property selects the time; `seeked` reports seek completion.
Sources: [MDN currentTime](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime), [MDN seeked](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeked_event).

Prototype a short-keyframe-interval encode for smooth forward and reverse movement.
Measure its file size and seek response before final export.
Do not assume that a small video file will seek smoothly.
Use normal playback for product demonstrations with speech or precise explanatory steps.

Provide a Skip film link and an option for normal playback.
Normal playback disables scroll time control until the visitor selects scroll mode again.
Use a poster and manual playback for reduced motion or devices with poor seek response.
Test fast scroll, reversal, direct section entry, and slow media transfer.
Pause the 3D scene before this film becomes active.

## Direct 3D interaction

The main model supports a small pointer response and explicit layer selection.
Selecting a layer separates it slightly and shows one short description.
Provide equivalent named buttons for touch and keyboard input.
An Assemble control returns the model to its complete state.
Use a 450–650ms transition without continuous idle rotation.
Keep these controls within the opening model area.

Scroll and direct interaction must not control the same transform at the same time.
Pause pointer motion while a layer transition runs.
When the story chapter starts, reset the inspection state and let its timeline control the model.
Reduced mode changes the selected description immediately and keeps the model still.

## GSAP implementation contract

Register plugins once in the browser animation module.
Use `useGSAP` with a component scope.
Use refs for the Three.js object state.
Create one timeline for each independent sequence.
Do not add child ScrollTriggers inside a timeline with its own ScrollTrigger.
Create triggers in document order.
Refresh measurements after fonts or media change the layout.
Do not refresh on every frame.

Use `gsap.matchMedia` for desktop, touch, and reduced-motion conditions.
Revert old timelines when those conditions change.
Use `contextSafe` for event callbacks that create GSAP work.
Remove event listeners during cleanup.
Sources: [GSAP with React](https://gsap.com/resources/React/), [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/).

Use transforms and opacity for document motion.
Keep temporary `will-change` hints limited to active elements.
Do not animate text through heavy blur.
Use `power2.out` for entrances and `none` for direct scroll progress.
Use `quickTo` for the optional pointer response.
Do not create a new tween on every pointer event.

## Three.js scene specification

### Main object

Build a custom structure from four shallow rectangular frames.
Use rounded edges, visible joints, and one restrained rose insert.
Each layer can move separately without changing its geometry.
The object should suggest precise assembly and broad responsibility.
It should not resemble a generic planet, brain, or token.

| Property | Initial target |
| --- | --- |
| Camera | Perspective; 35–40 degree field of view |
| Framing | Object occupies 45–55% of the desktop hero width |
| Material | Brushed metal; roughness about 0.35–0.55 |
| Accent | One rose inset or edge |
| Light | Soft key, weak fill, restrained rim |
| Background | Near-black surface with slight tonal depth |
| Shadow | Baked or simple contact shadow |
| Reflections | Small environment map; no live reflection probes |
| Movement | Translation, rotation, and small scale changes |
| Interaction | Small pointer response, layer selection, and Assemble control |

These material values guide the art prototype.
They do not describe final measured output.
Avoid transparent glass layers that require expensive refraction passes.
Avoid full-screen particles and continuous idle rotation.

### Scene ownership

GSAP updates a small object with timeline values.
The scene reads those values through refs.
React handles page state and user controls.
It does not rerender the scene for every scroll frame.

React Three Fiber uses demand rendering where the scene can rest.
GSAP updates call `invalidate` when they change the scene.
The implementation schedules frames while a damped motion still changes values.
It stops after the scene settles.
Source: [React Three Fiber performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance).

### Resource lifecycle

Load the visual code after essential content.
Start asset transfer only when the scene is eligible and near the viewport.
Reuse shared geometry and materials.
Pause motion when the page becomes hidden.
Stop scene updates outside the active section.
Dispose owned textures, materials, and geometry when the scene no longer needs them.
Handle WebGL context loss with the poster fallback.
Source: [Three.js cleanup](https://threejs.org/manual/pages/cleanup.html).

### Quality tiers

| Tier | Use | Scene target | Media behavior |
| --- | --- | --- | --- |
| Full | Capable desktop | Up to 80 draw calls; 100k visible triangles; DPR cap 1.5 | One active decorative video at most |
| Light | Tablet or slower device | Up to 40 draw calls; 40k triangles; DPR cap 1.0 | Lower resolution or poster |
| Static | Reduced motion, data saver, WebGL failure, narrow default | Poster and readable text | User starts any video |

These are internal budgets, not library limits.
Measure draw calls after all passes, including shadows.
Do not infer a device's capability only from screen width.
Use runtime frame measurements to reduce quality when necessary.
Treat data-saving signals as optional because browser support varies.

If the full scene repeatedly misses its frame budget, switch to the light tier.
If the light tier remains unstable, keep the poster.
The visitor can still use the complete site.

## Accessibility and media

The global Motion off control stops decorative motion and video.
Honor `prefers-reduced-motion` before animations start.
Reduced mode removes pinning, parallax, camera travel, and automatic playback.
It preserves the same content order.
Persist an explicit user choice when local storage works.
If storage fails, keep the control functional for the current visit.

Provide pause controls for automatic motion that continues beyond five seconds.
Source: [W3C pause, stop, hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).

Use muted inline playback for decorative clips.
Handle autoplay rejection by retaining the poster and play control.
Source: [MDN autoplay guidance](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay).

Use captions and transcripts for meaningful speech.
Keep navigation and facts in semantic HTML.
Mark purely decorative canvas content as hidden from assistive technology.
Give meaningful diagrams equivalent text.
Use visible keyboard focus and a skip link.
Do not rely on color alone for selected steps.
Test text at 200% zoom and narrow reflow.

## Performance budget

| Item | Proposed release budget |
| --- | --- |
| Initial compressed JavaScript | At most 200KB before deferred 3D code |
| Initial critical transfer | At most 700KB, including fonts and poster |
| Deferred 3D code and scene assets | At most 2.5MB combined target |
| Mobile poster | At most 140KB |
| Desktop poster | At most 220KB |
| Font transfer | At most 120KB combined; selected WOFF2 subsets |
| Decorative clip | 6–8 seconds; at most 2.5MB per desktop encode |
| Mobile decorative clip | At most 1.2MB; user starts playback |
| Active rich media | One video or one active 3D scene in the viewport |
| Desktop motion | Target 60fps on the reference laptop |
| Light mode motion | Target stable 30fps or switch to a still |

Core Web Vitals targets: LCP at most 2.5s, INP at most 200ms, and CLS at most 0.1.
Measure field results at the 75th percentile when enough traffic exists.
Lab tests cannot prove those field results before launch.
Source: [Web Vitals](https://web.dev/articles/vitals).

## Content model

| Record | Required fields |
| --- | --- |
| Project | Slug, title, employer or context, role, summary, source IDs, status |
| Project period | Start, end, precision, confirmation state |
| Contribution | Claim, supporting source, boundary of responsibility |
| Decision | Constraint, alternatives, choice, consequence, author confirmation |
| Outcome | Statement, metric if available, source, measurement period |
| Asset | Path, type, dimensions, alt text, caption, rights, source, poster |
| Career entry | Organization, title, dates, summary, related projects |
| Event | Name, year, place, actual role, evidence |
| AI example | Context, work state, system, demonstration, evaluation, limitations |

Store content in typed local data and MDX files.
Use an explicit draft flag for unconfirmed content.
The build must not publish draft claims or missing-date placeholders.
Do not add a CMS before the edit workflow requires one.

## Search and migration

Render project headings, roles, and summaries in the initial HTML.
Give each main page a unique title, description, canonical URL, and share image.
Add Person and CreativeWork structured data only for supported facts.
Do not add awards, reviews, or ratings without evidence.
Create a sitemap and robots file.
Keep preview deployments outside search results.

The current website uses hash routes.
Servers cannot redirect a URL fragment because browsers do not send it in the request.
Use a small browser migration map for known old fragments.

| Old fragment | New path |
| --- | --- |
| `#/home`, `#/splash` | `/` |
| `#/experience` | `/journey` |
| `#/projects` | `/work` |
| `#/education` | `/about#education` |
| `#/contact` | `/contact` |

Preserve normal new-page anchors.
Check old incoming links before replacing the live site.
The domain and deployment changes belong to the later launch phase.

## Planned file groups

```text
app/                  Routes and metadata
components/layout/    Header, footer, menu
components/content/   Studies, career entries, evidence
components/motion/    GSAP wrappers and motion control
components/scene/     Three.js scene and poster fallback
content/projects/     Project data and studies
content/career/       Career and event records
content/ai/           AI work and examples
lib/                  Validation and shared utilities
public/media/         Optimized public assets
```

These folders describe future implementation.
The planning task does not create application code.
