// Landing page content that Arpit supplied on 11 November 2026.
// These figures and descriptions are his own statements. They have no supporting document in the source list yet.
import icons from './tech-icons.json' with { type: 'json' };

export type Tech = { icon: keyof typeof icons; label: string };
const tech = (icon: keyof typeof icons, label: string): Tech => ({ icon, label });
export const techIcon = (name: keyof typeof icons) => icons[name];

export const figures = [
  { value: 7, suffix: '+', label: 'Years of experience', note: '' },
  { value: 30, suffix: '+', label: 'Products shipped and scaled', note: '' },
  { value: 10, suffix: '+', label: 'Clients who recommend the work', note: '' },
  { value: 3, suffix: '+', label: 'Events judged, mentored and represented', note: '' },
  { value: 5, suffix: '', label: 'Coding languages', note: 'JavaScript · TypeScript · Python · C++ · Go' },
  { value: 6, suffix: '+', label: 'Web3 networks integrated', note: 'Ethereum · Solana · Sui · Base · Polygon · Arbitrum' },
];

// The marquee rows. Icon shapes come from the Simple Icons set, which the earlier live site also used.
export const stack: Tech[][] = [
  [tech('javascript', 'JavaScript'), tech('typescript', 'TypeScript'), tech('python', 'Python'), tech('go', 'Go'), tech('cplusplus', 'C++'), tech('html5', 'HTML5'), tech('css3', 'CSS3'), tech('sass', 'Sass'), tech('react', 'React'), tech('nextdotjs', 'Next.js'), tech('angular', 'Angular'), tech('nodedotjs', 'Node.js'), tech('adonisjs', 'AdonisJS'), tech('laravel', 'Laravel')],
  [tech('solidity', 'Solidity'), tech('ethereum', 'Ethereum'), tech('solana', 'Solana'), tech('sui', 'Sui'), tech('polygon', 'Polygon'), tech('mongodb', 'MongoDB'), tech('mysql', 'MySQL'), tech('postgresql', 'PostgreSQL'), tech('amazondynamodb', 'DynamoDB'), tech('amazonwebservices', 'AWS'), tech('docker', 'Docker'), tech('githubactions', 'GitHub Actions'), tech('netlify', 'Netlify'), tech('heroku', 'Heroku'), tech('git', 'Git')],
];

export type Project = { id: string; title: string; tagline: string; context: string; summary: string; logo: string; site: string; tone: 'dark' | 'light'; brand: string; href?: string; linkLabel?: string };
// The order is Arpit's. Each logo is the brand's own file and links to the brand's website. The tone names the tile colour the logo needs.
export const projects: Project[] = [
  { id: 'lighthouse', title: 'Lighthouse', tagline: 'Decentralised storage products', context: 'Lighthouse · ETERNAL LLC', summary: 'I owned the frontend across Lighthouse products and internal tools, with wallet and smart contract integrations.', logo: '/logos/lighthouse.svg', site: 'https://lighthouse.storage/', tone: 'dark', brand: 'Lighthouse', href: '/work/lighthouse', linkLabel: 'View study' },
  { id: 'backupdata', title: 'BaaS', tagline: 'Backup as a service', context: 'Lighthouse · ETERNAL LLC', summary: 'I planned and built a backup service for databases and S3 data, with SDKs and a CLI.', logo: '/logos/lighthouse.svg', site: 'https://lighthouse.storage/', tone: 'dark', brand: 'Lighthouse', href: '/work/backupdata', linkLabel: 'View study' },
  { id: '1mb', title: '1MB', tagline: 'Data monetisation through web extensions', context: 'Lighthouse · ETERNAL LLC', summary: 'I built 1MB and its Chrome extension independently.', logo: '/logos/1mb.svg', site: 'https://1mb.io/', tone: 'dark', brand: '1MB', href: '/work/1mb', linkLabel: 'View study' },
  { id: 'turby', title: 'Turby', tagline: 'Design and minting flow', context: 'Lighthouse · ETERNAL LLC', summary: 'I designed the Turby mascot and automated the collection generation.', logo: '/logos/turby.webp', site: 'https://lighthouse.storage/turby', tone: 'dark', brand: 'Turby', href: '/work/turby', linkLabel: 'View study' },
  { id: 'bhaktibaazar', title: 'Bhaktibaazar', tagline: 'India’s first devotional and spiritual marketplace', context: 'Freelance · Applied AI', summary: 'I build its AI-first features: MCP connections that generate blogs automatically, and a custom RAG pipeline behind its chatbots and voice agents.', logo: '/logos/bhaktibaazar.svg', site: 'https://www.bhaktibaazar.com/', tone: 'dark', brand: 'Bhaktibaazar' },
  { id: 'xhuma', title: 'Xhuma', tagline: 'Clinic management', context: 'SMDEVOPS LLP', summary: 'A clinic management application with live video consultations and OCR checks on prescriptions.', logo: '/logos/xhuma.png', site: 'https://healthcare.xhuma.co/', tone: 'dark', brand: 'Xhuma Healthcare' },
  { id: 'harmony', title: 'Harmony', tagline: 'Insurance ERP', context: 'SMDEVOPS LLP', summary: 'An ERP that manages live insurance data from healthcare providers for SR22 coverage. It compares benefits and generates payment links.', logo: '/logos/harmony.svg', site: 'https://theharmonyinsurance.com/', tone: 'light', brand: 'Harmony Insurance' },
];

