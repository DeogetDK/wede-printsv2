// ============================================================
// WEDE PRINTS — Main JavaScript
// Handles: form submissions, nav active state
// ============================================================

// ---- Enquiry form submit handler ----
// Shows a success message when the enquiry form is submitted
function handleSubmit() {
  // Get required fields
  var firstName = document.getElementById('first-name');
  var email = document.getElementById('email');
  var serviceType = document.getElementById('service-type');
  var description = document.getElementById('description');

  // Basic validation — check required fields are filled
  if (!firstName.value || !email.value || !serviceType.value || !description.value) {
    alert('Please fill in all required fields before submitting.');
    return;
  }

  // Show success message and hide the form button
  var successMsg = document.getElementById('success-message');
  if (successMsg) {
    successMsg.style.display = 'block';
  }
}

// ---- Contact form submit handler ----
// Shows a success message when the contact form is submitted
function handleContactSubmit() {
  // Get required fields
  var name = document.getElementById('contact-name');
  var email = document.getElementById('contact-email');
  var subject = document.getElementById('contact-subject');
  var message = document.getElementById('contact-message');

  // Basic validation
  if (!name.value || !email.value || !subject.value || !message.value) {
    alert('Please fill in all required fields before submitting.');
    return;
  }

  // Show success message
  var successMsg = document.getElementById('contact-success');
  if (successMsg) {
    successMsg.style.display = 'block';
  }
}

// ---- Navbar scroll effect ----
// Adds a subtle shadow to the navbar when the user scrolls down
window.addEventListener('scroll', function () {
  var navbar = document.querySelector('.navbar');
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 2px 12px rgba(0,0,0,0.3)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});
