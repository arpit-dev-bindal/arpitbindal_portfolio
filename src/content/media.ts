// Visitor media that Arpit supplies. An empty value renders a labelled slot on the landing page.
export type Talk = { youtubeId: string; title: string; note: string; start?: number };
export type Photo = { src: string; alt: string; width: number; height: number; focus?: string };

export const media = {
  // Cut-out portrait for the hero, served from public/portrait/. Example: '/portrait/hero.webp'
  portrait: '/portrait/editorial.webp' as string | null,
  // Recorded sessions from ETHGlobal New Delhi. Source: links supplied on 10 November 2026.
  talks: {
    'ethglobal-2025': [
      { youtubeId: 'OmWDBflPDCM', title: 'Building the data layer for AI', note: 'Workshop with Rishikesh Kale and Abhay U', start: 8 },
      { youtubeId: 'b1tve67WoC8', title: 'Filecoin Onchain Cloud workshop', note: 'Lighthouse segment: permanent storage and access control' },
    ],
  } as Record<string, Talk[]>,
  // Crop of the ETHGlobal New Delhi speakers and judges page. Source: https://ethglobal.com/events/newdelhi#speakers
  proof: {
    'ethglobal-2025': { src: '/events/ethglobal-newdelhi-judge.png', alt: 'ETHGlobal New Delhi page listing Arpit Bindal of Lighthouse Storage.', width: 240, height: 266, caption: 'Listed on ethglobal.com', href: 'https://ethglobal.com/events/newdelhi#speakers' },
  } as Record<string, Photo & { caption: string; href: string }>,
  // Event photographs supplied by Arpit.
  photos: {
    'ethindia-2023': [
      { src: '/events/ethindia-bangalore-desk.jpg', alt: 'Arpit Bindal sits at the Lighthouse desk and talks with a participant at ETHIndia in Bangalore.', width: 1448, height: 1086, focus: '50% 40%' },
      { src: '/events/ethindia-bangalore-banner.jpg', alt: 'Arpit Bindal stands beside the Lighthouse banner at ETHIndia in Bangalore.', width: 1086, height: 1448, focus: '70% 32%' },
    ],
    'ethglobal-2024': [
      { src: '/events/fil-bangkok-desk.jpg', alt: 'Arpit Bindal talks with visitors at the Lighthouse desk at FIL Bangkok.', width: 1280, height: 853 },
      { src: '/events/fil-bangkok-team.jpg', alt: 'Five people stand beside the Lighthouse banner at FIL Bangkok.', width: 1280, height: 960 },
      { src: '/events/fil-bangkok-booth.jpg', alt: 'Visitors gather at the Lighthouse booth at FIL Bangkok.', width: 900, height: 1200 },
    ],
  } as Record<string, Photo[]>,
  photoCaption: { 'ethindia-2023': 'At the Lighthouse desk', 'ethglobal-2024': 'At the Lighthouse booth' } as Record<string, string>,
};
