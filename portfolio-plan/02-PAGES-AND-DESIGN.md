# Pages and visual design

## Design brief

This portfolio serves senior engineering employers through precise layouts, real product evidence, and controlled spatial motion.
The site uses a full visual redesign.
It preserves the name, domain, contact routes, and career facts.
Rose accents retain a connection to the current site's magenta.

Design settings: layout variation 7/10; motion intensity 7/10; content density 3/10.
The introduction has the strongest motion.
Project content uses quieter layouts with more text.

### Space and visual focus

The generated preview compresses several sections into one image.
It does not set the final content density.
Show one main project image at a time on Home.
Give each feature its own space before the next feature enters.
Use one heading, one short paragraph, and one primary action per feature.
Place technical diagrams and detailed topic lists on the relevant inner pages.
Remove decorative section numbers, repeated borders, and unnecessary small labels from the preview layout.
Keep text still while readers inspect it.
Use a quiet section between major motion sequences.
Only one rich visual should move within the viewport at a time.

## Visual system

| Element | Proposed specification | Purpose |
| --- | --- | --- |
| Dark background | `#101216` | Main Home surface and chapter introductions |
| Raised dark surface | `#1B1F26` | Controls and media frames |
| Light background | `#F2F3F5` | Project evidence and detailed text |
| Dark text | `#161A20` | Text on light surfaces |
| Light text | `#F4F5F7` | Text on dark surfaces |
| Secondary text | `#AFB6C2` on dark; `#535D6B` on light | Captions and metadata |
| Accent | `#E75B7F` on dark; `#AA294E` on light | Links, focus states, and selected items |
| Display type | Space Grotesk, medium | Name, major headings, project titles |
| Body type | System sans-serif | Clear text with low font cost |
| Technical type | IBM Plex Mono | Dates, technical labels, code examples |
| Corners | 4px controls; 12px media; 20px dialogs | Consistent geometry |
| Borders | 1px, restrained contrast | Group content and show control edges |
| Icons | One family, such as Phosphor | Clear, consistent controls |

These colors require contrast checks on their actual surfaces.
Do not use accent text over a generated image without an opaque text area.
Use a dark label on the rose primary button.

The requested light sections form a deliberate part of the design.
Each section declares its own surface and text colors.
The header changes its surface at section boundaries.
The initial design does not require a separate theme switch.

### Type and spacing

| Element | Desktop | Mobile |
| --- | --- | --- |
| Main heading | 72–96px; maximum two lines where practical | 40–48px; natural wrapping |
| Section heading | 40–56px | 28–36px |
| Project title | 30–40px | 24–30px |
| Body | 18px; line height 1.6 | 17px; line height 1.6 |
| Caption | 14px | 14px |
| Text measure | 60–68 characters | Available width within page margins |
| Page gutter | 48–80px | 20px |
| Section gap | 112–160px | 64–88px |
| Main grid | 12 columns; 24px gap | One column; 20px gap |
| Maximum width | 1440px for content | Fluid |

Use a four-column tablet layout between 768px and 1023px.
Use the desktop layout from 1024px where content fits.
Keep important controls at least 44px high.
Use generous heading height for descenders and line wraps.

## Shared navigation

Desktop: name mark, Work, AI Systems, Journey, About, Contact.
The name mark links to Home.
Keep the header within 72px height.
Use a 64px header on mobile.
Mobile uses a Menu button with a clear label.

The mobile menu opens a full-height panel.
The panel shows the same links and a direct email action.
Escape closes the menu.
Focus returns to the Menu button.
The menu traps focus only while open.

The footer shows email, LinkedIn, GitHub, and a motion control.
The site does not replace the native cursor.
The resume link appears on Journey and Contact.

## Home

Target length: about seven desktop screen heights with normal text sizes.
One short pinned sequence adds up to 120vh of scroll distance.
The exact height follows content, rather than a forced screen count.

| Order | Section and content | Layout | Media | Action |
| --- | --- | --- | --- | --- |
| 1 | Name, main statement, scope sentence | Text left; 3D object right | Custom layered object on dark surface | View my work |
| 2 | Interface → systems → integration → intelligence | Short spatial sequence with four readable labels | Same object separates and reconnects | Skip to selected work |
| 3 | Selected work | Separate, spacious features for BackupData, Lighthouse, and 1MB | One large real image per feature | Open each study |
| 3a | Film transition | One wide frame in normal page flow | Material film controlled by scroll | Skip film; use playback controls |
| 4 | Current AI work | Light section; one agent memory feature with a short scope sentence | One simple context diagram | Explore AI Systems |
| 5 | Career progression | Three main entries plus current AI work | Dates and one real portrait or event photo | View full journey |
| 6 | Design range and leadership | Turby image beside short event evidence | Original mascot and real event image | Open Turby; view events |
| 7 | Founder recommendation | Narrow text on a light surface | Short approved excerpt | Read context in About |
| 8 | Contact | Large name and direct email on dark surface | Static crop of the main object | Email Arpit |

