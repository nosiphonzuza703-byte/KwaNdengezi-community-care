# Kwandengezi Community Care (Part 3)

Static website for Kwandengezi Community Care (HTML, CSS, JavaScript). Live site: https://kwandengezi-care.netlify.app (replace with your real URL, then update `sitemap.xml`, `robots.txt` and the canonical links).

## Pages
`index.html`, `about.html`, `what-we-do.html`, `get-involved.html`, `gallery.html`, `enquiry.html`, `contact.html`, `404.html`

## Part 3 features
- **Interactive elements:** FAQ accordion (about), tabs (get involved), banking-details modal (home), Leaflet map (contact), gallery lightbox (gallery), animated counters and CSS transitions.
- **Dynamic content:** latest updates built from a JavaScript array (home); search, category filter and sort for programmes (what-we-do).
- **Forms:** `enquiry.html` returns an instant answer on cost and availability; `contact.html` compiles a validated message into an email addressed to hello@kwandengezicare.org. Both use HTML5 validation attributes, JavaScript validation with inline errors and AJAX (`fetch`) submission.
- **SEO:** unique titles and meta descriptions, one H1 and logical H2s per page, descriptive file names and alt text, canonical links, Open Graph tags, JSON-LD (NGO), internal links, mobile viewport, `robots.txt`, `sitemap.xml`.
- **Page speed:** images converted from PNG to WebP (about 2.7 MB down to about 0.4 MB), lazy-loaded gallery images, deferred script, no frameworks, cache headers.
- **Security:** Content-Security-Policy, `_headers` (nosniff, frame deny, referrer policy), SRI on Leaflet, `rel="noopener noreferrer"` on external links, user input inserted as text only.

## Deploy
Netlify: drag the folder onto app.netlify.com/drop (forms are detected automatically). GitHub Pages also works.

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
