import { legacyDestination } from './legacy-routes.ts';
const migrate = () => {
 const target = legacyDestination(location.pathname, location.hash);
 if (target === null) return;
 const destination = new URL(target, location.origin);
 destination.search = location.search;
 location.replace(destination.href);
};
migrate();
window.addEventListener('hashchange', migrate);
