// Skills page functionality
document.addEventListener('DOMContentLoaded', function() {
  // Image Gallery
  function initGallery() {
    const galleryTrack = document.querySelector('.gallery-track');
    const galleryDots = document.querySelector('.gallery-dots');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    
    if (!galleryTrack || !galleryDots) return;
    
    // Gallery images data
    const galleryImages = [
      { src: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', alt: 'Gaming Setup' },
      { src: 'images/food.png', alt: 'Cooking' },
      { src: 'images/chart.png', alt: 'Trading Desk' },
      { src: 'images/solution.png', alt: 'Coding Environment' }
    ];
    
    let currentIndex = 0;
    let galleryInterval;
    
    // Initialize gallery
    function initGalleryItems() {
      galleryTrack.innerHTML = '';
      galleryDots.innerHTML = '';
      
      galleryImages.forEach((image, index) => {
        // Create gallery item
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
                    <img src="${image.src}" alt="${image.alt}" class="gallery-image" loading="lazy">
                `;
        galleryTrack.appendChild(galleryItem);
        
        // Create dot
        const dot = document.createElement('div');
        dot.className = `gallery-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `View image ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        galleryDots.appendChild(dot);
      });
      
      updateGallery();
    }
    
    function goToSlide(index) {
      currentIndex = index;
      updateGallery();
    }
    
    function nextSlide() {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      updateGallery();
    }
    
    function prevSlide() {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      updateGallery();
    }
    
    function updateGallery() {
      galleryTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Update dots
      document.querySelectorAll('.gallery-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Auto-advance gallery
    function startAutoAdvance() {
      galleryInterval = setInterval(nextSlide, 5000);
    }
    
    // Pause auto-advance on hover
    galleryTrack.addEventListener('mouseenter', () => clearInterval(galleryInterval));
    galleryTrack.addEventListener('mouseleave', startAutoAdvance);
    galleryTrack.addEventListener('touchstart', () => clearInterval(galleryInterval));
    galleryTrack.addEventListener('touchend', startAutoAdvance);
    
    // Initialize gallery items
    initGalleryItems();
    startAutoAdvance();
  }
  
  // Animate progress bars on scroll
  function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const width = progressBar.style.width;
          progressBar.style.width = '0%';
          
          setTimeout(() => {
            progressBar.style.transition = 'width 1.5s ease-in-out';
            progressBar.style.width = width;
          }, 100);
          
          observer.unobserve(progressBar);
        }
      });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
  }
  
  // Fade in animation on scroll
  function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }
  
  // Initialize all functionality
  initGallery();
  initProgressBars();
  initScrollAnimations();
});