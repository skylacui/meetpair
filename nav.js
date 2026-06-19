document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.querySelector('.nav-dropdown-trigger');
  const menu = document.querySelector('.nav-dropdown-menu');
  if (!trigger || !menu) return;

  trigger.addEventListener('click', () => {
    const open = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('open', !open);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
      trigger.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      trigger.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
      trigger.focus();
    }
  });
});
