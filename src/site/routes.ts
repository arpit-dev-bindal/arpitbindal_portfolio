export const routes = [
  { path: '/', title: 'Home' },
  { path: '/work', title: 'Work' },
  { path: '/work/backupdata', title: 'BackupData' },
  { path: '/work/lighthouse', title: 'Lighthouse' },
  { path: '/work/1mb', title: '1MB' },
  { path: '/work/turby', title: 'Turby' },
  { path: '/ai-systems', title: 'AI Systems' },
  { path: '/journey', title: 'Journey' },
  { path: '/about', title: 'About' },
  { path: '/contact', title: 'Contact' },
] as const;
export const navigation = routes.filter(route => ['/work', '/ai-systems', '/journey', '/about', '/contact'].includes(route.path));
export function isCurrent(path: string, destination: string) {
  return path === destination;
}
export function isSection(path: string, destination: string) {
  return path.startsWith(`${destination}/`);
}
