# Phase 3: scene and film review

Date: 25 October 2026.
Arpit authorized this phase with the request for the next phase.
The prototype provides an interactive model and a film that follows scroll position.
The live website remains unchanged.

## Preview

Run `npm run motion:preview`.
Open <http://127.0.0.1:4174/>.

Select a layer with its button or the model.
Use **Assemble** to connect all four layers.
Use **Resume scroll** to return control to the page.
Use **Skip to work** to leave the scene and focus the work heading.
Scroll through the film in both directions.
Use **Play film** for normal playback.

## Implemented behavior

| Area | Result |
| --- | --- |
| Model | Four metal layers share geometry. A rose inset connects the visual system. |
| Scene control | Buttons, model selection, and bounded pointer motion control the model. |
| Scroll | One desktop section pins for at most 120vh. GSAP controls assembly. |
| Control priority | Manual selection takes control until the visitor selects Resume scroll. |
| Film | A six-second H.264 film uses the same Three.js geometry. |
| Film control | The seek controller retains only the latest requested position. |
| Slow media | A stalled seek or three slow seeks selects normal playback. |
| Mobile | A still image appears first. The visitor can enable the lower-resolution model. |
| Reduced motion | The page removes the canvas and pin. Layer descriptions remain available. |
| Failure | WebGL loss and failed video requests retain still images. |
| Resource use | The scene stops after motion settles and pauses outside its active section. |
| Media priority | The scene pauses while the film holds visual control. |

The film uses local rendering. This phase did not submit a paid generation job.
The model and film illustrate professional scope. They do not represent historical project evidence.
The surface materials remain open to final visual adjustment in Phase 13.

## Checks

`npm run check` passes TypeScript checks, 27 tests, and content validation.
The browser script checks 13 groups with desktop and mobile Chrome profiles.

- Keyboard selection changes the model pose.
- Manual selection retains control during scroll.
- Forward and reverse scroll select the correct film positions.
- Normal playback removes the film scroll control.
- Motion off removes the canvas and pin.
- Three mount cycles retain one canvas and one scene trigger.
- Context loss restores the still image.
- Mobile starts without a canvas or a video request.
- Reduced motion avoids the 3D module and video request.
- Failed WebGL and video requests retain useful content.
- The page retains text, links, images, and native video without JavaScript.
- Widths of 360, 768, and 1024 pixels show no horizontal overflow.
- Normal test paths produce no application JavaScript errors.

See `design/phase-3/review/browser-checks.json` for results.
The same folder contains desktop and mobile screenshots.

## Measured limits

| Item | Prototype measurement |
| --- | --- |
| Model | Five draw calls; 5,760 triangles; two geometries |
| Initial JavaScript | Approximately 121KB with gzip |
| Deferred 3D JavaScript | Approximately 251KB with gzip |
| Film | 838,666 bytes; 1280 × 720; 30 frames per second; six seconds |
| Scene image | 22,184 bytes |
| Film image | 22,476 bytes |

Gzip values estimate compressed file size. The local server sends uncompressed files.
Headless Chrome frame samples were approximately 33 milliseconds.
These results do not establish 60fps performance on physical devices.
The local fonts still need production subsets to meet the font budget.

## Open checks

Physical iPhone and Android checks remain open.
Safari, screen-reader output, hidden-tab behavior, and slow network checks also remain open.
The unit tests cover stalled and slow seeks with controlled time.
The browser tests cover failed requests, but do not reproduce a slow mobile connection.
Production performance measurements remain part of the release review.

## Files and commands

`src/motion/` contains the React components, geometry, runtime settings, and seek controller.
`scripts/build-motion-prototype.mjs` creates the isolated preview from the Phase 2 Home frame.
`design/phase-3/prototype.css` contains the prototype styles.
`design/phase-3/media/` contains the film and still images.

Run `npm run motion:build` after source changes.
Run `npm run motion:check` with the preview server active.
The browser scripts require Playwright and Chrome.
Set `PLAYWRIGHT_MODULE` to a local Playwright module path when necessary.
Run `npm run motion:render` to recreate the film and images.
The film script also requires FFmpeg.

The local `window.portfolioPrototype` interface supports test measurements and cleanup checks.
Remove this test interface from the production build.

## Next phase

Phase 4 builds shared navigation and direct routes.
The current linked study pages remain Phase 2 frames.
Phase 5 then builds the complete BackupData study.
Final fact review and public asset approval remain open.
