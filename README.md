# SpeedNet Internet Solutions

Website for **SpeedNet Internet Solutions** — fiber broadband in **Igatpuri & Ghoti**, Nashik district, Maharashtra.

📞 Call / WhatsApp: **+91 94222 14143**  
📍 Shop No. 05, Shubh Vastu Apt, Talegaon Rd, near Rohit Wines, Aswin Nagar, Igatpuri 422403

## Files

| File | What it is |
|---|---|
| `index.html` | Home page (connections, network, clients, coverage, contact, FAQ) |
| `igatpuri/index.html` | "WiFi connection in Igatpuri" page (incl. Talegaon) |
| `ghoti/index.html` | "WiFi connection in Ghoti" page (Ghoti Budruk) |
| `resort-wifi-igatpuri/index.html` | "WiFi for resorts & hotels in Igatpuri" page |
| `styles.css` | Design and layout (shared by all pages) |
| `script.js` | PIN check, clients logo carousel, download-time table, mobile menu (shared) |
| `img/` | Website photos (free-licence Unsplash photos, stored locally as WebP) |
| `brand/logos/` | Client and partner logos (taken from each company's official website or Wikimedia Commons) |
| `sitemap.xml`, `robots.txt` | For Google — submit the sitemap in Google Search Console |

## SEO

- Each page has its own location-focused title, description, H1 and FAQ, plus structured data (LocalBusiness / Service, FAQPage, Breadcrumb) so Google understands the business, address, map location and areas served.
- **Keep the business name, address and phone number exactly the same everywhere** (website, Google Business Profile, Justdial, Facebook): *SpeedNet Internet Solutions, Shop No. 05, Shubh Vastu Apt, Near Rohit Wines, Igatpuri 422403, +91 94222 14143*.
- When you add or change a page, add it to `sitemap.xml`.

## Logo

All logo files are in [`brand/`](brand/) — SVG (sharp at any size, best for printing) and PNG in [`brand/png/`](brand/png/).

| File | Use it for |
|---|---|
| `speednet-logo.png` / `.svg` | Main logo on white or light backgrounds — letterheads, bills, banners |
| `speednet-logo-dark.png` / `.svg` | On black or dark backgrounds |
| `speednet-logo-stacked*.png` / `.svg` | Square spaces — shop board, van door, flyers |
| `speednet-profile-1024.png` | WhatsApp Business / Facebook / Instagram profile picture |
| `speednet-icon-*.png` / `speednet-icon.svg` | App icon, favicon, stickers |
| `speednet-share.png` | Image shown when the website link is shared on WhatsApp/Facebook |

Colours: **Ink** `#111311` · **Lime** `#d2f34c` · **Paper** `#f4f2ec`. Fonts: Bricolage Grotesque (logo, headings) and Inter (text).

## Editing

- **Connection types:** search for `class="plans plans--3"` in `index.html`. No prices are shown — every card has Contact-on-WhatsApp and Call buttons.
- **Clients carousel:** add or remove `<li class="logo-tile">` items inside `id="clientsTrack"`. Put the logo file in `brand/logos/` and set its display height with `style="--h:40px"`. A client without a logo can use `<li class="logo-tile logo-tile--text"><b>Name</b><small>Igatpuri</small></li>`.
- **Partners:** edit the `partners__row` list in `index.html`.
- **Covered PIN codes:** edit `towns` in `script.js` (currently `422403` Igatpuri, `422402` Ghoti).
- **Customer reviews:** none are shown yet. Send real reviews to add a reviews section.
- **Area / resort pages:** each page in `igatpuri/`, `ghoti/` and `resort-wifi-igatpuri/` is plain HTML — edit the text directly. Keep the header, footer and contact block consistent with the home page.
- After changing CSS or JS, bump the `?v=` number on the `<link>` / `<script>` tags in **every** page so browsers load the new version.

## Run locally

```bash
python -m http.server 5500
```

Then open http://localhost:5500.

## Google reviews

The reviews section (`id="reviews"`) is copied by hand from the SpeedNet Google Business Profile (4.8 ★, 74 reviews at the time). To update: change the rating, review count and review cards in `index.html` **and** in the three sub pages.
