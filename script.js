/* Mukhar Jain — portfolio
 * Small, dependency-free interactions:
 *   1. Year stamp in footer
 *   2. Sticky header shadow on scroll
 *   3. Mobile nav toggle
 *   4. Scroll-spy: highlight current section in nav
 *   5. Close mobile nav on link click
 */

(() => {
  "use strict";

  // 1. Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // 2. Sticky header shadow on scroll
  const header = document.getElementById("siteHeader");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // 3 + 5. Mobile nav toggle
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

  // 4. Scroll-spy with IntersectionObserver
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
        {
          rootMargin: "-45% 0px -50% 0px",
          threshold: 0,
        }
      );
      sections.forEach((s) => observer.observe(s.el));
    }
  }
})();
