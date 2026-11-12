# Research and reference decisions

Research date: 24 October 2026.
This review combines direct page inspection, primary documentation, and design judgment.
It does not claim user testing or performance measurements of the reference sites.

## Current portfolio

I inspected Home, Experience, Projects, Education, and Contact in the browser.
The text search tool could not read the site reliably.
The browser exposed its hash routes and rendered content.
Source: [Arpit Bindal's current portfolio](https://arpitbindal.com/#/home).

| Observation | Consequence for the new plan |
| --- | --- |
| Home introduces full-stack work, infrastructure, UI design, and project management | Preserve the breadth; connect it with specific work |
| The site uses dark gray and magenta | Retain a restrained rose relationship in the new palette |
| The opening uses a developer illustration and rotating role text | Replace this with a specific statement and custom spatial object |
| Experience lists SMDEVOPS as current | Use Arpit's corrected timeline |
| Project content covers six older products | Preserve all six under SMDEVOPS |
| Education includes university and school | Keep concise education content |
| The page includes certifications | Exclude them under the user request |
| Contact exposes email, LinkedIn, and GitHub | Preserve these direct routes |
| The inspected contact page lacks a resume link | Request a current PDF for the new site |

The current site provides useful career material.
The largest content change concerns Lighthouse and current AI work.
The largest design change concerns the connection between visual presentation and project evidence.

## User references

### Scrolltide: Selene

I inspected the template page and its visible preview.
The provider describes layered parallax, a drawn trajectory, and a horizontal mission reel.
The preview shows a dark lunar scene with a restrained opening.
I did not validate its implementation or all live motion states.
Source: [Selene](https://www.scrolltide.co/templates/selene).

**Useful principle:** one consistent visual world can connect separate chapters.

**Application:** the same four-layer object appears in the opening, story sequence, and contact crop.

**Adaptation:** use real career and product content as the story.
Use a short sequence so employers reach the work quickly.
The lunar imagery itself does not match Arpit's professional history.

### Smooothy

I inspected the rendered page and its gallery.
Large 3D objects sit over simple rectangular backgrounds.
The interface includes arrows and position controls.
Its documentation describes a configurable slider with optional loop and snap behavior.
Sources: [Smooothy demo](https://smooothy.federic.ooo/), [repository](https://github.com/vallafederico/smooothy).

**Useful principle:** a large object can feel physical without a complex page layout.

**Application:** use a tactile Turby or event gallery where actual media exists.

**Adaptation:** give every item a direct button or link.
Do not place the full career history behind drag controls.
Use a static list if the gallery adds little value.

### SmoothUI

I inspected the main page, visible component names, and page layout.
The catalogue includes photo tabs, a scrollable card stack, controls, and motion examples.
Its public page describes React components with Motion and GSAP support.
Source: [SmoothUI](https://smoothui.dev/).

**Useful principle:** controls should communicate state through small, consistent changes.

**Application:** use clear menu, tab, copy, focus, and expansion states.

**Adaptation:** retain the portfolio's own type, colors, and spacing.
Select only components that solve a defined page need.
The plan does not import a complete template.

## Additional portfolio references

### Dennis Snellenberg

The public site presents a clear designer/developer role, selected projects, and direct contact routes.
Its content separates recent work from a larger work index.
Source: [Dennis Snellenberg](https://dennissnellenberg.com/).

**Useful principle:** clear positioning and strong work selection can support a distinctive presentation.

**Application:** lead with a short scope statement, then four strong studies.
Keep earlier work available through the Work archive.
This review did not audit the site's animation code.

### Bruno Simon

The public portfolio asks visitors to drive through a 3D world.
It exposes input guidance and quality controls.
Source: [Bruno Simon](https://bruno-simon.com/).

**Useful principle:** a consistent interactive environment can become a memorable expression of technical skill.

**Application:** use one custom spatial object with a clear identity.

**Tradeoff:** a complete game world increases content discovery work and production scope.
For this employer audience, keep that idea outside the main release.
This decision is an inference from the brief, not a measured conversion result.

### Rauno Freiberg

The public page states a precise interaction-design role and exposes selected projects and craft material.
Source: [Rauno Freiberg](https://rauno.me/).

**Useful principle:** a small amount of specific evidence can communicate a clear professional identity.

**Application:** show actual system decisions and concise interface examples.
Avoid a long generic skills list.
This review covered public text, not an interaction audit.

### Emil Kowalski

The public page connects a design-engineering identity with named projects and technical articles.
Source: [Emil Kowalski](https://emilkowal.ski/).

**Useful principle:** public artifacts help readers assess technical judgment.

**Application:** each study should expose a real diagram, workflow, code excerpt, or decision record.
Add articles later only when Arpit has substantive material.
Do not create an empty blog for page count.

## Research synthesis

These conclusions express the recommended design approach.
They do not claim universal rules for every portfolio.

| Principle | Proposed use | Check |
| --- | --- | --- |
| One visual identity | Reuse the layered structure across key moments | Can a reviewer identify the same visual language? |
| Clear role | State product, systems, Web3, and AI scope early | Can a recruiter explain Arpit's scope after ten seconds? |
| Evidence before claims | Show real screens and responsibility | Can each claim point to a source? |
| Deliberate motion | Use animation for sequence, state, or depth | Does removing motion preserve the facts? |
| Strong current chapter | Give AI work a dedicated page and early Home section | Can an employer find current work in one click? |
| Readable detail | Use light sections and narrow text measures | Can a reader scan a study without motion? |
| Complete history | Preserve SMDEVOPS, Lighthouse, education, and current work | Does every known period have a clear treatment? |

## Product context

| Source | What it establishes | What it does not establish |
| --- | --- | --- |
| [Lighthouse](https://lighthouse.storage/) | Current public product context includes AI memory | Arpit's ownership of every current feature |
| [BackupData](https://www.backupdata.io/) | Current public backup product context | Historical scope of every feature |
| [1MB](https://1mb.io/) | Current public extension and reward context | Historical implementation details or personal impact metrics |

Arpit separately confirmed the Lighthouse memory and context tool.
The content plan uses that direct confirmation.
It still requires project-specific scope and artifacts.

## Primary technical sources

| Source | Verified guidance | Decision in this plan |
| --- | --- | --- |
| [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | Supports scroll progress, pinning, and timelines | One short Home story sequence |
| [GSAP React](https://gsap.com/resources/React/) | Provides scoped React integration and cleanup | Use `useGSAP` with local scope |
| [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/) | Supports conditional animation setup and reversion | Separate desktop and reduced-motion behavior |
| [Three.js cleanup](https://threejs.org/manual/pages/cleanup.html) | GPU resources require explicit lifecycle care | Dispose owned assets and handle scene removal |
| [Three.js responsive design](https://threejs.org/manual/pages/responsive.html) | Canvas size and resolution affect rendering cost | Cap DPR and measure device performance |
| [React Three Fiber performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance) | Demand rendering and resource reuse reduce unnecessary work | Rest the scene between interactions |
| [Next.js components](https://nextjs.org/docs/app/getting-started/server-and-client-components) | Separates server content from browser interaction | Keep facts in rendered HTML |
| [Web Vitals](https://web.dev/articles/vitals) | Defines LCP, INP, CLS, and field evaluation | Adopt explicit release targets |
| [W3C pause controls](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) | Requires control for qualifying automatic movement | Global motion control and video pause |
| [MDN autoplay](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay) | Browsers can block automatic playback | Preserve posters and play controls |
| [MCP architecture](https://modelcontextprotocol.io/docs/learn/architecture) | Describes host, client, server, and protocol boundaries | Ask for a precise diagram of Arpit's MCP work |
| [MCP security](https://modelcontextprotocol.io/specification/latest/basic/security_best_practices) | Covers access risks and security controls | Request evidence for secure MCP claims |
| [Hugging Face LoRA](https://huggingface.co/docs/peft/main/en/conceptual_guides/lora) | Describes adapter-based model changes | Ask for base model, adapter task, and matched comparison |
| [Retrieval guidance](https://docs.langchain.com/oss/python/deepagents/retrieval) | Connects retrieval with external knowledge | Show source passages in RAG examples |

These AI sources guide the evidence request.
They do not establish the tools Arpit used.
The portfolio does not need those frameworks as runtime dependencies.

## Skills and asset tools

The user requested the [Three.js skill repository](https://github.com/CloudAI-X/threejs-skills).
I installed its 13 skills through the local skill installer.
This fulfilled the requested installation without a duplicate project-local copy.
The skills cover core scenes, assets, materials, animation, interaction, and performance.

The [official GSAP skills](https://github.com/greensock/gsap-skills) already exist locally.
I read the relevant core, React, ScrollTrigger, and performance guides.

The Higgsfield model catalogue returned Seedance 2.5 and FLUX 3 Video.
I inspected the returned duration, resolution, reference-image, and audio parameters.
This was a read-only catalogue query.
The result supports a feasible asset workflow, but does not guarantee output quality or cost.

## Research limits

- No interview with an employer took place during this task.
- No reference site received a full accessibility or performance audit.
- No generated asset proves the final 3D or video quality yet.
- Some career facts still depend on draft letters and Arpit's account.
- Actual screenshots, project decisions, and measurements remain necessary.
- Development must verify package compatibility and current API behavior.
