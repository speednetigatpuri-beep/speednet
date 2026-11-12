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
  const targets = [".numbers > div", ".plan", ".use", ".why__list li", ".row", ".town", ".area__map", ".faq__list details", ".cta", ".head", ".why__side", ".review__photo", ".review__body", ".calc__intro"];
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

  // plan dials animate when the grid enters
  const plans = $(".plans");
  new IntersectionObserver((entries, o) => {
    if (entries[0].isIntersecting) { plans.classList.add("is-in"); o.disconnect(); }
  }, { threshold: 0.3 }).observe(plans);

  /* ---------- PIN check (demo logic) ---------- */
  const pinForm = $("#check");
  const pinInput = $("#pinInput");
  const pinResult = $("#pinResult");
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
    const wa = (msg) => `https://wa.me/918149195597?text=${encodeURIComponent(msg)}`;
    pinResult.innerHTML = towns[v]
      ? `<span class="ok"><b>Yes — we serve ${towns[v]} (${v}).</b></span> <a class="ul" href="${wa(`Hi SpeedNet, I want a new connection in ${towns[v]} (${v}).`)}" target="_blank" rel="noopener">WhatsApp us your address</a> or call +91 81491 95597 to book installation.`
      : `<span class="soon"><b>We don't cover ${v} yet.</b></span> <a class="ul" href="${wa(`Hi SpeedNet, is internet available at PIN ${v}?`)}" target="_blank" rel="noopener">Send us your location on WhatsApp</a> — we're expanding nearby.`;
  });

  /* ---------- Billing toggle ---------- */
  $$(".seg button").forEach((btn) => btn.addEventListener("click", () => {
    $$(".seg button").forEach((b) => b.setAttribute("aria-selected", String(b === btn)));
    const k = btn.dataset.bill;
    $$(".price__amt").forEach((el) => (el.textContent = el.dataset[k]));
    $$(".price__per").forEach((el) => (el.textContent = k === "y" ? "/month, billed yearly" : "/month"));
  }));

  /* ---------- Use-case rail arrows ---------- */
  const rail = $("#usesRail");
  $$("[data-scroll]").forEach((b) => b.addEventListener("click", () => {
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

  /* ---------- Reviews (SAMPLE — replace with real customer reviews) ---------- */
  const reviews = [
    {
      q: "“We both work from home and the kids have online classes. Since we switched to SpeedNet, nobody fights over the Wi‑Fi any more.”",
      n: "Priya &amp; Sachin", m: "Family plan · Igatpuri",
      img: "https://images.unsplash.com/photo-1665827488591-ddd6775bca13?w=800&q=75",
    },
    {
      q: "“The engineer set everything up and showed us how to video call our grandson. When the line stopped once, they came the same evening.”",
      n: "Ramesh &amp; Sunita", m: "Basic plan · Ghoti",
      img: "https://images.unsplash.com/photo-1758686254501-afb794642cf3?w=800&q=75",
    },
    {
      q: "“No more lag in online matches, even in the rain. And when I need help, I just WhatsApp them.”",
      n: "Omkar", m: "Pro plan · Igatpuri",
      img: "https://images.unsplash.com/photo-1758687126783-ea42f92dad72?w=800&q=75",
    },
  ];
  let ri = 0;
  const showReview = async (dir) => {
    ri = (ri + dir + reviews.length) % reviews.length;
    const r = reviews[ri];
    const els = [$("#revQuote"), $("#revImg")];
    els.forEach((el) => el.classList.add("is-swapping"));
    await wait(300);
    $("#revQuote").innerHTML = r.q;
    $("#revName").innerHTML = r.n;
    $("#revMeta").textContent = r.m;
    $("#revImg").src = r.img;
    $("#revCount").textContent = `${ri + 1} / ${reviews.length}`;
    els.forEach((el) => el.classList.remove("is-swapping"));
  };
  $("#revPrev").addEventListener("click", () => showReview(-1));
  $("#revNext").addEventListener("click", () => showReview(1));
  reviews.forEach((r) => { const i = new Image(); i.src = r.img; }); // preload

  $("#yr").textContent = new Date().getFullYear();
})();
