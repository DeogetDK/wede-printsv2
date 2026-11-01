// ============================================================
// WEDE PRINTS: Interactive features
// Accordion, lightbox gallery and scroll animations.
// Each feature checks that its elements exist, so this one file
// can safely be loaded on any page.
// ============================================================

// ---------- 1. FAQ ACCORDION ----------
document.querySelectorAll('.accordion__header').forEach(function (header) {
  header.addEventListener('click', function () {
    var panel = header.nextElementSibling;
    var isOpen = header.getAttribute('aria-expanded') === 'true';

    // Close every other panel so only one is open at a time
    document.querySelectorAll('.accordion__header').forEach(function (other) {
      other.setAttribute('aria-expanded', 'false');
      other.nextElementSibling.style.maxHeight = null;
      other.querySelector('.accordion__icon').textContent = '+';
    });

    // Open this panel if it was closed
    if (!isOpen) {
      header.setAttribute('aria-expanded', 'true');
      panel.style.maxHeight = panel.scrollHeight + 'px';
      header.querySelector('.accordion__icon').textContent = '−';
    }
  });
});

// ---------- 2. GALLERY LIGHTBOX ----------
var galleryItems = document.querySelectorAll('.gallery__item img');

if (galleryItems.length > 0) {
  // Build the lightbox overlay with DOM manipulation
  var lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-label', 'Image viewer');

  var lightboxImg = document.createElement('img');
  lightboxImg.className = 'lightbox__img';

  var closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'lightbox__close';
  closeBtn.setAttribute('aria-label', 'Close image viewer');
  closeBtn.textContent = '×';

  lightbox.appendChild(lightboxImg);
  lightbox.appendChild(closeBtn);
  document.body.appendChild(lightbox);

  function openLightbox(img) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('lightbox--open');
  }

  function closeLightbox() {
    lightbox.classList.remove('lightbox--open');
  }

  galleryItems.forEach(function (img) {
    img.parentElement.addEventListener('click', function () { openLightbox(img); });
  });

  closeBtn.addEventListener('click', closeLightbox);
  // Clicking the dark background (not the image) also closes it
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) { closeLightbox(); }
  });
  // Escape key closes it
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeLightbox(); }
  });
}

// ---------- 3. SCROLL-IN ANIMATIONS ----------
// Elements fade and slide up the first time they scroll into view.
// The class is added by JavaScript, so if JS fails nothing is hidden.
var revealTargets = document.querySelectorAll('.card, .team-card, .service-block, .location-card, .gallery__item');

if ('IntersectionObserver' in window) {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(function (el) {
    el.classList.add('reveal');
    observer.observe(el);
  });
}