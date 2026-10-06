const sw = document.getElementById('themeSwitch');
const root = document.documentElement;
sw.checked = root.dataset.theme === 'dark';
sw.addEventListener('change', () => {
  const t = sw.checked ? 'dark' : 'light';
  root.dataset.theme = t;
  try { localStorage.setItem('theme', t); } catch (e) {}
});
