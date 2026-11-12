const railLinks=[...document.querySelectorAll<HTMLAnchorElement>('.career-rail a')];
const mark=(id:string)=>{
 const entries=[...document.querySelectorAll<HTMLElement>('.journey-entry')];
 const index=entries.findIndex(entry=>entry.id===id);
 const chapter=entries.slice(0,index+1).reverse().find(entry=>railLinks.some(link=>link.hash==='#'+entry.id));
 if (!chapter) return;
 railLinks.forEach(link=>{if(link.hash==='#'+chapter.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
};
let railFrame=0;
const updateRail=()=>{
 cancelAnimationFrame(railFrame);
 railFrame=requestAnimationFrame(()=>{
  const line=innerHeight*.35;
  const entries=[...document.querySelectorAll<HTMLElement>('.journey-entry')].map(entry=>({entry,rect:entry.getBoundingClientRect()}));
  const current=entries.find(item=>item.rect.top<=line && item.rect.bottom>line) ?? entries.find(item=>item.rect.top>=line);
  if(current)mark(current.entry.id);
 });
};
if(railLinks.length){window.addEventListener('scroll',updateRail,{passive:true});window.addEventListener('resize',updateRail);window.addEventListener('pageshow',updateRail);document.fonts.ready.then(updateRail);updateRail();}
railLinks.forEach(link=>link.addEventListener('click',()=>mark(link.hash.slice(1))));
const visualObserver=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.toggleAttribute('data-in-view',entry.isIntersecting)));
document.querySelectorAll('.context-visual').forEach(visual=>visualObserver.observe(visual));
document.querySelectorAll<HTMLAnchorElement>('.study-contents a').forEach(link=>{const section=document.querySelector(link.hash);if(!section)return;new IntersectionObserver(entries=>{if(entries[0]?.isIntersecting){document.querySelectorAll('.study-contents a').forEach(a=>a.removeAttribute('aria-current'));link.setAttribute('aria-current','location');}},{rootMargin:'-10% 0px -65% 0px'}).observe(section);});
export {};
