# Phase 13: Media production and review

Date: 27 October 2026.

## Result

The media package contains original masters, web exports, checksums, source records, and a private comparison page.
Open <http://127.0.0.1:4176/> while the local media server runs.
The portfolio still uses its existing scene and film.

## Selection

| Asset | Result | Decision |
| --- | --- | --- |
| GPT Image 2 structure | Four groups around a central insert | Keep as a concept; it differs from the runtime model |
| Seedance 2.0 film | Six-second animation from the runtime poster | Reject for site use; sampled frames add a layer |
| Existing model-rendered film | Exact four-layer geometry | Retain for site use |
| Existing scene and film posters | Direct model renders | Retain for site use |
| Dark background | Flat studio surface | Retain to limit visual clutter |

The generated candidates remain available for comparison.
This phase did not replace the correct runtime geometry with generated geometry.
No further paid attempts occurred.
The selected film is 838,666 bytes.
The generated film export is 1,258,007 bytes.
The image exports use widths of 640, 960, and 1440 pixels.

## Checks

Export checks validate hashes, byte counts, video format, duration, keyframe spacing, and fast-start metadata.
The generated export uses H.264 at 1280×720 without audio.
Its duration is 6.033 seconds. Keyframes occur within 0.21 seconds.
Browser checks confirm decoding, forward and reverse seeks, and native playback for both films.
The review page fits 320, 390, 768, and 1440 pixel widths.
The browser report contains no application JavaScript errors.
Visual frame review found the generated film geometry defect.
These checks do not constitute physical phone or Safari review.

## Budget

The image quote was 6.5 credits. The film quote was 27 credits.
Both jobs completed. Total quoted cost is 33.5 credits.
The ledger reserves 34 credits because final per-job charges remain unavailable.
The remaining allocation is 66 credits under the original 100-credit limit.
See the budget ledger for job IDs and status.

## Remaining sources

Actual product captures, portrait, event photos, earlier project media, and resume remain unavailable.
The current Turby gallery has original images; separate trait layers remain unavailable.
The AI examples remain labeled illustrations until actual project evidence exists.
The asset register records all sixteen planned asset groups.
Social images remain part of the later metadata work.
Full media acceptance remains open for these source requirements.

## Reproduction

Run `node scripts/export-phase-13-media.mjs` to rebuild exports from saved masters.
The script requires FFmpeg and Python with Pillow.
Run `node scripts/check-phase-13-media.mjs` for file checks.
Serve `design/phase-13` on localhost port 4176 for browser review.
Run `node scripts/check-media-preview.mjs` with the Playwright module path for browser checks.

## Next phase

Phase 14 covers motion and media integration.
Use the selected model-rendered assets unless a later review approves a replacement.
The live domain remains unchanged.

## Approval

Arpit approved the selected model-rendered assets on 27 October 2026.
Phase 14 uses those exports. Generated candidates remain outside the site.
