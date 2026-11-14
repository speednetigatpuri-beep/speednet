(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  /* ---------- Nav ---------- */
  const nav = $("#nav");
  const burger = $("#burger");
  const links = $("#navLinks");
  const onScroll = () => nav.classList.toggle("is-stuck", scrollY > 60);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const setMenu = (open) => {
    links.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => setMenu(!links.classList.contains("is-open")));
  $$("a", links).forEach((a) => a.addEventListener("click", () => setMenu(false)));

  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      $$(".nav__links a").forEach((a) => a.classList.toggle("is-on", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  $$("main section[id]").forEach((s) => spy.observe(s));

  /* ---------- Reveal ---------- */
  const targets = [".numbers > div", ".plan", ".use", ".why__list li", ".row", ".town", ".partners", ".contact__card", ".contact__map", ".faq__list details", ".cta", ".head", ".why__side", ".calc__intro"];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  const addReveal = (el) => {
    const sibs = [...el.parentElement.children].filter((c) => c.classList.contains("rv") || c.matches(targets.join(",")));
    const i = Math.max(0, sibs.indexOf(el));
    el.classList.add("rv");
    el.style.transitionDelay = `${Math.min(i, 5) * 70}ms`;
    el.addEventListener("transitionend", () => (el.style.transitionDelay = ""), { once: true });
    io.observe(el);
  };
  $$(targets.join(",")).forEach(addReveal);

  /* ---------- Clients logo marquee ---------- */
  // Duplicate the set once so the CSS animation (translateX -50%) loops seamlessly.
  const track = $("#clientsTrack");
  if (track) {
    const originals = [...track.children];
    originals.forEach((li) => {
      const copy = li.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      $$("img", copy).forEach((img) => (img.alt = ""));
      track.appendChild(copy);
    });
    // keep a steady ~40px/s speed whatever the screen size
    const setDur = () => track.style.setProperty("--dur", `${Math.round(track.scrollWidth / 2 / 40)}s`);
    setDur();
    addEventListener("load", setDur);
    let rt;
    addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(setDur, 200); });
  }

  /* ---------- PIN check (demo logic) ---------- */
  const pinForm = $("#check");
  const pinInput = $("#pinInput");
  const pinResult = $("#pinResult");
  if (pinForm && pinInput && pinResult) {
  pinInput.addEventListener("input", () => (pinInput.value = pinInput.value.replace(/\D/g, "").slice(0, 6)));
  pinForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const v = pinInput.value;
    if (!/^[1-9]\d{5}$/.test(v)) {
      pinForm.classList.remove("shake"); void pinForm.offsetWidth; pinForm.classList.add("shake");
      pinResult.innerHTML = `<span class="err">Please enter a 6‑digit PIN code.</span>`;
      return;
    }
    pinResult.textContent = "Checking…";
    await wait(500);
    const towns = { "422403": "Igatpuri", "422402": "Ghoti" };
    const wa = (msg) => `https://wa.me/919422214143?text=${encodeURIComponent(msg)}`;
    pinResult.innerHTML = towns[v]
      ? `<span class="ok"><b>Yes — we serve ${towns[v]} (${v}).</b></span> <a class="ul" href="${wa(`Hi SpeedNet, I want a new connection in ${towns[v]} (${v}).`)}" target="_blank" rel="noopener">WhatsApp us your address</a> or call <a class="ul" href="tel:+919422214143">+91 94222 14143</a> to book installation.`
      : `<span class="soon"><b>We don't cover ${v} yet.</b></span> <a class="ul" href="${wa(`Hi SpeedNet, is internet available at PIN ${v}?`)}" target="_blank" rel="noopener">Send us your location on WhatsApp</a> — we're expanding nearby.`;
  });
  }

  /* ---------- Use-case rail arrows ---------- */
  const rail = $("#usesRail");
  if (rail) $$("[data-scroll]").forEach((b) => b.addEventListener("click", () => {
    const card = rail.querySelector(".use");
    rail.scrollBy({ left: (card.offsetWidth + 12) * +b.dataset.scroll, behavior: "smooth" });
  }));

  /* ---------- Download-time table ---------- */
  const items = [
    { what: "HD movie", size: 4 },
    { what: "Mobile game update", size: 8 },
    { what: "New PC game", size: 60 },
    { what: "Phone backup", size: 64 },
  ];
  const COPPER = 15; // typical mobile hotspot
  const fmt = (s) => {
    if (s < 60) return `${Math.max(1, Math.round(s))} sec`;
    if (s < 3600) return `${Math.round(s / 60)} min`;
    const h = Math.floor(s / 3600), m = Math.round((s % 3600) / 60);
    return m ? `${h} hr ${m} min` : `${h} hr`;
  };
  const table = $("#calcTable");
  if (table) {
  table.innerHTML =
    `<div class="row row--head"><span>Download</span><span>SpeedNet</span><span>Hotspot, 15 Mbps</span></div>` +
    items.map((it) => `<div class="row"><div class="row__what"><b>${it.what}</b><span>${it.size} GB</span></div><div class="row__us" data-us></div><div class="row__them">${fmt((it.size * 8000) / (COPPER * 0.9))}</div></div>`).join("");

  const setSpeed = (mbps) => {
    $$(".row:not(.row--head)", table).forEach((row, i) => {
      $("[data-us]", row).textContent = fmt((items[i].size * 8000) / (mbps * 0.94));
    });
  };
  $$(".speeds button").forEach((b) => b.addEventListener("click", () => {
    $$(".speeds button").forEach((x) => x.setAttribute("aria-checked", String(x === b)));
    setSpeed(+b.dataset.mbps);
  }));
  setSpeed(200);
  }

  const yr = $("#yr");
  if (yr) yr.textContent = new Date().getFullYear();
})();