Remove the recommendation section if the final public excerpt remains unavailable.
Do not replace it with a fabricated quote.
The AI section appears before the extended career summary.
This makes the current direction clear to employers.

### Home layout diagram

```text
┌──────────────────────────────────────────────────────────┐
│ Arpit Bindal       Work  AI Systems  Journey  About Contact│
├──────────────────────────────────────────────────────────┤
│ I build complete          Custom 3D structure             │
│ digital products.         Four separate layers            │
│ Scope sentence            Rose edge detail                │
│ [View my work]                                            │
├──────────────────────────────────────────────────────────┤
│ Interface → Systems → Integration → Intelligence          │
│ Short scroll sequence; readable labels; skip link         │
├──────────────────────────────────────────────────────────┤
│ Selected work                                            │
│ BACKUPDATA: wide product image and clear responsibility   │
│ LIGHTHOUSE: separate large image and short text           │
│ 1MB: separate large image and short text                  │
├──────────────────────────────────────────────────────────┤
│ One wide film frame; scroll controls the video position   │
├──────────────────────────────────────────────────────────┤
│ LIGHT SECTION: AI systems                                 │
│ Agent memory and context diagram                         │
│ Short scope sentence; link to detailed AI work            │
├──────────────────────────────────────────────────────────┤
│ Career summary                Real portrait              │
│ SMDEVOPS → Lighthouse → Current AI work                  │
├──────────────────────────────────────────────────────────┤
│ Turby visual                  Event evidence             │
├──────────────────────────────────────────────────────────┤
│ LIGHT SECTION: short founder recommendation               │
├──────────────────────────────────────────────────────────┤
│ Contact Arpit                 Email / LinkedIn / GitHub   │
└──────────────────────────────────────────────────────────┘
```

The diagram describes content order. It does not represent a finished design.

### Mobile Home

Show the name, headline, scope, and work link before the object.
Keep the object within a fixed 4:3 frame.
Use one static object image by default on narrow screens.
An optional Enable 3D control loads the enhanced scene.
Replace the pinned sequence with four short vertical rows.
Stack the project entries.
Keep current AI work visible before the full journey link.
Use direct buttons instead of hover-dependent controls.

## Work

Opening title: **Selected work and earlier projects.**
Opening text: **Products, systems, and tools across my work at Lighthouse and SMDEVOPS.**

The page starts with four main studies.
Each entry shows the project name, role, employer, short summary, and real image.
Do not show an exact year until the source supports it.
The main order is BackupData, Lighthouse, 1MB, then Turby.
Use varied image sizes within a fixed grid.

An AI Systems link follows the main studies.
The earlier work section contains all six SMDEVOPS entries.
The list uses accessible expansion panels for additional details.
Each panel retains its heading when closed.
The archive does not depend on a carousel.
Ten projects do not require a search box at launch.

## Shared study structure

Each study uses about 600–900 words where evidence supports that depth.
The first screen remains useful without the full narrative.

| Order | Component | Required content | Presentation |
| --- | --- | --- | --- |
| 1 | StudyHeader | Project, role, employer, dates, responsibility | Dark introduction; compact metadata |
| 2 | StudySummary | Problem, contribution, delivered result | Three short text blocks on light surface |
| 3 | MediaStage | Real product or original design artifact | Wide image with caption |
| 4 | ScopeMap | Arpit's responsibility and collaborator boundaries | Clear list or diagram |
| 5 | DecisionRecord | Constraint, alternatives, choice, consequence | Two detailed decision records |
| 6 | SystemDiagram | Confirmed components and data flow | Clickable steps with equivalent text |
| 7 | ProductDemo | Real workflow | Video with poster, controls, and transcript |
| 8 | OutcomeList | Delivered components and sourced measurements | Static text; no animated invented counters |
| 9 | Reflection | Limitation, lesson, next improvement | Short personal account |
| 10 | RelatedWork | Next study and contact route | Direct links |

On desktop, a narrow contents rail links to sections.
On mobile, a compact contents list appears near the top.
The browser back action returns to the prior Work position where practical.
Every study URL works on direct load.

### Study-specific design

| Study | Main visual | Special component | Motion purpose | Required fallback |
| --- | --- | --- | --- | --- |
| BackupData | Actual console or CLI workflow | Source-to-storage diagram | Explain the confirmed backup sequence | Static diagram and ordered text |
| Lighthouse | Actual product interface | Wallet flow explorer | Show interface states for selected integrations | Static screenshots with captions |
| 1MB | Actual extension beside its product page | Extension walkthrough | Explain a short user path | Numbered screenshots |
| Turby | Original collection artwork | Trait gallery | Show how original parts form variants | Static contact sheet |

