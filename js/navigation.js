// Navigation Active State
function initNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage ||
      (linkHref === 'index.html' && currentPage === '') ||
      (linkHref.includes(currentPage.replace('.html', '')))) {
      link.classList.add('active');
    }
    
    link.addEventListener('click', function() {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', initNavigation);