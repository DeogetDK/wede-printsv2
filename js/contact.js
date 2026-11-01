// ============================================================
// WEDE PRINTS: Contact form
// 1. Validates the input on the client side
// 2. Compiles it into an email addressed to the chosen branch
// 3. Lets the visitor open it in their email app (or copy it)
// ============================================================

var contactForm = document.getElementById('contact-form');

if (contactForm) {
  var contactResult = document.getElementById('contact-result');

  // Recipient email addresses (set here in the code)
  var recipients = {
    cbd: 'cbd@wedeprints.co.za',
    east: 'east@wedeprints.co.za',
    either: 'info@wedeprints.co.za'
  };

  // ---- Validation rules: each returns an error message or '' ----
  var contactRules = {
    'contact-name': function (v) {
      if (!v) { return 'Please enter your full name.'; }
      if (!/^[A-Za-z\u00C0-\u017F' -]{2,}$/.test(v)) { return 'Use letters only, at least 2 characters.'; }
      return '';
    },
    'contact-email': function (v) {
      if (!v) { return 'Please enter your email address.'; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { return 'Enter a valid email, e.g. name@example.com.'; }
      return '';
    },
    'contact-phone': function (v) {
      if (!v) { return ''; } // optional
      if (!/^(\+27|0)[0-9]{9}$/.test(v.replace(/\s/g, ''))) { return 'Enter a valid SA number, e.g. 012 345 6789.'; }
      return '';
    },
    'contact-type': function (v) { return v ? '' : 'Please choose a message type.'; },
    'contact-subject': function (v) {
      if (!v) { return 'Please enter a subject.'; }
      if (v.length < 3) { return 'The subject must be at least 3 characters.'; }
      if (v.length > 100) { return 'Please keep the subject under 100 characters.'; }
      return '';
    },
    'contact-message': function (v) {
      if (!v) { return 'Please write your message.'; }
      if (v.length < 10) { return 'Your message must be at least 10 characters.'; }
      if (v.length > 1000) { return 'Please keep your message under 1000 characters.'; }
      return '';
    }
  };

  // ---- Show or clear an error message under a field ----
  function setContactError(field, message) {
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

  function validateContactField(field) {
    var message = contactRules[field.id](field.value.trim());
    setContactError(field, message);
    return message === '';
  }

  function validateContactForm() {
    var firstInvalid = null;
    Object.keys(contactRules).forEach(function (id) {
      var field = document.getElementById(id);
      if (!field) { return; }
      if (!validateContactField(field) && !firstInvalid) { firstInvalid = field; }
    });
    if (firstInvalid) { firstInvalid.focus(); }
    return firstInvalid === null;
  }

  Object.keys(contactRules).forEach(function (id) {
    var field = document.getElementById(id);
    if (!field) { console.warn('Missing field id: ' + id); return; }
    field.addEventListener('blur', function () { validateContactField(field); });
    field.addEventListener('input', function () {
      if (field.classList.contains('input--invalid')) { validateContactField(field); }
    });
  });

  // ---- Compile the validated data into an email ----
  function buildEmail(data) {
    var body =
      'Hello WEDE PRINTS,\n\n' +
      data.message + '\n\n' +
      '---\n' +
      'Message type: ' + data.type + '\n' +
      'Name: ' + data.name + '\n' +
      'Email: ' + data.email + '\n' +
      'Phone: ' + (data.phone || 'not provided') + '\n';

    return {
      to: recipients[data.branch] || recipients.either,
      subject: '[' + data.type + '] ' + data.subject,
      body: body
    };
  }

  // ---- Show the email preview with send and copy options ----
  function showPreview(email) {
    contactResult.textContent = '';
    contactResult.className = 'form-result form-result--success';

    var heading = document.createElement('h3');
    heading.textContent = 'Your email is ready to send';
    contactResult.appendChild(heading);

    var intro = document.createElement('p');
    intro.textContent = 'Check the details below, then press the button to open the email in your email app.';
    contactResult.appendChild(intro);

    var preview = document.createElement('pre');
    preview.className = 'email-preview';
    preview.textContent = 'To: ' + email.to + '\nSubject: ' + email.subject + '\n\n' + email.body;
    contactResult.appendChild(preview);

    var actions = document.createElement('div');
    actions.className = 'form-result__actions';

    // mailto link: opens the visitor's default email app
    var sendLink = document.createElement('a');
    sendLink.className = 'btn btn--primary';
    sendLink.textContent = 'Open in Email App';
    sendLink.href = 'mailto:' + email.to +
      '?subject=' + encodeURIComponent(email.subject) +
      '&body=' + encodeURIComponent(email.body);
    actions.appendChild(sendLink);

    // Fallback for computers with no email app set up
    var copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'btn btn--dark';
    copyBtn.textContent = 'Copy Email Text';
    copyBtn.addEventListener('click', function () {
      var text = 'To: ' + email.to + '\nSubject: ' + email.subject + '\n\n' + email.body;
      navigator.clipboard.writeText(text).then(function () {
        copyBtn.textContent = 'Copied!';
      }).catch(function () {
        copyBtn.textContent = 'Copy failed, select the text above';
      });
    });
    actions.appendChild(copyBtn);

    contactResult.appendChild(actions);
    contactResult.hidden = false;
    contactResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // ---- Handle submission ----
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    contactResult.hidden = true;

    if (!validateContactForm()) { return; }

    var data = {
      name: document.getElementById('contact-name').value.trim(),
      email: document.getElementById('contact-email').value.trim(),
      phone: document.getElementById('contact-phone').value.trim(),
      type: document.getElementById('contact-type').value,
      subject: document.getElementById('contact-subject').value.trim(),
      branch: document.getElementById('branch').value,
      message: document.getElementById('contact-message').value.trim()
    };

    showPreview(buildEmail(data));
  });
}