export type Client = { id: string; title: string; summary: string; tech: Tech[] };
// Sources: résumé lines and project notes that Arpit supplied. Where the two disagreed on a framework, the résumé line is used.
export const clients: Client[] = [
  { id: 'netbookflix', title: 'Netbookflix', summary: 'An ebook subscription platform with video and audio streaming. I built its PDF viewer, video player and audio player. Subscribers pay monthly or yearly for the full library.', tech: [tech('angular', 'Angular 8'), tech('laravel', 'Laravel'), tech('php', 'PHP'), tech('amazonec2', 'AWS EC2'), tech('mysql', 'MySQL')] },
  { id: 'fairpay', title: 'Fairpay', summary: 'A payment gateway for the Latin American market. Users add and send money, including cryptocurrency payments, and a dedicated flow makes charity donations simple.', tech: [tech('angular', 'Angular 8'), tech('nodedotjs', 'Node.js'), tech('amazonec2', 'AWS EC2'), tech('mongodb', 'MongoDB')] },
  { id: 'xhuma', title: 'Xhuma', summary: 'A clinic management application for appointments, invoices, chat and video. It adds live video consultations and OCR checks on prescriptions.', tech: [tech('angular', 'Angular 9'), tech('laravel', 'Laravel'), tech('php', 'PHP'), tech('webrtc', 'Live video')] },
  { id: 'people-accel', title: 'People Accel', summary: 'A platform that helps organisations measure the happiness index and mental health of employees across departments. Its analytics support decisions on wellbeing and productivity.', tech: [tech('react', 'React'), tech('nodedotjs', 'Node.js'), tech('amazonec2', 'AWS EC2'), tech('amazons3', 'AWS S3'), tech('amazondynamodb', 'DynamoDB')] },
  { id: 'nexus-mall', title: 'Nexus Mall', summary: 'A touch-screen kiosk system for shoppers. It offers a searchable directory of every store, filtered by category or location, with opening hours and descriptions.', tech: [tech('nextdotjs', 'Next.js'), tech('nodedotjs', 'Node.js'), tech('amazonec2', 'AWS EC2'), tech('amazons3', 'AWS S3'), tech('mongodb', 'MongoDB')] },
];
// Harmony appears among the selected projects on the landing page and in the SMDEVOPS archive on the Work page.
export const harmony: Client = { id: 'harmony', title: 'Harmony Insurance ERP', summary: 'An ERP that manages live insurance data from healthcare providers for SR22 coverage. It compares benefits and generates payment links.', tech: [] };
export const bhaktibaazar = { title: 'Bhaktibaazar', summary: 'Bhaktibaazar is India’s first devotional and spiritual marketplace. I build its AI-first features: MCP connections that generate blogs automatically, and a custom RAG pipeline behind its chatbots and voice agents.' };
export const clientPractice = 'On each project I worked with cross-functional teams to define requirements, kept the frontend and backend integrated for performance, and tested and debugged for secure releases.';

// Journey additions keyed by record id. The proof is the patent search report, served from public/docs/. The link renders only when that file exists.
// The wording follows the report: it names the invention, the inventors (Arpit Bindal and Akshay Garg) and the recommendation to proceed.
export const achievements: Record<string, { text: string; proof: string | null }> = {
  university: { text: 'The university put my final-year project forward for a patent as “Method for Processing Image Captured Through Camera”, a face recognition method for surveillance cameras. The 2019 patent search report found novel features and recommended that the inventors proceed.', proof: '/docs/patent-search-report.pdf' },
};
