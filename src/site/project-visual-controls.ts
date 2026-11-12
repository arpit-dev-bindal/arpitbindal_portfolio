const descriptions:Record<string,string>={PostgreSQL:'PostgreSQL: a custom backup flow for a database source.',DynamoDB:'DynamoDB: a custom backup flow for an AWS database source.',S3:'S3: a custom backup flow for object storage.'};
document.querySelectorAll<HTMLElement>('[data-backup-visual]').forEach(visual=>{visual.querySelectorAll<HTMLButtonElement>('[data-source]').forEach(button=>button.addEventListener('click',()=>{visual.querySelectorAll('[data-source]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));visual.querySelector<HTMLElement>('.visual-caption')!.textContent=descriptions[button.dataset.source!]!;}));});
export {};

const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.toggleAttribute('data-in-view', entry.isIntersecting)));
document.querySelectorAll('.project-visual').forEach(visual => observer.observe(visual));
