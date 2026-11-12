# Phase 15: Metadata and old links

Date: 27 October 2026.

## Result

All ten pages now have unique descriptions, canonical URLs, and share images.
Open Graph and Twitter metadata use the same page content.
Home contains Person structured data with the supplied public profiles.
Project studies contain CreativeWork data. Other pages contain WebPage data.
The metadata adds no ratings, awards, employment dates, or unsupported results.
The missing-page response has no canonical URL or share image.

The ten share images use the approved model poster and the existing licensed font.
Each image measures 1200×630 pixels.
Local composition spent zero generation credits.
The social image manifest records the source and output names.

## Old links

The published script confirms all six route names in the recorded migration plan.
The source record includes the script URL and checksum.

| Old hash | Destination |
| --- | --- |
| `#/home` | `/` |
| `#/splash` | `/` |
| `#/experience` | `/journey` |
| `#/projects` | `/work` |
| `#/education` | `/about#education` |
| `#/contact` | `/contact` |

The browser maps known hashes only at the root or index.html entry.
It preserves query parameters and replaces the old history entry.
Normal anchors and unknown hashes remain unchanged.
Native navigation remains available without JavaScript; automatic hash migration requires JavaScript.
The About page now exposes a focusable education target.

## Preview and release boundary

Every page retains `noindex,nofollow`.
The robots file disallows crawling across the preview.
The sitemap lists ten intended canonical URLs at arpitbindal.com.
The local preview serves text and XML files with the correct content types.
These files do not publish the new site or update the live domain.
Canonical URLs and social URLs describe the intended release location.
Those new public URLs will work after an approved deployment.
Release work must deliberately review robots and indexing rules.
Robots directives do not provide access control.

## Checks

TypeScript, 31 tests, content validation, and the site build pass.
Two new tests cover metadata boundaries and restricted hash migration.
Four metadata browser check groups pass.
Seven shared route and navigation check groups pass.
The browser checks cover all page metadata, image dimensions, six migrations, query preservation, and unknown hashes.
They also check robots, sitemap, HTTP 404, and no-JavaScript navigation.
The reports contain no application JavaScript errors.
Visual review confirms the share image layout and readable text.

## Files

| File | Purpose |
| --- | --- |
| `src/site/metadata.ts` | Descriptions, canonical URLs, social tags, and structured data |
| `src/site/legacy-routes.ts` | Restricted old-hash map |
| `src/site/legacy-navigation.ts` | Browser migration |
| `scripts/render-social-images.py` | Reproducible local share images |
| `scripts/check-metadata.mjs` | Browser checks |
| `tests/metadata.test.mjs` | Metadata and migration boundary tests |

## Budget and next phase

This phase spent zero Higgsfield credits.
The existing allocation remains unchanged: 34 credits reserved and 66 credits available.
Phase 16 covers the private preview review and release issue list.
