document.addEventListener('DOMContentLoaded', function() {
    // Counter Animation
    const animateCounter = () => {
        const counter = document.querySelector('.counter');
        if (!counter) return;
        
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // Animation duration in ms
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const value = Math.floor(progress * target);
            
            counter.textContent = value.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        requestAnimationFrame(updateCounter);
    };

    // Initialize counter when visible
    const counterObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounter();
            counterObserver.unobserve(entries[0].target);
        }
    }, { threshold: 0.5 });

    const counterSection = document.querySelector('.counter-section');
    if (counterSection) {
        counterObserver.observe(counterSection);
    }

    // Navbar scroll effect
    // Floating Navbar with Dynamic Transparency
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  const scrollPosition = window.scrollY;
  
  // More transparent when near top
  if (scrollPosition < 100) {
    navbar.style.backdropFilter = 'blur(12px)';
    navbar.style.backgroundColor = 'rgba(30, 15, 45, 0.85)';
  } 
  // More glass-like when scrolled
  else {
    navbar.classList.add('scrolled');
    const opacity = 0.7 - Math.min(scrollPosition / 1000, 0.3);
    navbar.style.backgroundColor = `rgba(20, 15, 45, ${opacity})`;
    navbar.style.backdropFilter = 'blur(16px)';
  }
});

// Smooth hover effects
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });
});

// Add debounce to scroll event for better performance
function debounce(func, wait = 100) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

window.addEventListener('scroll', debounce(function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}));


