const button = document.querySelector<HTMLButtonElement>('[data-copy-email]');
const status = document.getElementById('copy-status');
if (button && status) {
 button.hidden = false;
 let pending = false;
 button.addEventListener('click', async () => {
  if (pending) return;
  pending = true;
  button.setAttribute('aria-disabled', 'true');
  status.textContent = 'Copy in progress.';
  try {
   if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
   await navigator.clipboard.writeText(button.dataset.email!);
   status.textContent = 'Email address copied.';
  } catch {
   status.textContent = 'Copy failed. Select and copy the email address above.';
  } finally {
   pending = false;
   button.removeAttribute('aria-disabled');
  }
 });
}
export {};
