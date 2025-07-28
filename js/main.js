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
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
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

// Premangan Forms Handling
function initPremanganForms() {
    // Quick Inquiry Form
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Form handling logic
            alert('Thank you! We will contact you shortly.');
            this.reset();
        });
    }

    // Admission Form
    const admissionForm = document.getElementById('admissionForm');
    if (admissionForm) {
        admissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Validate and process
            if (confirm('Submit admission request?')) {
                alert('Application received! We will process it within 48 hours.');
                this.reset();
            }
        });
    }
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initPremanganForms();
    // Keep existing functions
});