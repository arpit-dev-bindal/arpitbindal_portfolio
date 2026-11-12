# Images and video

## Visual principle

Generated images establish atmosphere and material direction.
Real product images establish experience and contribution.
Each asset has one clear role.
The site never uses generated screenshots as proof of past work.

## Asset register

| ID | Asset | Location | Source | Target output | Priority |
| --- | --- | --- | --- | --- | --- |
| A01 | Layered metal structure concept | Home hero | Higgsfield image generation | 2560×1440 master; mobile composition | High |
| A02 | Final 3D structure | Home story | Custom geometry or modeled GLB | Optimized model plus textures | High |
| A03 | Hero fallback poster | Home | Render from the final scene | AVIF/WebP; desktop and mobile | High |
| A04 | Dark material background | Home atmosphere and contact | Higgsfield image generation | 2560×1440; no text | Medium |
| A05 | Short material film | Home between Selected work and AI Systems | Higgsfield image-to-video | 6–8 seconds; 16:9; silent; scroll control | High |
| A06 | BackupData media | Study and Work | Actual product | Three screenshots and one 20–35 second recording | High |
| A07 | Lighthouse media | Study and Work | Actual product | Three screenshots and one 15–25 second recording | High |
| A08 | 1MB media | Study and Work | Actual product and extension | Three screenshots and one 15–25 second recording | High |
| A09 | Turby artwork | Study and Home | Original collection files | Main character; traits; contact sheet | High |
| A10 | Agent memory diagram | AI Systems | Reviewed architecture | SVG plus text description | High |
| A11 | AI demonstrations | AI Systems | Arpit's real work or labeled examples | Five short clips or transcripts | High |
| A12 | Portrait | About and Home | Real photograph | 4:5 crop; 1600px master | High |
| A13 | Event photographs | Journey | Real event media | Up to six images with captions | Medium |
| A14 | SMDEVOPS archive images | Work | Actual project media | One image per project where available | Medium |
| A15 | Social share images | Main pages | Composed from approved site assets | 1200×630 | Medium |
| A16 | Resume | Journey and Contact | Current approved text | Accessible PDF | High |

The initial scope requires one custom 3D object and one generated film.
Recorded product clips provide the other video content.
This keeps generated media coherent and gives real work visual priority.

## Background image brief

The main background suggests a dark studio with controlled light.
It does not show a city, space station, or generic technology tunnel.
The object occupies the right side.
The left side remains simple enough for clear text.
Light sections use flat surfaces and real media.
They do not need generated backgrounds.

### A01: concept prompt

> Create a precise studio image of four shallow metal frames.
> Arrange the frames around one central connection.
> Use brushed dark metal and one restrained rose insert.
> Show clear joints and rounded edges.
> Place the object on the right side of the image.
> Keep the left 45 percent dark and empty.
> Use a soft key light and a narrow rim light.
> Keep the camera at a stable three-quarter angle.
> Use a near-black background with slight tonal depth.
> Do not add text, logos, screens, particles, or people.

Generate two compositions after concept approval.
Select one material and shape direction before further production.
The final runtime model must reproduce the selected structure consistently.
An attractive image alone does not supply usable 3D geometry.

### A04: background prompt

> Create a dark studio background for a technical portfolio.
> Show a low platform with a soft metal reflection.
> Place a restrained rose reflection near the right edge.
> Keep the center and left side clear.
> Use soft light and subtle surface texture.
> Do not add objects, text, logos, fog, or visible light beams.

### Mobile composition

Create a separate 4:5 composition if the desktop crop loses the structure.
Keep the object within the middle 70 percent of the image.
Do not place text inside any generated asset.
HTML supplies all visible headings and labels.

## A05: material film

Purpose: connect the site's opening object with the broader product story.
Use it once, outside the active 3D section.
Scroll controls the displayed frame in enhanced mode.
The visitor can skip it or select normal playback.
The mobile version starts from a still image.
The film must support clear still frames and smooth movement in both directions.
Export a version for scroll control with a tested keyframe interval.
Keep that version within the existing transfer budget or reduce its resolution and duration.
The loop remains useful for normal playback, but scroll control does not require a seamless loop.

| Time | Image | Camera | Motion |
| --- | --- | --- | --- |
| 0–2 seconds | Complete structure in shadow | Fixed | Soft light reveals the edges |
| 2–4 seconds | Four layers separate slightly | Fixed | Each layer moves along one axis |
| 4–6 seconds | Layers return to alignment | Fixed | Rose insert becomes clear |
| 6–8 seconds | Complete structure | Fixed | Light returns to the first-frame state |

