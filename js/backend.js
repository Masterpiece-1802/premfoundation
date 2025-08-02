// ========== UNIVERSAL BACKEND HANDLER ========== //
async function submitToBackend(data, successRedirect) {
    try {
        // Show loading state
        const buttons = document.querySelectorAll('.donate-btn, #proceedToPayment');
        buttons.forEach(btn => {
            btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Processing...';
            btn.disabled = true;
        });

        // Submit data
        const response = await fetch('https://script.google.com/macros/s/AKfycbwaih1blQcT55_Za5SQ-Hs7vaYuks5MSMd2q7D8BNHu4YjLLv1Od8Ni-f1Eg9wRU7clmA/exec', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...data,
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) throw new Error('Server error');
        if (successRedirect) window.location.href = successRedirect;

    } catch (error) {
        console.error('Submission error:', error);
        alert('Error: ' + error.message);
        
        // Reset buttons
        document.querySelectorAll('.donate-btn').forEach(btn => {
            btn.innerHTML = '<i class="fas fa-donate"></i> Donate Again';
            btn.disabled = false;
        });
        const admissionBtn = document.getElementById('proceedToPayment');
        if (admissionBtn) {
            admissionBtn.innerHTML = '<i class="fas fa-credit-card"></i> Try Payment Again';
            admissionBtn.disabled = false;
        }
    }
}

// ========== FORM VALIDATION ========== //
function initFormValidation() {
    // Volunteer Form
    const volForm = document.getElementById('volunteerForm');
    if (volForm) {
        volForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (this.checkValidity()) {
                submitToBackend(Object.fromEntries(new FormData(this)));
            } else {
                this.classList.add('was-validated');
            }
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (contactForm.checkValidity()) {
                submitToBackend(Object.fromEntries(new FormData(contactForm)));
            } else {
                contactForm.classList.add('was-validated');
            }
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initFormValidation);