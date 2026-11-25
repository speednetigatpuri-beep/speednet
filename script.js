(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const WA = "919422214143";

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
    burger.setAttribute("aria-label", open ? "Close menu" : "Menu");
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => setMenu(!links.classList.contains("is-open")));
  $$("a", links).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", (e) => {
    if (e.key === "Escape" && links.classList.contains("is-open")) { setMenu(false); burger.focus(); }
  });

  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      $$(".nav__links a").forEach((a) => a.classList.toggle("is-on", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  $$("main section[id]").forEach((s) => spy.observe(s));

  /* ---------- Automation tabs (ARIA tabs, arrow-key support) ---------- */
  const tabs = $$('[role="tab"]');
  const selectTab = (tab, focus) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      $("#" + t.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => selectTab(t));
    t.addEventListener("keydown", (e) => {
      const n = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (e.key === "Home") { e.preventDefault(); selectTab(tabs[0], true); }
      else if (e.key === "End") { e.preventDefault(); selectTab(tabs[tabs.length - 1], true); }
      else if (n) { e.preventDefault(); selectTab(tabs[(i + n + tabs.length) % tabs.length], true); }
    });
  });

  /* ---------- Reveal ---------- */
  const targets = [".tile", ".svc-list li", ".card", ".steps li", ".statement p", ".auto__head", ".faq details", ".contact", ".contact-sec__title"];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      io.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  $$(targets.join(",")).forEach((el) => {
    const sibs = [...el.parentElement.children].filter((c) => c.matches(targets.join(",")));
    el.classList.add("rv");
    el.style.transitionDelay = `${Math.min(Math.max(0, sibs.indexOf(el)), 5) * 70}ms`;
    el.addEventListener("transitionend", () => (el.style.transitionDelay = ""), { once: true });
    io.observe(el);
  });

  /* ---------- Project brief -> WhatsApp ---------- */
  const form = $("#brief");
  if (form) form.addEventListener("submit", (e) => {
    e.preventDefault();
    const err = $("#briefErr");
    const f = form.elements;
    const name = f.name.value.trim();
    if (!name) {
      err.textContent = "Please enter your name.";
      f.name.focus();
      return;
    }
    err.textContent = "";
    const biz = f.business.value.trim();
    const needs = $$('input[name="need"]:checked', form).map((c) => c.value);
    const msg = f.message.value.trim();
    const text = [
      `Hi SpeedNet, I'm ${name}${biz ? ` from ${biz}` : ""}.`,
      needs.length ? `I'm interested in: ${needs.join(", ")}.` : "I want to discuss a website / automation project.",
      msg,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  });

  const yr = $("#yr");
  if (yr) yr.textContent = new Date().getFullYear();
})();