### Video prompt

> Use the approved reference image as the first frame.
> Keep the camera fixed.
> Preserve the exact structure, joints, and material.
> Move the four layers apart by a small distance.
> Return each layer to its original position.
> Move the soft light slowly across the metal surface.
> Return the light to its initial state at the end.
> Keep the background dark and stable.
> Do not add text, sound, particles, new objects, or camera shake.

A prompt does not guarantee a seamless loop.
Check the first and final frames before export.
Reject visible shape changes, extra joints, unstable edges, and text artifacts.
If the model cannot preserve geometry, render the film from the final Three.js or Blender scene.
Use Higgsfield for atmosphere where exact geometry matters less.

## Higgsfield workflow

The connected catalogue returned Seedance 2.5 and FLUX 3 Video during research.
Both records listed reference images and short video generation.
Model access and parameters can change.
Check the catalogue again before production.
No generation job ran during this planning task.

1. Confirm the visual direction and asset scope.
2. Inspect current image and video models.
3. Confirm the required resolution and duration.
4. Check the current credit estimate.
5. Set a generation limit before submission.
6. Generate two concept images.
7. Select one concept.
8. Build the runtime object from that concept.
9. Produce one short film from the approved reference.
10. Inspect the result for shape stability and unwanted content.
11. Produce a mobile crop or separate composition.
12. Encode web versions and export posters.
13. Record the source, model, prompt, rights, and final file.

The initial production allowance should cover two still concepts and up to three video attempts.
This is an attempt limit, not a price estimate.
The tool catalogue did not provide a reliable total production cost during this review.
Check the available allowance before production.
Follow the tool's payment selection procedure.

## Product video scripts

These scripts describe proposed captures.
Arpit must confirm the actual workflows before capture.

| Clip | Sequence | Evidence value |
| --- | --- | --- |
| BackupData | Select source → configure backup → start operation → inspect result | Shows a complete product path |
| Lighthouse | Choose integration → connect through example state → show result or recoverable error | Shows interface and integration judgment |
| 1MB | Open extension → show clear user state → show related platform state | Shows extension-to-product connection |
| Agent memory | Save context → access it through another agent → inspect source and access boundary | Shows the confirmed memory concept |
| Automation | Trigger → rule branch → action → failure route | Shows business logic |
| RAG | Ask a question → inspect retrieved passage → read cited answer | Shows evidence use |
| LoRA | Show matched inputs → compare base and adapter outputs → state limits | Shows controlled comparison |
| Voice | Ask a query → interrupt → resolve or transfer to a person | Shows interaction quality |
| MCP | Show allowed request → show denied request → inspect tool response | Shows access boundaries |

Use test records for any capture with customer data.
Label a demonstration clearly if it does not show the original deployed product.
Do not present a simulated result as a recorded customer outcome.

## Export targets

| Asset type | Master | Web delivery |
| --- | --- | --- |
| Still image | Lossless or high-quality original | AVIF with WebP fallback |
| Product screenshot | Full-resolution PNG | WebP or AVIF with readable labels |
| Video | High-quality 1080p master | MP4/H.264; optional WebM; fast-start metadata |
| Transcript | Plain text | HTML plus WebVTT captions where appropriate |
| Diagram | Editable source | SVG and equivalent HTML text |
| Model | Original model file | GLB with measured compression and compatible loader |
| Texture | Original image | KTX2 where useful; otherwise optimized raster |

Create 640px, 960px, and 1440px image variants where the layout needs them.
Set image dimensions in markup to reserve space.
Keep original masters outside the initial web payload.
Use descriptive filenames and an asset manifest.

## Asset review checklist

- The object has consistent geometry across images, video, and 3D.
- Text remains readable over every background frame.
- Product captures show real work with clear attribution.
- Public media contains no private account data.
- Videos have posters and working controls.
- Speech has captions or a transcript.
- Mobile crops preserve the subject.
- Each file meets its transfer budget.
- Each source has a recorded usage basis.
- Generated media does not imply a false historical event.

## Turby assets: 27 October 2026

Phase 8 uses six original JPEG files from the official Turby page.
The manifest in `public/turby/provenance.json` records each source and checksum.
These files support a finished-variant gallery. Layered trait files remain unavailable.
