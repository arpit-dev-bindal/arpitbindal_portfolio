import type { ContentRecord, DatePoint, Period, Portfolio } from './types.ts';
import { achievements, bhaktibaazar, clients, harmony } from './landing.ts';

const unknown = (): DatePoint => ({ value: null, precision: 'unknown', certainty: 'unknown' });
const date = (value: string, certainty: 'stated' | 'approximate' = 'stated'): DatePoint => ({
  value, precision: value.length === 4 ? 'year' : value.length === 7 ? 'month' : 'day', certainty,
});
const period = (start: string, end?: string): Period => ({ start: date(start), end: end ? date(end) : unknown() });
const noDates = (): Period => ({ start: unknown(), end: unknown() });

// Source support describes evidence, not release approval or verified outcomes.
function record(input: Pick<ContentRecord, 'id' | 'kind' | 'title' | 'summary' | 'sourceIds'> & Partial<ContentRecord>): ContentRecord {
  return {
    organization: null, context: 'employment', role: null, period: noDates(),
    workState: 'unknown', reviewState: 'supported', claims: [], relatedIds: [], gaps: [],
    ...input,
  };
}

export const profile = {
  name: 'Arpit Bindal',
  headline: 'I build complete digital products.',
  introduction: 'My work connects interface design, full-stack systems, Web3, and applied AI.',
  contact: {
    email: 'contact@arpitbindal.com',
    github: 'https://github.com/arpitbindal',
    linkedin: 'https://linkedin.com/in/arpitbindal/',
  },
  resume: { path: '/resume/arpit-bindal.pdf', source: 'Portfolio content records' },
  testimonial: null,
} as const;

// Arpit supplied this list on 11 November 2026. Xhuma keeps its longer title here.
const archive = [...clients, harmony].map(client => [client.id, client.id === 'xhuma' ? 'Xhuma Clinic Management' : client.title, client.summary] as const);

const aiAreas = [
  ['automation', 'SEO automation', 'I built daily n8n flows that take Bhaktibaazar from keyword research to admin-approved blogs and FAQs.', 'Supply one example topic followed from keyword to published blog.'],
  ['rag-agents', 'RAG agents', 'I built a live-catalogue retrieval pipeline with hybrid embedding and BM25 search for Bhaktibaazar.', 'Supply one real question, the retrieved records, and the answer.'],
  ['lora', 'Custom LoRA models', 'I trained a custom LoRA on FLUX.1 that keeps devotional details accurate in generated images.', 'Supply a real before and after pair from the same prompt.'],
  ['voice-systems', 'Voice agents', 'I connected Bhaktibaazar voice agents to the live-catalogue retrieval pipeline.', 'Confirm the voice platform, languages, human handoff, and an example transcript.'],
  ['mcp-services', 'Secure MCP services', 'I built API-key-protected MCP services that any AI agent can use with Bhaktibaazar.', 'Confirm which tool names may be shown publicly.'],
] as const;

