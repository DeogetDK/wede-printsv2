// ============================================================
// WEDE PRINTS: Enquiry form
// 1. Validates every field on the client side
// 2. Submits the data with AJAX (fetch) without a page reload
// 3. Shows an estimated cost and availability response
// ============================================================

var form = document.getElementById('enquiry-form');

if (form) {
  var resultBox = document.getElementById('enquiry-result');
  var submitBtn = document.getElementById('enquiry-submit');

  // ---- Pricing data used for the quote estimate ----
  var services = {
    commercial: { label: 'Commercial Printing',  rate: 1.5, unit: 'item', days: 3 },
    tshirts:    { label: 'Custom T-Shirt Printing', rate: 120, unit: 'shirt', days: 3 },
    banners:    { label: 'Banners & Signage',    rate: 350, unit: 'banner', days: 3 },
    stationery: { label: 'Business Stationery',  rate: 0.8, unit: 'item', days: 2 }
  };

  // Typical quantity for each range (used to estimate the total)
  var quantities = { '1-50': 25, '51-100': 75, '101-500': 300, '500+': 600 };

  // ---- Validation rules: each returns an error message or '' ----
  var rules = {
    'first-name': function (v) {
      if (!v) { return 'Please enter your first name.'; }
      if (!/^[A-Za-z\u00C0-\u017F' -]{2,}$/.test(v)) { return 'Use letters only, at least 2 characters.'; }
      return '';
    },
    'last-name': function (v) {
      if (!v) { return 'Please enter your last name.'; }
      if (!/^[A-Za-z\u00C0-\u017F' -]{2,}$/.test(v)) { return 'Use letters only, at least 2 characters.'; }
      return '';
    },
    'email': function (v) {
      if (!v) { return 'Please enter your email address.'; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { return 'Enter a valid email, e.g. name@example.com.'; }
      return '';
    },
    'phone': function (v) {
      if (!v) { return 'Please enter your phone number.'; }
      var digits = v.replace(/\s/g, '');
      if (!/^(\+27|0)[0-9]{9}$/.test(digits)) { return 'Enter a valid SA number, e.g. 012 345 6789 or +27 12 345 6789.'; }
      return '';
    },
    'service-type': function (v) { return v ? '' : 'Please choose a service.'; },
    'quantity':     function (v) { return v ? '' : 'Please choose a quantity range.'; },
    'deadline': function (v) {
      if (!v) { return ''; } // optional
      var chosen = new Date(v);
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      return chosen < today ? 'The deadline cannot be in the past.' : '';
    },
    'description': function (v) {
      if (!v) { return 'Please describe your project.'; }
      if (v.length < 20) { return 'Please give us a little more detail (at least 20 characters).'; }
      if (v.length > 500) { return 'Please keep it under 500 characters.'; }
      return '';
    }
  };

  // ---- Show or clear an error message under a field ----
  function setError(field, message) {
    var errorId = field.id + '-error';
    var errorEl = document.getElementById(errorId);

    if (!errorEl) {
      errorEl = document.createElement('p');
      errorEl.id = errorId;
      errorEl.className = 'form__error';
      field.parentElement.appendChild(errorEl);
    }

    errorEl.textContent = message;
    field.classList.toggle('input--invalid', message !== '');
    field.setAttribute('aria-invalid', message !== '' ? 'true' : 'false');
    if (message) { field.setAttribute('aria-describedby', errorId); }
  }

  function validateField(field) {
    var rule = rules[field.id];
    if (!rule) { return true; }
    var message = rule(field.value.trim());
    setError(field, message);
    return message === '';
  }

  function validateAll() {
    var firstInvalid = null;
    Object.keys(rules).forEach(function (id) {
      var field = document.getElementById(id);
      if (!validateField(field) && !firstInvalid) { firstInvalid = field; }
    });
    if (firstInvalid) { firstInvalid.focus(); }
    return firstInvalid === null;
  }

  // Validate each field when the visitor leaves it, and re-check while fixing
  Object.keys(rules).forEach(function (id) {
    var field = document.getElementById(id);
    field.addEventListener('blur', function () { validateField(field); });
    field.addEventListener('input', function () {
      if (field.classList.contains('input--invalid')) { validateField(field); }
    });
  });

  // ---- Build the cost and availability response ----
  function buildQuote(data) {
    var box = document.createElement('div');
    var heading = document.createElement('h3');
    heading.textContent = 'Thank you, ' + data.firstName + '! Your enquiry has been received.';
    box.appendChild(heading);

    var ref = document.createElement('p');
    ref.className = 'form-result__ref';
    ref.textContent = 'Reference: WP-' + String(Date.now()).slice(-6);
    box.appendChild(ref);

    var service = services[data.service];
    var lines = [];

    if (service && quantities[data.quantity]) {
      var qty = quantities[data.quantity];
      var total = service.rate * qty;
      var discount = 0;
      if (qty >= 500) { discount = 0.2; } else if (qty >= 100) { discount = 0.1; }
      total = total * (1 - discount);

      lines.push('Service: ' + service.label);
      lines.push('Estimated cost: about R' + Math.round(total).toLocaleString('en-ZA') +
        (discount ? ' (includes a ' + (discount * 100) + '% bulk discount)' : ''));
      lines.push('Standard turnaround: ' + service.days + ' to ' + (service.days + 2) + ' business days');

      // Availability check against the requested deadline
      if (data.deadline) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        var daysLeft = Math.ceil((new Date(data.deadline) - today) / 86400000);
        if (daysLeft >= service.days + 2) {
          lines.push('Availability: your deadline is achievable with standard turnaround.');
        } else if (daysLeft >= 1) {
          lines.push('Availability: your deadline is tight. A rush fee may apply and we will confirm by phone.');
        } else {
          lines.push('Availability: same-day printing depends on workload. Please call us on 012 345 6789.');
        }
      } else {
        lines.push('Availability: we can start as soon as your artwork is approved.');
      }
      lines.push('This is an estimate only. A final quote will be emailed to ' + data.email + ' within 24 hours.');
    } else {
      lines.push('Because the service or quantity is not yet confirmed, we will prepare a custom quote.');
      lines.push('A team member will email ' + data.email + ' within 24 hours.');
    }

    var list = document.createElement('ul');
    lines.forEach(function (text) {
      var li = document.createElement('li');
      li.textContent = text;
      list.appendChild(li);
    });
    box.appendChild(list);
    return box;
  }

  // ---- Handle submission with AJAX ----
  form.addEventListener('submit', function (event) {
    event.preventDefault();                 // stop the normal page reload
    resultBox.hidden = true;

    if (!validateAll()) { return; }         // stop if any field is invalid

    var data = {
      firstName: document.getElementById('first-name').value.trim(),
      lastName: document.getElementById('last-name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      service: document.getElementById('service-type').value,
      quantity: document.getElementById('quantity').value,
      deadline: document.getElementById('deadline').value,
      description: document.getElementById('description').value.trim(),
      artwork: document.getElementById('artwork').value
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        if (!response.ok) { throw new Error('Server responded with ' + response.status); }
        return response.json();
      })
      .then(function () {
        resultBox.textContent = '';
        resultBox.className = 'form-result form-result--success';
        resultBox.appendChild(buildQuote(data));
        resultBox.hidden = false;
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        form.reset();
      })
      .catch(function (error) {
        console.error('Enquiry failed:', error);
        resultBox.textContent = 'Sorry, something went wrong sending your enquiry. Please try again or call us on 012 345 6789.';
        resultBox.className = 'form-result form-result--error';
        resultBox.hidden = false;
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Enquiry';
      });
  });
}