export const legacyRoutes: Record<string, string> = {
 '#/home':'/', '#/splash':'/', '#/experience':'/journey', '#/projects':'/work', '#/education':'/about#education', '#/contact':'/contact',
};
export function legacyDestination(path: string, hash: string): string | null {
 if (path !== '/' && path !== '/index.html') return null;
 return legacyRoutes[hash] ?? null;
}
