// Projects page functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-button');
  const projectCards = document.querySelectorAll('.project-card');
  const projectsGrid = document.getElementById('projects-grid');
  const paginationContainer = document.getElementById('pagination-container');
  
  if (!filterButtons.length || !projectCards.length) return;
  
  const projectsPerPage = 4;
  let currentPage = 1;
  let currentFilter = 'all';
  let filteredProjects = [];
  
  // Initialize pagination and filtering
  function initializePagination() {
    // Get filtered projects
    filteredProjects = Array.from(projectCards).filter(card => {
      return currentFilter === 'all' || card.getAttribute('data-category').includes(currentFilter);
    });
    
    // Calculate total pages
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
    
    // Generate pagination buttons
    generatePagination(totalPages);
    
    // Show first page
    showPage(1);
  }
  
  // Generate pagination buttons
  function generatePagination(totalPages) {
    if (!paginationContainer) return;
    
    paginationContainer.innerHTML = '';
    
    if (totalPages <= 1) return;
    
    // Previous button
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&lt;';
    prevButton.className = 'pagination-button px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-text-light dark:text-text-dark font-medium hover:bg-primary hover:text-white transition-all';
    prevButton.setAttribute('aria-label', 'Previous page');
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        showPage(currentPage - 1);
      }
    });
    paginationContainer.appendChild(prevButton);
    
    // Page number buttons
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.className = `pagination-button px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-text-light dark:text-text-dark font-medium hover:bg-primary hover:text-white transition-all ${i === currentPage ? 'active' : ''}`;
      pageButton.setAttribute('aria-label', `Page ${i}`);
      pageButton.addEventListener('click', () => showPage(i));
      paginationContainer.appendChild(pageButton);
    }
    
    // Next button
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&gt;';
    nextButton.className = 'pagination-button px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-text-light dark:text-text-dark font-medium hover:bg-primary hover:text-white transition-all';
    nextButton.setAttribute('aria-label', 'Next page');
    nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        showPage(currentPage + 1);
      }
    });
    paginationContainer.appendChild(nextButton);
  }
  
  // Show specific page
  function showPage(page) {
    currentPage = page;
    
    // Calculate start and end indices
    const startIndex = (page - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    
    // Hide all projects first
    projectCards.forEach(card => {
      card.style.display = 'none';
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
    });
    
    // Show projects for current page
    const currentProjects = filteredProjects.slice(startIndex, endIndex);
    
    currentProjects.forEach((card, index) => {
      setTimeout(() => {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      }, index * 100);
    });
    
    // Update pagination buttons
    updatePaginationButtons();
    
    // Scroll to top of projects section
    if (projectsGrid) {
      projectsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  // Update pagination button states
  function updatePaginationButtons() {
    const paginationButtons = paginationContainer.querySelectorAll('.pagination-button');
    paginationButtons.forEach((button, index) => {
      if (index === 0) return; // Skip prev button
      if (index === paginationButtons.length - 1) return; // Skip next button
      
      const pageNumber = parseInt(button.textContent);
      if (pageNumber === currentPage) {
        button.classList.add('active');
        button.setAttribute('aria-current', 'page');
      } else {
        button.classList.remove('active');
        button.removeAttribute('aria-current');
      }
    });
  }
  
  // Filter projects
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.removeAttribute('aria-pressed');
      });
      
      // Add active class to clicked button
      this.classList.add('active');
      this.setAttribute('aria-pressed', 'true');
      
      currentFilter = this.getAttribute('data-filter');
      currentPage = 1;
      initializePagination();
    });
  });
  
  // Initialize on page load
  initializePagination();
  
  // Add fade-in animations for project cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  projectCards.forEach(card => {
    observer.observe(card);
  });
});