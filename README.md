# SpeedNet Internet Solutions

Website for **SpeedNet Internet Solutions** — fiber broadband in **Igatpuri & Ghoti**, Nashik district, Maharashtra.

📞 Call / WhatsApp: **+91 81491 95597**

## Files

| File | What it is |
|---|---|
| `index.html` | All page content (plans, coverage, FAQ, contact) |
| `styles.css` | Design and layout |
| `script.js` | PIN check, plan price toggle, download-time table, reviews slider, mobile menu |

## Editing

- **Plans & prices:** search for `class="plans"` in `index.html`. Each price has `data-m` (monthly) and `data-y` (yearly).
- **Covered PIN codes:** edit `towns` in `script.js` (currently `422403` Igatpuri, `422402` Ghoti).
- **Reviews:** edit `reviews` in `script.js` and the first review in `index.html` (currently samples — replace with real customer reviews).
- After changing CSS or JS, bump the `?v=` number on the `<link>` / `<script>` tags in `index.html` so browsers load the new version.

## Run locally

```bash
python -m http.server 5500
```

Then open http://localhost:5500.
