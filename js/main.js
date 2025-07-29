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

// Initialize lightbox for facility images
function initFacilityLightbox() {
    // Load fslightbox script dynamically if not already loaded
    if (!document.querySelector('script[src*="fslightbox"]')) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fslightbox/3.3.1/index.min.js';
        document.body.appendChild(script);
    }
}

// Add to your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    initFacilityLightbox();
    // ... keep your existing code
});

// Form Validation and Handling
function initPremanganForms() {
    // Quick Inquiry Form
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (this.checkValidity()) {
                // Form submission logic (replace with actual submission)
                alert('Thank you! Our team will contact you within 24 hours.');
                this.reset();
                this.classList.remove('was-validated');
            } else {
                e.stopPropagation();
                this.classList.add('was-validated');
            }
        }, false);
    }

    // Admission Form
    const admissionForm = document.getElementById('admissionForm');
    if (admissionForm) {
        admissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Simulate form processing
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Processing...';
            
            setTimeout(() => {
                alert('Application submitted successfully! We will contact you to complete the admission process.');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initPremanganForms();
    // Keep existing functions
});

// Gallery Management
function initGallery() {
    const galleryGrid = document.getElementById('premanganGallery');
    
    // Sample gallery data (replace with admin-loaded content)
    const sampleGallery = [
        { img: 'images/premangan/gallery/activity1.jpg', caption: 'Yoga Session' },
        { img: 'images/premangan/gallery/activity2.jpg', caption: 'Festival Celebration' },
        { img: 'images/premangan/gallery/facility1.jpg', caption: 'Dining Area' }
    ];
    
    // Render gallery
    function renderGallery(images) {
        galleryGrid.innerHTML = images.map(img => `
            <div class="col-lg-4 col-md-6">
                <div class="gallery-item">
                    <img src="${img.img}" alt="${img.caption}" class="gallery-img">
                    <div class="gallery-caption">${img.caption}</div>
                </div>
            </div>
        `).join('');
    }
    
    // Simulate loading
    setTimeout(() => renderGallery(sampleGallery), 1000);
    
    // Admin upload functionality
    const uploadForm = document.getElementById('galleryUploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const files = document.getElementById('galleryUpload').files;
            if (files.length > 0) {
                // Simulate upload (replace with actual API call)
                simulateUpload(files);
            }
        });
    }
}

function simulateUpload(files) {
    const progressBar = document.querySelector('.progress-bar');
    const uploadProgress = document.querySelector('.upload-progress');
    const uploadCount = document.querySelector('.upload-count');
    const totalFiles = document.querySelector('.total-files');
    
    totalFiles.textContent = files.length;
    uploadProgress.style.display = 'block';
    
    let uploaded = 0;
    const interval = setInterval(() => {
        uploaded++;
        uploadCount.textContent = uploaded;
        progressBar.style.width = `${(uploaded/files.length)*100}%`;
        
        if (uploaded === files.length) {
            clearInterval(interval);
            setTimeout(() => {
                alert(`${files.length} photos uploaded successfully!`);
                uploadProgress.style.display = 'none';
                progressBar.style.width = '0%';
            }, 500);
        }
    }, 300);
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    // Keep existing functions
});