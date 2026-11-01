# WEDE PRINTS — Website Project

## Student Information
| Field | Details |
|---|---|
| **Student Name** | Deoget de Klerk |
| **Student Number** | ST10526431 |
| **Group** | DINM |
| **Subject** | Web Development Introduction |
| **Institution** | Rosebank International |

---

## Project Overview
WEDE PRINTS is a fictional small printing company based in Pretoria, South Africa. This project involves designing and developing a fully functional multi-page website for the organisation as part of a web development portfolio of evidence (POE).

The website is built using vanilla HTML5, CSS3, and JavaScript — no frameworks — and is hosted via GitHub Pages.

---

## Website Goals and Objectives
- Establish a professional online presence for WEDE PRINTS
- Showcase all printing services offered by the organisation
- Enable customers to submit quote requests through an online enquiry form
- Provide clear contact information and branch locations
- Generate new customer leads and increase brand visibility in Pretoria

### Key Performance Indicators (KPIs)
- Number of enquiry form submissions per month
- Website traffic and unique visitor count
- Average time spent on the services page
- Social media referral traffic

---

## Key Features & Functionality
- **Homepage** — Hero section, service overview cards, about strip with stats, and call-to-action
- **About Page** — Company history, mission and vision statements, team member profiles
- **Services Page** — Four core services with images, descriptions, and pricing
- **Enquiry Page** — Full quote request form with service type, quantity, deadline, and artwork fields
- **Contact Page** — Two branch locations with maps, contact details, and a general contact form
- Sticky navigation bar across all pages
- Fully mobile-responsive layout
- Form validation via JavaScript
- Consistent black and yellow branding throughout

---

## Sitemap
```
WEDE PRINTS Website
│
├── index.html          → Homepage
├── about.html          → About Us
├── services.html       → Services & Pricing
├── enquiry.html        → Quote Request Form
└── contact.html        → Contact & Locations
```

---

## File & Folder Structure
```
WEDE-PRINTS/
├── index.html
├── about.html
├── services.html
├── enquiry.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── print-printer.jpg
│   ├── print-palette.jpg
│   ├── print-tshirts.jpg
│   ├── print-sml-printer.jpg
│   └── print-workshop.jpg
└── README.md
```

---

## Timeline and Milestones
| Week | Milestone |
|---|---|
| Week 1 | Research, proposals, and lecturer approval |
| Week 1 | Content sourcing and file organisation |
| Week 2 | HTML pages created and content integrated |
| Week 2 | Navigation linking, testing, and debugging |
| Week 3 | GitHub commits and README update |
| Week 4 | Final review and submission |

---

## Part 1 Details
- Two website project proposals written for two fictional organisations (WEDE PRINTS and WEDE COMBAT)
- Content researched and sourced from free, legal resources (Unsplash)
- Five HTML pages created with correct folder structure
- Navigation system implemented and tested across all pages
- GitHub repository set up with commit messages

---

## Changelog