export const portfolio: Portfolio = {
  schemaVersion: 1,
  asOf: '2026-10-24',
  sources: [
    { id: 'U1', kind: 'user', label: 'Portfolio scope and audience', status: 'reported' },
    { id: 'U2', kind: 'user', label: 'AI work areas and employer priority', status: 'reported' },
    { id: 'U3', kind: 'user', label: 'SMDEVOPS end timing and project context', status: 'reported' },
    { id: 'U4', kind: 'user', label: 'Lighthouse agent memory and later AI period', status: 'reported' },
    { id: 'U5', kind: 'user', label: 'BackupData source-specific flows and Node.js, Go, Python SDKs; 26 October 2026', status: 'reported' },
    { id: 'U6', kind: 'user', label: 'Permission to publish Lighthouse and 1MB details; 27 October 2026', status: 'reported' },
    { id: 'U7', kind: 'user', label: 'Figures, project order, SMDEVOPS products, Bhaktibaazar, and patent application; 11 November 2026', status: 'reported' },
    { id: 'U8', kind: 'user', label: 'Bhaktibaazar AI system details, figures, and Lighthouse memory scope; 12 November 2026', status: 'reported' },
    { id: 'D1', kind: 'document', label: 'Experience certificate; supplied draft', status: 'draft' },
    { id: 'D2', kind: 'document', label: 'Recommendation letter; supplied draft', status: 'draft' },
    { id: 'W1', kind: 'website', label: 'arpitbindal.com; earlier career and public contact', status: 'public' },
  ],
  records: [
    record({
      id: 'school', kind: 'education', title: 'Senior secondary education', organization: 'Delhi Public School, Jammu',
      context: 'education', period: period('2013', '2015'), workState: 'historical', sourceIds: ['W1'],
      summary: 'I studied at Delhi Public School in Jammu.',
    }),
    record({
      id: 'university', kind: 'education', title: 'B.Tech in Computer Science and Engineering', organization: 'BML Munjal University',
      context: 'education', period: period('2015', '2019'), workState: 'historical', sourceIds: ['W1'],
      summary: 'I studied Computer Science and Engineering at BML Munjal University.',
      claims: [{ id: 'patent', text: achievements.university!.text, sourceIds: ['U7'], reviewState: 'supported' }],
      gaps: ['Supply the university patent research report.'],
    }),
    record({
      id: 'smdevops', kind: 'career', title: 'SMDEVOPS', organization: 'SMDEVOPS LLP', role: 'Full Stack Developer / Team Lead',
      period: { start: date('2020-01'), end: date('2021-12', 'approximate') },
      workState: 'historical', sourceIds: ['W1', 'U3'], summary: 'I built client products and led delivery work at SMDEVOPS.',
      relatedIds: archive.map(([id]) => id),
      gaps: ['Confirm the exact end date. December 2021 follows the reported three-month interval before Lighthouse.'],
    }),
    record({
      id: 'lighthouse-frontend', kind: 'career', title: 'Lighthouse: frontend leadership', organization: 'Lighthouse / ETERNAL LLC',
      role: 'Lead Frontend Developer', period: period('2022-03-14', '2023-04'), workState: 'historical', sourceIds: ['D1', 'D2'],
      summary: 'I joined Lighthouse as a founding team member and owned frontend systems across products and internal tools.',
      relatedIds: ['lighthouse-fullstack', 'lighthouse'], gaps: ['Confirm final letter details before release.'],
    }),
    record({
      id: 'lighthouse-fullstack', kind: 'career', title: 'Lighthouse: full-stack systems and Web3', organization: 'Lighthouse / ETERNAL LLC',
      role: 'Full-Stack Developer / Web3 Integration Specialist', period: period('2023-04', '2026-08-15'),
      workState: 'historical', sourceIds: ['D1', 'D2'], summary: 'My role expanded into full-stack development and Web3 integration.',
      relatedIds: ['lighthouse', 'backupdata', '1mb', 'turby', 'agent-memory'],
      gaps: ['Confirm team scope and two technical decisions for each main study.'],
    }),
    record({
      id: 'ai-practice', kind: 'career', title: 'Freelance and personal AI work', context: 'freelance-and-personal',
      period: period('2026-08'), workState: 'ongoing', sourceIds: ['U2', 'U4'],
      summary: 'My current work includes automation, RAG agents, LoRA models, voice systems, and MCP services.',
      relatedIds: ['bhaktibaazar', ...aiAreas.map(([id]) => id), 'ai-november'],
      gaps: ['Confirm each project name, individual dates, client context, tools, and completion status.'],
    }),
    record({
      id: 'lighthouse', kind: 'project', title: 'Lighthouse', organization: 'Lighthouse', sourceIds: ['D1', 'D2'],
      summary: 'I owned the frontend across Lighthouse products and internal tools.',
      claims: [
        { id: 'integration', text: 'I integrated wallets and smart contracts.', sourceIds: ['D1', 'D2'], reviewState: 'supported' },
        { id: 'wallet-names', text: 'The supplied records name MetaMask, Web3Auth, Coreum, Slush, Keplr, Cosmostation, and Radix integrations.', sourceIds: ['D1', 'D2'], reviewState: 'supported' },
      ],
      relatedIds: ['lighthouse-frontend', 'lighthouse-fullstack', 'backupdata', '1mb', 'turby'],
      gaps: ['Confirm individual integration dates and product labels.', 'Supply real interface images and two technical decisions.'],
    }),
    record({
      id: 'backupdata', kind: 'project', title: 'BackupData', organization: 'Lighthouse', sourceIds: ['D1', 'D2'],
      summary: 'I planned and built a backup service for databases and S3 data.',
      claims: [
        { id: 'scope', text: 'My work covered infrastructure, backend services, SDKs, and a CLI.', sourceIds: ['D1', 'D2', 'U5'], reviewState: 'supported' },
        { id: 'source-problem', text: 'Users needed automated backups across databases and external storage services, including AWS S3 and Azure storage.', sourceIds: ['U5'], reviewState: 'supported' },
        { id: 'custom-flows', text: 'I created source-specific backup flows for SQL databases, PostgreSQL, AWS DynamoDB, S3 data, and other sources.', sourceIds: ['U5'], reviewState: 'supported' },
        { id: 'language-sdks', text: 'I provided the custom backup tooling through Node.js, Go, and Python SDKs.', sourceIds: ['U5'], reviewState: 'supported' },
      ],
      relatedIds: ['lighthouse-fullstack', 'agent-memory'],
      gaps: ['Confirm project dates and architecture.', 'Supply a backup example, alternatives considered, a second technical decision, and measured results.', 'Confirm the exact Azure service and delivered connector scope.'],
    }),
    record({
      id: '1mb', kind: 'project', title: '1MB', organization: 'Lighthouse', sourceIds: ['D1', 'D2'],
      summary: 'I built 1MB and its Chrome extension independently.',
      claims: [{ id: 'product', text: 'The product connects data collection, tokenization, and rewards for online activity.', sourceIds: ['D1', 'D2'], reviewState: 'supported' }],
      relatedIds: ['lighthouse-fullstack'], gaps: ['Confirm dates, extension permissions, and data boundaries.', 'Supply real product screens.'],
    }),
    record({
      id: 'turby', kind: 'project', title: 'Turby', organization: 'Lighthouse', sourceIds: ['D1', 'D2'],
      summary: 'I designed the Turby mascot and automated the collection generation.',
      claims: [{ id: 'launch', text: 'I also handled launch work and supervised the mint.', sourceIds: ['D1', 'D2'], reviewState: 'supported' }],
      relatedIds: ['lighthouse-fullstack'], gaps: ['Confirm dates and collaborators.', 'Supply original assets and confirm public use.'],
    }),
    record({
      id: 'agent-memory', kind: 'project', title: 'Memory and context between AI agents', organization: 'Lighthouse', sourceIds: ['U4'],
      summary: 'At Lighthouse, I worked on memory and context sharing between AI agents as an extension of BackupData.',
      relatedIds: ['backupdata', 'lighthouse-fullstack'], gaps: ['Confirm project dates, scope, context boundaries, and a public example.'],
    }),
    record({
      id: 'bhaktibaazar', kind: 'project', title: bhaktibaazar.title, context: 'freelance-and-personal', sourceIds: ['U7'],
      summary: bhaktibaazar.summary, workState: 'ongoing', relatedIds: ['ai-practice'],
      gaps: ['Confirm dates, client permission to publish, and one example for each AI feature.'],
    }),
    ...archive.map(([id, title, summary]) => record({
      id, kind: 'project', title, organization: 'SMDEVOPS LLP', sourceIds: ['W1', 'U3', 'U7'], summary,
      relatedIds: ['smdevops'], gaps: ['Confirm individual dates, modules, technology, and release status.'],
    })),
    ...aiAreas.map(([id, title, summary, gap]) => record({
      id, kind: 'ai-area', title, context: 'freelance-and-personal', sourceIds: ['U2', 'U4', 'U8'], summary,
      relatedIds: ['ai-practice'], gaps: [gap, 'Confirm individual project dates, name, client context, and completion status.'],
    })),
    record({
      id: 'ethindia-2023', kind: 'event', title: 'ETHIndia 2023, Bangalore', organization: 'Lighthouse', role: 'Hackathon mentor',
      period: period('2023', '2023'), workState: 'historical', sourceIds: ['D1'], summary: 'I mentored participants at ETHIndia 2023 in Bangalore.',
      relatedIds: ['lighthouse-fullstack'], gaps: ['Supply a public event record.'],
    }),
    record({
      id: 'ethglobal-2024', kind: 'event', title: 'FIL Bangkok 2024', organization: 'Lighthouse', role: 'Company representative',
      period: period('2024', '2024'), workState: 'historical', sourceIds: ['D1'], summary: 'I represented Lighthouse at FIL Bangkok 2024.',
      relatedIds: ['lighthouse-fullstack'], gaps: ['Supply a public event record.'],
    }),
    record({
      id: 'ethglobal-2025', kind: 'event', title: 'ETHGlobal 2025, New Delhi', organization: 'Lighthouse', role: 'Workshop speaker and hackathon judge',
      period: period('2025', '2025'), workState: 'historical', sourceIds: ['D1'],
      summary: 'I spoke at a Filecoin India workshop and judged the hackathon at ETHGlobal 2025 in New Delhi.',
      relatedIds: ['lighthouse-fullstack'], gaps: ['Supply slides, a session link, or a public event record.'],
    }),
    record({
      id: 'ai-november', kind: 'plan', title: 'AI work: November plan', context: 'freelance-and-personal',
      period: period('2026-11', '2026-11'), workState: 'planned', sourceIds: ['U4'],
      summary: 'I plan to continue freelance and personal AI projects in November 2026.',
      relatedIds: ['ai-practice'], gaps: ['Review actual progress after the planned period.'],
    }),
  ],
};