The Lighthouse flow explorer does not connect a real wallet.
It presents recorded or local example states.
The Turby gallery uses original assets only when available.
It does not generate fake historical collection images.

## AI Systems

Opening title: **AI systems for real tasks.**
The introduction identifies Lighthouse work separately from freelance and personal work.

### Section sequence

1. Scope and work periods.
2. Lighthouse agent memory and context sharing.
3. Business automation.
4. RAG agents.
5. Custom LoRA models.
6. Ecommerce voice systems.
7. Secure MCP services.
8. Evaluation methods and known limits.
9. Contact link.

The agent memory section links back to BackupData.
It explains the original need and Arpit's confirmed contribution.
The diagram remains a draft until Arpit confirms the real architecture.

Each later section has a short problem statement and one concrete example.
Label each example as client work, personal work, or a demonstration.
Label its state as complete, active, or planned.
Display August–October 2026 for work confirmed through the current date.
Label November 2026 work as planned until Arpit confirms completion after that period.

The RAG example uses a transcript with visible source passages.
The LoRA example uses matched inputs for a useful comparison.
The voice example uses a recording with synchronized transcript highlights.
The MCP example shows a tool contract and a denied request.
The automation example shows the trigger, decision, action, and failure route.

The initial portfolio uses recordings and local examples.
An interactive live agent would need a separate scope for cost, security, data, and support.

## Journey

Opening title: **A wider scope with each role.**
Use a vertical timeline with readable dates.
The timeline starts with education, then SMDEVOPS, Lighthouse, and current AI work.
The Lighthouse period contains both formal roles.
Place events beside their corresponding years.

Desktop uses a date column and a content column.
Mobile uses one column with the date above each entry.
A year link jumps to the corresponding content.
The timeline never requires horizontal drag.
Use a simple SVG line only to connect actual entries.
Provide a resume download after the professional timeline.

## About

Opening title: **Design judgment. Engineering responsibility.**

| Section | Content | Visual |
| --- | --- | --- |
| Introduction | Short personal account | Real portrait |
| Work approach | Three specific principles with project examples | Text with small supporting images |
| Leadership | Delivery, decisions, mentoring, and public contribution | Real event photo or slides |
| Education | University degree; short school entry | Plain text |
| Personal detail | Interests Arpit chooses to share | Optional real photograph |
| Recommendation | Approved excerpt and attribution | Text |
| Contact | Employer contact route | Direct link |

Proposed principles: understand the user, own the full path, explain technical choices.
Arpit should confirm these statements.
Do not invent hobbies, location, personality claims, or a work philosophy.

## Contact

Opening title: **Contact Arpit.**
The page provides email, LinkedIn, GitHub, and the current resume.
Show the email as selectable text.
The primary link opens the visitor's email application.
A Copy email button provides an alternative.
Copy success appears near the button and reaches assistive technology.
If copy fails, preserve the selectable email and show a short message.

Do not promise a response time without Arpit's confirmation.
Do not show availability or a location claim without confirmation.
Do not add a calendar service in the first version.

## Missing page

Show a short error message and links to Home and Work.
Use a static object crop.
Do not delay recovery with an animation.

## Component inventory

| Component | Pages | Main states |
| --- | --- | --- |
| SiteHeader | All | Top, scrolled, light section, menu open |
| MotionControl | All | Motion on, motion off, system preference |
| HeroScene | Home | Poster, load, ready, failure, reduced motion |
| StorySequence | Home | Four steps, skip, static fallback |
| ProjectFeature | Home, Work | Rest, hover, keyboard focus |
| ArchiveEntry | Work | Closed, open |
| StudyHeader | Four studies | Static |
| MediaPlayer | Studies, AI Systems | Poster, play, pause, error, captions |
| SystemDiagram | Studies, AI Systems | All steps visible, selected step |
| EvidencePanel | Studies, AI Systems | Source available, text-only example |
| CareerTimeline | Journey, Home summary | Current anchor, normal flow |
| EventGallery | Journey, About | Selected item, next, previous |
| Testimonial | Home, About | Approved text only |
| ContactLinks | Contact, footer | Focus, copy success, copy failure |

## Visual acceptance

- The first screen identifies Arpit and his work.
- Real product images carry more evidence than decorative media.
- Dark and light sections retain clear text contrast.
- Mobile visitors can reach every fact and action.
- No section depends on hover or 3D interaction.
- Each page uses a distinct structure within the same design system.
- Every animation explains order, state, depth, or responsibility.
