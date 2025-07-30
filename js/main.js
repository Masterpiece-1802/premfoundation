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

// Razorpay Payment Handler
document.getElementById('proceedToPayment').addEventListener('click', function() {
    const form = document.getElementById('admissionForm');
    if (form.checkValidity()) {
        // Get form data
        const formData = {
            name: document.getElementById('residentName').value,
            age: document.getElementById('residentAge').value,
            email: document.getElementById('applicantEmail').value,
            medical: document.getElementById('medicalHistory').value,
            roomType: document.querySelector('input[name="roomType"]:checked').value,
            amount: document.querySelector('input[name="roomType"]:checked').value === "Private Room" ? 2500000 : 1000000 // in paise
        };

        // Store form data temporarily
        sessionStorage.setItem('premanganAdmission', JSON.stringify(formData));

        // Initialize Razorpay
        const options = {
            key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your key
            amount: formData.amount,
            currency: 'INR',
            name: 'Prem Foundation',
            description: 'Premangan Admission Fee',
            image: 'images/logo.jpg',
            handler: function(response) {
                // On successful payment
                submitAdmissionForm(formData, response.razorpay_payment_id);
            },
            prefill: {
                name: formData.name,
                email: formData.email
            },
            theme: {
                color: '#4361ee'
            }
        };
        
        const rzp = new Razorpay(options);
        rzp.open();
    } else {
        form.reportValidity();
    }
});

// Submit to Google Sheets after payment
function submitAdmissionForm(formData, paymentId) {
    const submitBtn = document.getElementById('proceedToPayment');
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
    submitBtn.disabled = true;

    const payload = {
        ...formData,
        paymentId: paymentId,
        timestamp: new Date().toISOString()
    };

    fetch('https://script.google.com/macros/s/AKfycbz5XNuPgvE6retHHHVC7mDH9sxcfMfvP4zAn6YbEZK6hTFEExq2BIGhxMcfT8DT55gj/exec', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            window.location.href = 'thank-you.html'; // Create this page
        } else {
            throw new Error('Submission failed');
        }
    })
    .catch(error => {
        alert('Error: ' + error.message);
        submitBtn.innerHTML = '<i class="fas fa-credit-card me-2"></i> Try Payment Again';
        submitBtn.disabled = false;
    });
}