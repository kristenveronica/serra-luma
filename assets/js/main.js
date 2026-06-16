/* ==========================================================================
   Serra Luma — interactions
   - Sticky nav state on scroll
   - Mobile menu
   - Scroll reveal (IntersectionObserver)
   - Gallery filtering + lightbox
   - Contact form handling
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Year in footer ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Sticky / solid navigation ---------- */
  var nav = document.querySelector(".nav");
  if (nav) {
    var solidFrom = 60;
    /* Pages without a dark hero (e.g. the Gallery) start on a light background,
       where the transparent nav's light text would be invisible — keep the nav
       solid from the top in that case. */
    var hasDarkHeader = !!document.querySelector(".hero, .page-hero");
    var onScroll = function () {
      nav.classList.toggle("nav--solid", !hasDarkHeader || window.scrollY > solidFrom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---------- Mobile menu ---------- */
    var toggle = nav.querySelector(".nav__toggle");
    var links = nav.querySelector(".nav__links");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("nav--open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        document.body.style.overflow = open ? "hidden" : "";
      });
      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          nav.classList.remove("nav--open");
          toggle.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        });
      });
    }
  }

  /* ---------- Hero video: guarantee playback ----------
     The `autoplay` attribute can be ignored (Safari's per-site setting, iOS/macOS
     Low Power Mode, data-saver, etc.), leaving just the poster. Force play once
     the data is ready, and as a fallback start it on the first user interaction. */
  var heroVid = document.querySelector(".hero__media");
  if (heroVid) {
    heroVid.muted = true; /* required for inline autoplay, esp. iOS */
    var tryPlayHero = function () {
      var pr = heroVid.play();
      if (pr && pr.catch) pr.catch(function () {});
    };
    if (heroVid.readyState >= 2) tryPlayHero();
    heroVid.addEventListener("loadeddata", tryPlayHero);
    heroVid.addEventListener("canplay", tryPlayHero);
    var kickEvents = ["touchstart", "pointerdown", "click", "scroll", "keydown"];
    var kickHero = function () {
      tryPlayHero();
      kickEvents.forEach(function (ev) { window.removeEventListener(ev, kickHero); });
    };
    kickEvents.forEach(function (ev) {
      window.addEventListener(ev, kickHero, { passive: true });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  var revealAllNow =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    navigator.webdriver; /* automation / Lighthouse → show everything immediately */
  if (revealAllNow) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Smooth image fade-in on load ----------
     Only images that have not already painted are hidden, so cached images
     never flash. A simple 260ms opacity fade — no scaling, no slide, no
     layout shift — keeps the gallery calm and predictable while scrolling. */
  var fadeImgs = document.querySelectorAll(
    ".editorial-grid img, .gallery-immersive img, .poss-grid img"
  );
  fadeImgs.forEach(function (img) {
    if (img.complete && img.naturalWidth) {
      img.classList.add("is-loaded"); /* already painted — no fade needed */
      return;
    }
    img.classList.add("img-fade");
    var reveal = function () { img.classList.add("is-loaded"); };
    img.addEventListener("load", reveal);
    img.addEventListener("error", reveal);
  });

  /* ---------- Lightbox ---------- */
  var tiles = document.querySelectorAll(".tile");
  var lightbox = document.querySelector(".lightbox");
  if (lightbox && tiles.length) {
    var lbImg = lightbox.querySelector("img");
    var lbClose = lightbox.querySelector(".lightbox__close");
    var open = function (src, alt) {
      lbImg.src = src;
      lbImg.alt = alt || "";
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    };
    var close = function () {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    };
    tiles.forEach(function (tile) {
      var img = tile.querySelector("img");
      tile.style.cursor = "zoom-in";
      tile.addEventListener("click", function () {
        open(tile.getAttribute("data-full") || img.src, img.alt);
      });
    });
    lbClose && lbClose.addEventListener("click", close);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ---------- The Film (click-to-play) ----------
     With JS present we hide native controls behind a custom poster button until
     the viewer plays; on play we reveal the controls. No-JS users still get a
     native player (the markup keeps `controls`). */
  var film = document.querySelector(".film");
  if (film) {
    var fv = film.querySelector(".film__video");
    var fbtn = film.querySelector(".film__play");
    if (fv) {
      fv.removeAttribute("controls");
      var playFilm = function () {
        fv.setAttribute("controls", "");
        film.classList.add("is-playing");
        var p = fv.play();
        if (p && p.catch) p.catch(function () {});
      };
      if (fbtn) fbtn.addEventListener("click", playFilm);
      fv.addEventListener("ended", function () {
        film.classList.remove("is-playing");
        fv.removeAttribute("controls");
        fv.currentTime = 0;
      });
    }
  }

  /* ---------- Contact form ---------- */
  var form = document.querySelector("#enquiry-form");
  if (form) {
    var status = form.querySelector(".form__status");

    /* Prefill based on which CTA button brought the visitor here
       (enquire.html?intent=im / ?intent=inspection). */
    var intent = new URLSearchParams(window.location.search).get("intent");
    if (intent === "im") {
      var imBox = form.querySelector("#im");
      if (imBox) imBox.checked = true;
    } else if (intent === "inspection") {
      var msg = form.querySelector("#message");
      if (msg && !msg.value) {
        msg.value = "I would like to arrange a private inspection of Serra Luma.";
      }
    }

    form.addEventListener("submit", function (e) {
      /* If a Netlify/Formspree endpoint is wired up, let it submit normally.
         Otherwise show a graceful local confirmation. */
      var isWired = form.hasAttribute("data-netlify") || (form.getAttribute("action") || "").indexOf("http") === 0;
      if (isWired) return; // allow native submission
      e.preventDefault();
      if (status) {
        status.textContent = "Thank you. Your enquiry has been noted — please connect this form to an email service to receive submissions (see README).";
      }
      form.reset();
    });
  }
})();
