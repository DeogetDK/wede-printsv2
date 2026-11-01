// ============================================================
// WEDE PRINTS: Dynamic services list
// Loads products from data/services.json using fetch(), then
// lets the visitor search, filter and sort them without
// reloading the page.
// ============================================================

var grid = document.getElementById('product-grid');

// Only run on pages that have the product grid
if (grid) {
  var searchInput = document.getElementById('service-search');
  var categorySelect = document.getElementById('service-category');
  var sortSelect = document.getElementById('service-sort');
  var countEl = document.getElementById('result-count');
  var allServices = [];

  // ---- Load the data ----
  fetch('data/services.json')
    .then(function (response) {
      if (!response.ok) { throw new Error('HTTP ' + response.status); }
      return response.json();
    })
    .then(function (data) {
      allServices = data;
      buildCategoryOptions();
      render();
    })
    .catch(function (error) {
      console.error('Could not load services:', error);
      grid.textContent = 'Sorry, we could not load the price list right now. Please try again later or contact us.';
    });

  // ---- Fill the category dropdown from the data ----
  function buildCategoryOptions() {
    var seen = [];
    allServices.forEach(function (s) {
      if (seen.indexOf(s.category) === -1) {
        seen.push(s.category);
        var option = document.createElement('option');
        option.value = s.category;
        option.textContent = s.category;
        categorySelect.appendChild(option);
      }
    });
  }

  // ---- Filter, sort and draw the cards ----
  function render() {
    var term = searchInput.value.trim().toLowerCase();
    var category = categorySelect.value;

    // 1. Filter by search text and category
    var results = allServices.filter(function (s) {
      var matchesText = s.name.toLowerCase().indexOf(term) !== -1 ||
                        s.description.toLowerCase().indexOf(term) !== -1;
      var matchesCategory = category === 'all' || s.category === category;
      return matchesText && matchesCategory;
    });

    // 2. Sort
    var sortBy = sortSelect.value;
    results.sort(function (a, b) {
      if (sortBy === 'price-asc') { return a.price - b.price; }
      if (sortBy === 'price-desc') { return b.price - a.price; }
      if (sortBy === 'turnaround') { return a.turnaround - b.turnaround; }
      return a.name.localeCompare(b.name);
    });

    // 3. Draw (textContent is used instead of innerHTML for safety)
    grid.textContent = '';
    results.forEach(function (s) { grid.appendChild(buildCard(s)); });

    countEl.textContent = results.length === 0
      ? 'No products match your search. Try a different word or category.'
      : 'Showing ' + results.length + ' of ' + allServices.length + ' products';
  }

  // ---- Build one product card with DOM manipulation ----
  function buildCard(s) {
    var card = document.createElement('article');
    card.className = 'product-card';

    var cat = document.createElement('span');
    cat.className = 'product-card__category';
    cat.textContent = s.category;

    var title = document.createElement('h3');
    title.textContent = s.name;

    var desc = document.createElement('p');
    desc.textContent = s.description;

    var meta = document.createElement('p');
    meta.className = 'product-card__meta';
    meta.textContent = 'From R' + s.price + ' ' + s.unit + '  |  ' + s.turnaround + ' day turnaround';

    var link = document.createElement('a');
    link.href = 'enquiry.html';
    link.className = 'btn btn--primary';
    link.textContent = 'Get a Quote';

    card.appendChild(cat);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(meta);
    card.appendChild(link);
    return card;
  }

  // ---- Re-render whenever the visitor changes something ----
  searchInput.addEventListener('input', render);
  categorySelect.addEventListener('change', render);
  sortSelect.addEventListener('change', render);
}