| Version | Date | Files Changed | Description |
|---|---|---|---|
| v1.0 | 08/08/26 | All files | Part 1: Created the initial project structure (css/, js/, images/ folders) and five HTML pages (index, about, services, enquiry, contact), each with a header, nav, main and footer. Linked all pages through a consistent navigation menu and added code comments. |
| v1.1 | 08/08/26 | README.md | Part 1: Completed the README with project overview, goals and KPIs, features, sitemap, folder structure, timeline and references. |
| v1.2 | 08/08/26 | wireframes/wireframes.html | Part 1 feedback fix: Added low-fidelity wireframes for all 5 pages, showing the layout and information hierarchy of the navbar, hero, content sections, forms and footer. The wireframes were missing from the Part 1 submission. |
| v1.3 | 10/09/26 | css/style.css | Part 2: Added a tablet breakpoint (max-width: 1024px) that changes the service cards and team grid to 2 columns, reduces the hero heading size, and adjusts the footer, service block and form spacing. This sits between the desktop styles and the existing 768px mobile breakpoint. |
| v1.4 | 10/09/26 | index.html, about.html, services.html | Part 2: Added srcset and sizes attributes to all img tags so the browser can choose an image size based on screen width, improving loading on smaller devices. |
| v1.5 | 10/09/26 | screenshots/ | Part 2: Tested the site with Chrome DevTools device mode at desktop, tablet and mobile sizes, and added screenshot evidence. |
| v1.6 | 10/09/26 | README.md | Part 2: Added the Part 2 section, new changelog entries and updated references. Moved the project into the wedeprintsv2 repository. |
| v1.7 | 30/10/26 | README.md | Part 3 feedback fix: Rewrote the changelog with a detailed entry for every change (version, date, files affected and description), because Part 2 feedback noted it had too few updates. |
| v1.8 | 30/10/26 | index.html, about.html, services.html, enquiry.html, contact.html | Part 3: On-page SEO. Wrote unique title tags and meta descriptions for each page, added keywords (Pretoria printing, custom T-shirts, business cards) to headings and body text, improved image alt text, and added internal links between pages. |
| v1.10 | 31/10/26 | images/, all HTML files | Part 3: Compressed and resized all images, added loading="lazy" to below-the-fold images and defer to the main.js script tag to improve page speed. |
| v1.13 | 01/11/26 | services.html, about.html, index.html, js/interactive.js, css/style.css | Part 3: Added a FAQ accordion on the services page, a gallery with a JavaScript-built lightbox modal on the about page (closes with ×, Escape or background click), and scroll-triggered fade-in animations using IntersectionObserver. Added matching styles, responsive gallery breakpoints and a prefers-reduced-motion rule. |
| v1.14 | 01/11/26 | services.html, data/services.json, js/services.js, css/style.css | Part 3: Added dynamic content. Services are stored in data/services.json and loaded with fetch(). Visitors can search by keyword, filter by category and sort by name, price or turnaround without a page reload. Cards are built with DOM methods, and a fallback message appears if the data fails to load or no results match. |
| v1.15 | 01/11/26 | enquiry.html, js/enquiry.js, js/main.js, css/style.css | Part 3: Rebuilt the enquiry form as a real HTML form with an action attribute and HTML5 validation attributes. Added client-side JavaScript validation (names, email, South African phone format, past-date check, description length) with inline error messages, AJAX submission using fetch() to a test API, and a response showing an estimated cost with bulk discount, turnaround time and deadline availability. Removed the old handleSubmit function from main.js. |
| v1.16 | 01/11/26 | contact.html, js/contact.js, js/main.js, css/style.css | Part 3: Rebuilt the contact form as a real HTML form with an action attribute and HTML5 validation attributes. Added a phone number field and a message type dropdown. Client-side JavaScript validates name, email, optional SA phone number, message type, subject and message length with inline error messages. Once valid, the data is compiled into an email addressed to the selected branch (cbd@, east@ or info@wedeprints.co.za) with a preview, an Open in Email App button (mailto link) and a Copy Email Text fallback. Removed the old handleContactSubmit function from main.js. |
| v1.17 | 01/11/26 | README.md, contact.html, index.html | Part 3: Off-page and local SEO. Documented the backlink, social media and local SEO strategy in the README. Added LocalBusiness structured data (JSON-LD) for both branches to the contact page and Open Graph / Twitter Card tags to the homepage. |
| v1.18 | 01/11/26 | index.html, about.html, services.html, enquiry.html, contact.html | Part 3: Security. Added a Content Security Policy meta tag to all pages that restricts scripts, styles, fonts, images, network requests and form targets to trusted sources (own files, unpkg for Leaflet, OpenStreetMap tiles, Google Fonts, test API). |
| v1.19 | 01/11/26 | robots.txt, sitemap.xml, index.html, contact.html | Part 3: Deployed the site on Netlify and replaced the placeholder URLs in robots.txt, sitemap.xml, the structured data and the Open Graph tags with the live address. |
| v1.20 | 01/11/26 | README.md | Part 3: Added the Part 3 section (feedback fix, JavaScript features, forms, SEO, performance and security, testing), the live site link and the updated references list. |
---

## Part 2 Details
- Implemented tablet breakpoint at 1024px for responsive layout
- Added srcset and sizes attributes to all images for responsive loading
- Added low-fidelity wireframes for all 5 pages (Part 1 feedback fix)
- Tested website on desktop, tablet, and mobile using Chrome developer tools
- Screenshot evidence added to screenshots/ folder

## Part 3: Off-Page SEO and Local SEO

Note: WEDE PRINTS is a fictional organisation, so the off-page activities below are documented as an implementation plan. The on-site local SEO elements (structured data, social sharing tags) have been built into the website.

### Backlink Strategy
- Local business directories: list both branches on Pretoria-focused directories such as Yep.co.za, Brabys and Hotfrog South Africa, using identical business details on every listing.
- Supplier and partner links: ask paper, ink and garment suppliers to link to WEDE PRINTS from their "customers" or "stockists" pages.
- Community links: offer discounted printing to local schools, sports clubs and NPOs in return for a mention and link on their websites.
- Content outreach: publish short guides (for example, "How to prepare artwork for print") that other sites can reference and link to.
- Quality over quantity: only relevant, local or industry-related sites are targeted. Paid or spam links are avoided because search engines penalise them.

