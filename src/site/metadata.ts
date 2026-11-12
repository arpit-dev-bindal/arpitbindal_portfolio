import { escape as e } from './html.ts';
export const siteOrigin = 'https://arpitbindal.com';
export const descriptions: Record<string, string> = {
 '/': 'Arpit Bindal builds digital products across interface design, full-stack systems, Web3, and applied AI.',
 '/work': 'Explore four detailed studies and six earlier SMDEVOPS projects by Arpit Bindal.',
 '/work/backupdata': 'BackupData: source-specific backup flows, infrastructure, backend services, SDKs, and CLI work by Arpit Bindal.',
 '/work/lighthouse': 'Lighthouse: frontend ownership, wallet integration, and smart contract integration by Arpit Bindal.',
 '/work/1mb': '1MB: independent product and Chrome extension development by Arpit Bindal.',
 '/work/turby': 'Turby: mascot design, collection generation, and launch work by Arpit Bindal.',
 '/ai-systems': 'Explore Arpit Bindal’s work with agent memory, automation, RAG, LoRA, voice systems, and MCP services.',
 '/journey': 'Follow Arpit Bindal’s education, SMDEVOPS work, Lighthouse roles, public contributions, and current AI work.',
 '/about': 'Learn about Arpit Bindal’s responsibilities, product work, leadership, and education.',
 '/contact': 'Contact Arpit Bindal about engineering and technical leadership roles through email and professional profiles.',
};
export const shareName = (path: string) => path === '/' ? 'home' : path.slice(1).replaceAll('/', '-');
export function metadata(path: string, title: string, contact: { github: string; linkedin: string }) {
 const description = descriptions[path];
 if (!description) return '<meta name="robots" content="noindex,nofollow"><meta name="description" content="This address does not match a portfolio page.">';
 const url = siteOrigin + path;
 const image = `${siteOrigin}/social/${shareName(path)}.png`;
 const name = `${title} | Arpit Bindal`;
 const person = { '@type':'Person', '@id':`${siteOrigin}/#person`, name:'Arpit Bindal', url:siteOrigin+'/', sameAs:[contact.github, contact.linkedin] };
 const data = { '@context':'https://schema.org', ...(path === '/' ? person : { '@type':path.startsWith('/work/') ? 'CreativeWork' : 'WebPage', name, description, url, ...(path.startsWith('/work/') ? { author:{ '@id':person['@id'] } } : {}) }) };
 return `<meta name="robots" content="noindex,nofollow"><meta name="description" content="${e(description)}"><link rel="canonical" href="${e(url)}"><meta property="og:type" content="website"><meta property="og:site_name" content="Arpit Bindal"><meta property="og:title" content="${e(name)}"><meta property="og:description" content="${e(description)}"><meta property="og:url" content="${e(url)}"><meta property="og:image" content="${e(image)}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${e(title)} — Arpit Bindal portfolio"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${e(name)}"><meta name="twitter:description" content="${e(description)}"><meta name="twitter:image" content="${e(image)}"><script type="application/ld+json">${JSON.stringify(data).replaceAll('<','\\u003c')}</script>`;
}
