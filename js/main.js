// Typing animation functionality
function initTypingAnimation() {
  const typingText = document.getElementById('typing-text');
  if (!typingText) return;
  
  const texts = [
    "Front End Developer..",
    "Software Engineering Student..",
    "Graphic Designer.."
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  let deletingSpeed = 50;
  let pauseTime = 1500;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      // Deleting text
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = deletingSpeed;
    } else {
      // Typing text
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    // Check if we've finished typing the current text
    if (!isDeleting && charIndex === currentText.length) {
      // Pause at the end before starting to delete
      isDeleting = true;
      typingSpeed = pauseTime;
    } else if (isDeleting && charIndex === 0) {
      // Move to the next text after deleting
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500; // Pause before starting next text
    }
    
    setTimeout(type, typingSpeed);
  }
  
  // Start the typing animation after a short delay
  setTimeout(type, 1000);
}

// CTA Typing Animation
function initCTATypingAnimation() {
  const ctaTypingText = document.getElementById('cta-typing-text');
  if (!ctaTypingText) return;
  
  const ctaTexts = [
    "Start a project..?",
    "Collaborate?",
    "Hire me..?",
    "Talk more..?"
  ];
  
  let ctaTextIndex = 0;
  let ctaCharIndex = 0;
  let ctaIsDeleting = false;
  let ctaTypingSpeed = 100;
  let ctaDeletingSpeed = 50;
  let ctaPauseTime = 2000;
  
  function typeCTA() {
    const currentText = ctaTexts[ctaTextIndex];
    
    if (ctaIsDeleting) {
      // Deleting text
      ctaTypingText.textContent = currentText.substring(0, ctaCharIndex - 1);
      ctaCharIndex--;
      ctaTypingSpeed = ctaDeletingSpeed;
    } else {
      // Typing text
      ctaTypingText.textContent = currentText.substring(0, ctaCharIndex + 1);
      ctaCharIndex++;
      ctaTypingSpeed = 100;
    }
    
    // Check if we've finished typing the current text
    if (!ctaIsDeleting && ctaCharIndex === currentText.length) {
      // Pause at the end before starting to delete
      ctaIsDeleting = true;
      ctaTypingSpeed = ctaPauseTime;
    } else if (ctaIsDeleting && ctaCharIndex === 0) {
      // Move to the next text after deleting
      ctaIsDeleting = false;
      ctaTextIndex = (ctaTextIndex + 1) % ctaTexts.length;
      ctaTypingSpeed = 500; // Pause before starting next text
    }
    
    setTimeout(typeCTA, ctaTypingSpeed);
  }
  
  // Start the CTA typing animation after a short delay
  setTimeout(typeCTA, 2000);
}

// Image lazy loading
function initLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.1
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Initialize all main functionality
document.addEventListener('DOMContentLoaded', function() {
  initTypingAnimation();
  initCTATypingAnimation();
  initLazyLoading();
});