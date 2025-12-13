// Theme toggle functionality
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('#mobile-theme-toggle, #desktop-theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Get theme from localStorage or system preference
  const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  
  themeToggleBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      });
    }
  });
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initTheme);