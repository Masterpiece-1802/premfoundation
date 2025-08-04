// ===== PREMANGAN PAYMENT CONFIGURATION ===== //
const PREMANGAN_CONFIG = {
  razorpayKey: 'rzp_test_5gCzTH1GxIb9R7',
  googleSheetsUrl: 'https://script.google.com/macros/s/AKfycbxMPJoPL88i7bH2dtNsLp4qCiF_u2hsW-2mn1PiIbGvuegzHklQHdWpvgVrwD7P2sqH/exec',
  roomPrices: {
    "Private Room": 25000,
    "Shared Room": 10000
  }
};

// ===== NUCLEAR PAYMENT HANDLER ===== //
async function handlePremanganPayment(formData) {
  const button = document.getElementById('proceedToPayment');
  const originalText = button.innerHTML;
  
  try {
    // Show loading state
    button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Processing...';
    button.disabled = true;

    // Nuclear validation - ensure all required fields are present
    const requiredFields = ['name', 'email', 'phone', 'age', 'medical', 'roomType'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Validate age
    if (parseInt(formData.age) < 60) {
      throw new Error('Resident must be at least 60 years old');
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      throw new Error('Please enter a valid email address');
    }

    const amount = PREMANGAN_CONFIG.roomPrices[formData.roomType];
    if (!amount) {
      throw new Error('Invalid room type selected');
    }

    // Initialize Razorpay options
    const options = {
      key: PREMANGAN_CONFIG.razorpayKey,
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      name: 'Prem Foundation - Premangan',
      description: `Premangan Admission - ${formData.roomType}`,
      image: 'images/logo.jpg',
      handler: async function(response) {
        try {
          // Prepare data for Google Sheets
          const payload = {
            type: 'premangan',
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            amount: amount,
            paymentId: response.razorpay_payment_id,
            status: 'success',
            purpose: `Premangan Admission - ${formData.roomType}`,
            room_name: formData.roomType,
            pan: '',
            details: JSON.stringify({
              age: formData.age,
              medical: formData.medical
            })
          };

          // Send to Google Sheets
          const sheetsResponse = await fetch(PREMANGAN_CONFIG.googleSheetsUrl, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
          });

          if (!sheetsResponse.ok) {
            throw new Error('Failed to save details');
          }

          const result = await sheetsResponse.json();
          if (result.status !== 'success') {
            throw new Error('Server validation failed');
          }

          // Redirect to thank you page with payment details
          window.location.href = `thankyou.html?payment_id=${response.razorpay_payment_id}&amount=${amount}&purpose=Premangan Admission - ${formData.roomType}`;
          
        } catch (error) {
          console.error('Save error:', error);
          button.innerHTML = originalText;
          button.disabled = false;
          alert('Payment successful but failed to save details. Please contact support with payment ID: ' + 
                response.razorpay_payment_id);
        }
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone
      },
      notes: {
        resident_age: formData.age,
        medical_info: formData.medical.substring(0, 255) // Razorpay has length limit
      },
      theme: { 
        color: '#1e40af',
        hide_topbar: false
      },
      modal: {
        ondismiss: function() {
          button.innerHTML = originalText;
          button.disabled = false;
        }
      }
    };

    // Create Razorpay instance and open checkout
    const rzp = new Razorpay(options);
    rzp.open();

  } catch (error) {
    console.error('Payment initialization error:', error);
    button.innerHTML = originalText;
    button.disabled = false;
    
    // Show validation errors on form fields
    if (error.message.includes('Missing required fields')) {
      const form = document.getElementById('admissionForm');
      form.classList.add('was-validated');
    } else {
      alert('Error: ' + error.message);
    }
  }
}

// ===== NUCLEAR FORM INITIALIZATION ===== //
document.addEventListener('DOMContentLoaded', function() {
  const premanganForm = document.getElementById('admissionForm');
  if (!premanganForm) return;

  // Form submission handler
  premanganForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Check form validity
    if (!this.checkValidity()) {
      e.stopPropagation();
      this.classList.add('was-validated');
      return;
    }
    
    // Collect form data
    const formData = {
      name: document.getElementById('residentName').value.trim(),
      email: document.getElementById('applicantEmail').value.trim(),
      phone: document.getElementById('applicantPhone').value.trim(),
      age: document.getElementById('residentAge').value,
      medical: document.getElementById('medicalHistory').value.trim(),
      roomType: document.querySelector('input[name="roomType"]:checked').value
    };
    
    handlePremanganPayment(formData);
  });

  // Real-time validation
  premanganForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', function() {
      if (this.checkValidity()) {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
      } else {
        this.classList.remove('is-valid');
        this.classList.add('is-invalid');
      }
    });
  });
});