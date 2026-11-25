# SpeedNet Internet Solutions — website

Website for **SpeedNet Internet Solutions**, Igatpuri, Nashik: websites, WhatsApp and LinkedIn automation, social media management and AI automation.
Hosted on Cloudflare and published to https://speednetonline.in on every push to `main`.

📞 Call / WhatsApp: **+91 94222 14143** · ✉️ speednetigatpuri@gmail.com

The previous fiber-internet website is saved on the `archive/isp-site` branch.

## Files

| Path | What it is |
|---|---|
| `index.html` | Home: work, services, automation examples, process, FAQ, contact form (opens WhatsApp) |
| `pricing/`, `about/`, `contact/` | Pricing (quote based), About us, Contact & grievance |
| `terms/`, `privacy-policy/`, `refund-policy/`, `cancellation-policy/`, `shipping-delivery-policy/` | Policy pages for payment-gateway approval |
| `styles.css`, `script.js` | Design and small scripts shared by all pages |
| `img/` | Screenshots of client websites (Brawnepak, GOCHCK) |
| `brand/` | Logo icon, app icons and the WhatsApp/Facebook share image |
| `_redirects` | Sends old internet-site links to the new pages |
| `_headers`, `robots.txt`, `sitemap.xml` | Cloudflare headers and files for Google |

## Editing

- Every page is plain HTML. After changing `styles.css` or `script.js`, bump the `?v=` number on every page.
- Add new pages to `sitemap.xml`.

## Run locally

```bash
python -m http.server 5500
```
