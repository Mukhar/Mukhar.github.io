/* Mukhar Jain — portfolio
 * Vanilla JS, no deps.
 *  1. Footer year
 *  2. Sticky-header shadow on scroll
 *  3. Mobile nav toggle + auto-close
 *  4. Scroll-spy nav highlight
 *  5. Scroll-reveal animations
 *  6. Animated stat counters
 */

(() => {
  "use strict";

  // 1. Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // 2. Sticky header shadow
  const header = document.getElementById("siteHeader");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // 3. Mobile nav toggle
  const navToggle = document.getElementById("navToggle");
  const nav = document.querySelector(".primary-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  // 4. Scroll-spy
  if (nav && "IntersectionObserver" in window) {
    const links = Array.from(nav.querySelectorAll("a[href^='#']"));
    const sections = links
      .map((a) => {
        const id = a.getAttribute("href").slice(1);
        const el = id ? document.getElementById(id) : null;
        return el ? { el, link: a } : null;
      })
      .filter(Boolean);

    if (sections.length) {
      const map = new Map(sections.map((s) => [s.el, s.link]));
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const link = map.get(entry.target);
            if (!link) return;
            if (entry.isIntersecting) {
              links.forEach((l) => l.classList.remove("is-active"));
              link.classList.add("is-active");
            }
          });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      sections.forEach((s) => observer.observe(s.el));
    }
  }

  // 5. Scroll-reveal — fade + slide in
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    // Add stagger delays to siblings inside common parents
    const stagger = (parent, selector) => {
      const items = parent.querySelectorAll(selector);
      items.forEach((el, i) => {
        if (!el.hasAttribute("data-delay")) {
          el.setAttribute("data-delay", String(i % 4));
        }
      });
    };
    document.querySelectorAll(".now-grid").forEach((p) => stagger(p, ".now-card"));
    document.querySelectorAll(".stats-grid").forEach((p) => stagger(p, ".stat"));
    document.querySelectorAll(".exp-strip").forEach((p) => stagger(p, ".exp-tile"));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => revealObserver.observe(el));
  }

  // 6. Animated stat counters
  const counters = document.querySelectorAll("[data-counter]");
  if (counters.length && "IntersectionObserver" in window && !reduce) {
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const animate = (el) => {
      const target = parseFloat(el.dataset.counter);
      const suffix = el.dataset.suffix || "";
      const prefix = el.dataset.prefix || "";
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const value = target * easeOut(t);
        const display =
          target >= 10 ? Math.round(value) : value.toFixed(value < 10 && target % 1 !== 0 ? 1 : 0);
        el.textContent = `${prefix}${display}${suffix}`;
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = `${prefix}${target}${suffix}`;
      };
      requestAnimationFrame(tick);
    };

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  } else if (reduce) {
    counters.forEach((el) => {
      el.textContent = `${el.dataset.prefix || ""}${el.dataset.counter}${el.dataset.suffix || ""}`;
    });
  }
})();
