## Changelog

### Part 3 (2026-11-04)
Corrections from Part 2 feedback: *(add each point of lecturer feedback and how you fixed it here)*

Fixes found while reviewing the Part 2 code:
- `Get involved.html` and `Contact Us.html` began with `!DOCTYPE` instead of `<!DOCTYPE`; fixed.
- `What we do.html` had a duplicated closing `</body></html>`; removed.
- `index.html` had its CSS and header styles inline; moved to `css/home.css` and `css/style.css`, and the home page now uses the shared header.
- Renamed pages to clean URLs: `About.html` to `about.html`, `What we do.html` to `what-we-do.html`, `Get involved.html` to `get-involved.html`, `Contact Us.html` to `contact.html`, and updated every link.
- Renamed images to descriptive file names (`clothing-donation.webp`, `food-parcels.webp`, `children-programme.webp`, `community-clean-up.webp`).
- Filled empty icon boxes on the About and Get Involved cards; added missing H2 headings so heading levels no longer skip.

New in Part 3:
- Added `js/main.js` with accordion, tabs, modal, counters, programme search/filter/sort, lightbox, Leaflet map, form validation and AJAX.
- Added `enquiry.html` and rebuilt the contact form with labels, a message-type field and validation.
- Added a latest-updates section, "Our reach" counters and banking-details modal to the home page.
- Added cost and availability to each programme card.
- Added meta descriptions, canonical links, Open Graph tags and JSON-LD to every page.
- Added `robots.txt`, `sitemap.xml`, `404.html` and `_headers`.
- Converted images to WebP and added lazy loading.
- Added a skip link, keyboard focus styles and reduced-motion support.
- Added a Content-Security-Policy and security headers.

### 2026-10-05 (Part 2)
- Added a homepage donation callout section
- Added social media links in the homepage footer
- Added a mission banner to strengthen the homepage message
- Added a community image card to the About page
- Corrected broken HTML page filenames and links
- Created gallery and image assets for the website
- Added project documentation in this README