document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('.prem-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate elements when they come into view
    const premAnimateOnScroll = () => {
        const elements = document.querySelectorAll('.prem-trust-badge, .prem-link, .prem-contact-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state
    document.querySelectorAll('.prem-trust-badge, .prem-link, .prem-contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run once on load
    premAnimateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', premAnimateOnScroll);

    // Add click effect to buttons
    document.querySelectorAll('.prem-call-button, .prem-whatsapp-button, .prem-email-button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('prem-ripple-effect');
            
            // Get click position
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Position ripple
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Add and remove ripple
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1000);
        });
    });
});

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements
    const slides = document.querySelectorAll('.slide');
    const thumbs = document.querySelectorAll('.thumb');
    let currentSlide = 0;
    let slideInterval;
    
    // Initialize slider
    function initSlider() {
        if (slides.length > 0) {
            slides[0].classList.add('active');
            thumbs[0].classList.add('active');
            startSlideShow();
        }
    }
    
    // Start autoplay
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 6000);
    }
    
    // Go to specific slide
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        thumbs[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        thumbs[currentSlide].classList.add('active');
    }
    
    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Navigation arrows
    document.querySelector('.next-btn').addEventListener('click', function() {
        clearInterval(slideInterval);
        nextSlide();
        startSlideShow();
    });
    
    document.querySelector('.prev-btn').addEventListener('click', function() {
        clearInterval(slideInterval);
        prevSlide();
        startSlideShow();
    });
    
    // Thumbnail click
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            clearInterval(slideInterval);
            goToSlide(index);
            startSlideShow();
        });
    });
    
    // Create particles
    function createParticles() {
        const particlesContainer = document.querySelector('.particles');
        const particleCount = 20;
        
        // Clear existing particles
        particlesContainer.innerHTML = '';
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
            const size = Math.random() * 6 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 15 + 15;
            const opacity = Math.random() * 0.3 + 0.1;
            
            // Apply styles
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.opacity = opacity;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            // Random shape
            if (Math.random() > 0.7) {
                particle.style.borderRadius = '0';
                particle.style.transform = `rotate(${Math.random() * 360}deg)`;
            }
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Full screen gallery
    const modal = document.querySelector('.gallery-modal');
    const modalSlidesContainer = document.querySelector('.modal-slides');
    const modalCaption = document.querySelector('.modal-caption');
    
    // Prepare modal slides (defensive: some slides may be video previews)
    try {
        if (modalSlidesContainer) {
            slides.forEach((slide, index) => {
                const modalSlide = document.createElement('div');
                modalSlide.className = 'modal-slide';
                if (index === 0) modalSlide.classList.add('active');

                const imgEl = slide.querySelector('img');
                const captionEl = slide.querySelector('.slide-caption');

                if (imgEl) {
                    const img = document.createElement('img');
                    img.src = imgEl.src;
                    img.alt = `Gallery Image ${index + 1}`;
                    modalSlide.appendChild(img);
                } else {
                    // handle video slide: try to copy the video source or leave placeholder
                    const vid = slide.querySelector('video');
                    const dataVideo = slide.querySelector('[data-video]') ? slide.querySelector('[data-video]').getAttribute('data-video') : null;
                    const src = (vid && (vid.currentSrc || vid.src)) || dataVideo;
                    if (src) {
                        const v = document.createElement('video');
                        v.src = src;
                        v.controls = true;
                        v.className = 'w-100';
                        modalSlide.appendChild(v);
                    } else {
                        // fallback empty element
                        const placeholder = document.createElement('div');
                        placeholder.textContent = '';
                        modalSlide.appendChild(placeholder);
                    }
                }

                modalSlidesContainer.appendChild(modalSlide);
            });
        }
    } catch (err) {
        console.warn('Error preparing modal slides (skipped):', err);
    }
    
    // Open modal
    slides.forEach((slide, index) => {
        slide.addEventListener('click', function() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Set active slide
            const modalSlides = document.querySelectorAll('.modal-slide');
            modalSlides.forEach(s => s.classList.remove('active'));
            modalSlides[index].classList.add('active');
            modalCaption.textContent = slide.querySelector('.slide-caption').textContent;
        });
    });
    
    // Close modal
    document.querySelector('.close-modal').addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Modal navigation
    let modalCurrent = 0;
    const modalSlides = document.querySelectorAll('.modal-slide');
    
    function showModalSlide(n) {
        modalSlides.forEach(s => s.classList.remove('active'));
        modalCurrent = (n + modalSlides.length) % modalSlides.length;
        modalSlides[modalCurrent].classList.add('active');
        modalCaption.textContent = slides[modalCurrent].querySelector('.slide-caption').textContent;
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowRight') {
                showModalSlide(modalCurrent + 1);
            } else if (e.key === 'ArrowLeft') {
                showModalSlide(modalCurrent - 1);
            } else if (e.key === 'Escape') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // Initialize when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initSlider();
                createParticles();
                
                // Animate floating badges
                const badges = document.querySelectorAll('.badge-item');
                badges.forEach((badge, i) => {
                    setTimeout(() => {
                        badge.style.transform = 'translateY(-5px)';
                        badge.style.opacity = '1';
                    }, i * 200);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(document.querySelector('.journey-section'));
});
// JavaScript - Updated Particle Creation
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 30; // Increased number of particles
    
    // Clear existing particles
    particlesContainer.innerHTML = '';
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 8 + 3; // Larger particles
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 20 + 10; // Longer duration
        const opacity = Math.random() * 0.5 + 0.3; // More visible
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = opacity;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Add occasional different shapes
        if (Math.random() > 0.8) {
            particle.style.borderRadius = '0';
            particle.style.transform = `rotate(${Math.random() * 360}deg)`;
            particle.style.boxShadow = '0 0 15px 3px rgba(212, 175, 55, 0.5)';
        }
        
        particlesContainer.appendChild(particle);
    }
}

// Rest of the JavaScript remains the same as previous version










// Project Filtering
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-buttons .btn');
    const projectItems = document.querySelectorAll('.projects-grid [data-category]');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter projects
                const filter = button.dataset.filter;
                projectItems.forEach(item => {
                    item.classList.remove('show');
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.classList.add('show');
                    }
                });
            });
        });
        
        // Show all projects initially
        document.querySelector('.filter-buttons .btn[data-filter="all"]').click();
    }
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initProjectFilters();
    // Keep your existing counter and scroll code
});

