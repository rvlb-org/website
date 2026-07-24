document.addEventListener('DOMContentLoaded', () => {
  // Custom Cursor Glow effect
  const glowCursor = document.getElementById('glow-cursor');

  document.addEventListener('mousemove', (e) => {
    // Only show glow effect on desktop to save performance
    if (window.innerWidth > 768) {
      glowCursor.style.left = e.clientX + 'px';
      glowCursor.style.top = e.clientY + 'px';
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Project Cards hover glow effect
  const cards = document.querySelectorAll('.project-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const glow = card.querySelector('.card-glow');
      glow.style.left = `${x - 75}px`; // Center the 150px glow
      glow.style.top = `${y - 75}px`;
    });
    
    card.addEventListener('mouseleave', () => {
      const glow = card.querySelector('.card-glow');
      glow.style.left = `-50px`;
      glow.style.top = `-50px`;
    });
  });

  // Intersection Observer for fade-in animations on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = `fadeIn 1s ease forwards`;
        entry.target.style.opacity = 1;
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply observer to sections
  document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = 0; // initial state
    observer.observe(section);
  });
});
