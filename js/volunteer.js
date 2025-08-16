// Basic file upload interaction
document.getElementById('file-upload').addEventListener('change', function(e) {
    const label = document.querySelector('.file-upload-label');
    if (this.files.length > 0) {
        label.innerHTML = `
            <div class="file-upload-icon text-success">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="text-center">
                <h5 class="mb-1">${this.files.length} file(s) selected</h5>
                <p class="small mb-0">Click to change files</p>
            </div>
        `;
    }
});

// Enhanced file upload functionality
document.addEventListener('DOMContentLoaded', function() {
    const fileUpload = document.getElementById('file-upload');
    const filePreview = document.getElementById('file-preview');
    
    if (fileUpload && filePreview) {
        fileUpload.addEventListener('change', function(e) {
            const files = Array.from(this.files);
            
            if (files.length > 0) {
                filePreview.innerHTML = '';
                filePreview.classList.add('active');
                
                files.forEach((file, index) => {
                    const fileItem = document.createElement('div');
                    fileItem.className = 'file-upload-preview-item';
                    
                    const fileSize = (file.size / 1024 / 1024).toFixed(2);
                    const fileExtension = file.name.split('.').pop().toUpperCase();
                    
                    fileItem.innerHTML = `
                        <div class="file-info">
                            <i class="fas fa-file-${getFileIcon(file.type)} file-icon"></i>
                            <div>
                                <div class="file-name">${file.name}</div>
                                <div class="file-size">${fileSize} MB • ${fileExtension}</div>
                            </div>
                        </div>
                        <button type="button" class="file-remove" data-index="${index}">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                    
                    filePreview.appendChild(fileItem);
                });
                
                // Add remove functionality
                filePreview.querySelectorAll('.file-remove').forEach(button => {
                    button.addEventListener('click', function() {
                        const index = parseInt(this.dataset.index);
                        const dt = new DataTransfer();
                        const files = Array.from(fileUpload.files);
                        
                        files.forEach((file, i) => {
                            if (i !== index) {
                                dt.items.add(file);
                            }
                        });
                        
                        fileUpload.files = dt.files;
                        
                        // Re-render preview
                        const event = new Event('change');
                        fileUpload.dispatchEvent(event);
                    });
                });
            } else {
                filePreview.classList.remove('active');
                filePreview.innerHTML = '';
            }
        });
    }
    
    // Helper function to determine file icon based on file type
    function getFileIcon(fileType) {
        if (fileType.includes('image')) return 'image';
        if (fileType.includes('pdf')) return 'pdf';
        if (fileType.includes('word') || fileType.includes('document')) return 'word';
        if (fileType.includes('excel') || fileType.includes('sheet')) return 'excel';
        if (fileType.includes('text')) return 'alt';
        return 'file';
    }
    
    // Form validation enhancement
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                // Show validation message
                const alertDiv = document.createElement('div');
                alertDiv.className = 'alert alert-danger alert-dismissible fade show';
                alertDiv.innerHTML = `
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    Please fill in all required fields.
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                `;
                
                form.insertBefore(alertDiv, form.firstChild);
                
                // Auto-dismiss alert after 5 seconds
                setTimeout(() => {
                    if (alertDiv.parentNode) {
                        alertDiv.remove();
                    }
                }, 5000);
            }
        });
    }
    
    // Age validation
    const ageInput = document.querySelector('input[name="age"]');
    if (ageInput) {
        ageInput.addEventListener('input', function() {
            const age = parseInt(this.value);
            if (age < 16) {
                this.setCustomValidity('Minimum age requirement is 16 years');
            } else {
                this.setCustomValidity('');
            }
        });
    }
    
    // Phone number validation
    const phoneInput = document.querySelector('input[name="phone"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            const phone = this.value.replace(/\D/g, '');
            if (phone.length < 10) {
                this.setCustomValidity('Please enter a valid 10-digit phone number');
            } else {
                this.setCustomValidity('');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }, observerOptions);
    
    // Observe benefit cards
    document.querySelectorAll('.benefit-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe form card
    const formCard = document.querySelector('.form-card');
    if (formCard) {
        observer.observe(formCard);
    }
});