### Social Media Promotion
- Platforms: Instagram and WhatsApp Business (already used by the business) plus a Facebook business page.
- Content plan: before-and-after photos of finished jobs, behind-the-scenes shots from the print floor, customer T-shirt and banner projects, and monthly specials.
- Every post and profile bio links back to the website, and the enquiry page is the main call to action.
- Open Graph and Twitter Card meta tags were added to the homepage so shared links display a proper title, description and image.

### Local SEO
- Google Business Profile: create one profile per branch (Pretoria CBD and Pretoria East) with matching name, address and phone number, opening hours, photos and the website link.
- NAP consistency: the business Name, Address and Phone number are identical on the website, Google Business Profile, directories and social media.
- Local keywords: "printing in Pretoria", "custom T-shirt printing Pretoria", "business cards Pretoria" are used in titles, headings and body text.
- Structured data: LocalBusiness schema (JSON-LD) was added to the contact page, listing both branches with addresses, phone numbers, opening hours and map coordinates.
- Reviews: after each completed job customers are asked to leave a Google review, and all reviews are answered.
- The embedded interactive map and separate branch details on the contact page support location-based searches.

## Part 3: Enhancing Functionality and SEO

**Live website:** [LIVE URL]
**Deployed on:** Netlify (connected to this repository, so every push updates the live site)

### Part 2 Feedback
Part 2 feedback noted that the changelog had too few updates. The changelog has been rewritten with a detailed entry for every change, including the date, files affected and a full description.

### JavaScript Enhancements
- Interactive map (Leaflet + OpenStreetMap) showing both branches with popups and fly-to buttons (js/map.js)
- FAQ accordion on the services page (js/interactive.js)
- Image gallery with a lightbox modal built with DOM manipulation (js/interactive.js)
- Scroll-triggered fade-in animations using IntersectionObserver and CSS transitions (js/interactive.js)
- Dynamic services list loaded from data/services.json with fetch(), with search, category filter and sorting (js/services.js)

### Forms
- **Enquiry form:** validates all fields, submits with AJAX (fetch) to a test API, and returns an estimated cost with bulk discount, turnaround time and deadline availability (js/enquiry.js)
- **Contact form:** validates all fields, then compiles the message into an email addressed to the chosen branch, with a preview, a mailto link and a copy fallback (js/contact.js)
- Both forms use HTML5 validation attributes, JavaScript validation with inline error messages, and a form action attribute

### SEO
- Unique title tags and meta descriptions on every page, a single H1 per page with H2/H3 structure, keyword-rich content, descriptive alt text and file names, and internal links
- robots.txt and sitemap.xml
- LocalBusiness structured data (JSON-LD), Open Graph and Twitter Card tags
- Off-page and local SEO strategy (see the section above)

### Performance and Security
- Images compressed and resized, lazy loading, deferred scripts
- Content Security Policy, rel="noopener noreferrer" on external links, referrer policy, and no inline event handlers
- Limitation: GitHub and Netlify static hosting means the CSP is set through a meta tag rather than HTTP headers

### Testing
The live site was tested on desktop, tablet and mobile in Chrome and Edge, and all forms, the map, the price list and the navigation were checked.
---

## References
- WEDE PRINTS — Original fictional content created for this projects
v1.2 | 2025 | Added wireframes folder with low-fidelity wireframes for all 5 pages following Part 1 feedback
- Chrome DevTools. (2026). Simulate mobile devices with device mode. Retrieved from https://developer.chrome.com/docs/devtools/device-mode
- Leaflet. (n.d.). Leaflet: an open-source JavaScript library for interactive maps. https://leafletjs.com
- OpenStreetMap contributors. (n.d.). OpenStreetMap copyright. https://www.openstreetmap.org/copyright
- JSONPlaceholder. (n.d.). Free fake API for testing and prototyping. https://jsonplaceholder.typicode.com
- MDN Web Docs. (n.d.). Fetch API. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- MDN Web Docs. (n.d.). Intersection Observer API. https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- MDN Web Docs. (n.d.). Content Security Policy (CSP). https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
- Google Search Central. (n.d.). SEO starter guide. https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Schema.org. (n.d.). LocalBusiness. https://schema.org/LocalBusiness
- TinyPNG. (n.d.). Smart PNG and JPEG compression. https://tinypng.com
- Netlify. (n.d.). Netlify documentation. https://docs.netlify.com