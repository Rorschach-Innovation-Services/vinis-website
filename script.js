/* ==========================================================================
   VINIS — interactions
   Sticky nav · mobile menu · scroll reveals · count-up · bar/graph fills
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Sticky nav blur ---------- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 12) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- Count-up numbers ---------- */
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduceMotion) { el.textContent = target.toFixed(dec) + suffix; return; }
    var start = null, dur = 1400;
    function fmt(v) {
      // thousands separator only for whole numbers >= 1000
      if (dec === 0 && v >= 1000) return Math.round(v).toLocaleString('en-US');
      return v.toFixed(dec);
    }
    function frame(t) {
      if (start === null) start = t;
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = fmt(target) + suffix;
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Bar / graph fill ---------- */
  function fillBars(root) {
    root.querySelectorAll('.bar-fill').forEach(function (b) {
      b.style.width = (b.getAttribute('data-w') || 0) + '%';
    });
  }
  function fillGraph(root) {
    root.querySelectorAll('.fill').forEach(function (b) {
      b.style.height = (b.getAttribute('data-h') || 0) + '%';
    });
  }

  /* ---------- IntersectionObserver: reveals + triggers ---------- */
  var seen = new WeakSet();
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      el.classList.add('in');

      if (!seen.has(el)) {
        seen.add(el);
        el.querySelectorAll('[data-count]').forEach(countUp);
        if (el.id === 'costBars' || el.querySelector('.bar-fill')) fillBars(el);
        if (el.id === 'fcGraph' || el.querySelector('.fill')) fillGraph(el);
      }
      io.unobserve(el);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // Watch the strip (count-up), chart bars, and forecast graph explicitly
  ['costBars', 'fcGraph'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) io.observe(el);
  });
  document.querySelectorAll('.strip-item').forEach(function (el) { io.observe(el); });

  /* ---------- Animated architecture layers (platform page) ---------- */
  var archLayers = [].slice.call(document.querySelectorAll('.stack .layer'));
  if (archLayers.length) {
    var ai = 0;
    function archCycle() {
      archLayers.forEach(function (l, k) { l.classList.toggle('active', k === ai); });
      ai = (ai + 1) % archLayers.length;
    }
    archCycle();
    if (!reduceMotion) setInterval(archCycle, 1600);
  }

})();
