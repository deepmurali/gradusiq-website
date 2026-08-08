/* GradusIQ landing page — hero typewriter + scroll reveal.
   No dependencies. Degrades to fully visible content if anything is missing. */

var GRADUSIQ_REDUCED_MOTION =
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --- Hero typewriter ------------------------------------------------------
   Cycles three standalone headlines: hold, erase, type the next, repeat.
   The markup already renders phrase 0, so we start in the hold state and the
   page never flashes an empty headline. */

(function () {
  'use strict';

  var PHRASES = [
    'Every student’s personal advisor.',
    'Support from college to career.',
    'AI companion for your future.'
  ];

  var TYPE_MS  = 40;    // per character, typing
  var ERASE_MS = 25;    // per character, erasing
  var HOLD_MS  = 1800;  // full phrase held on screen

  if (GRADUSIQ_REDUCED_MOTION) return;

  var el = document.querySelector('.typer-text');
  if (!el) return;

  document.documentElement.classList.add('js-typing');

  var index = 0;
  var chars = PHRASES[0].length;

  function erase() {
    if (chars > 0) {
      chars--;
      el.textContent = PHRASES[index].slice(0, chars);
      setTimeout(erase, ERASE_MS);
      return;
    }
    index = (index + 1) % PHRASES.length;
    setTimeout(type, TYPE_MS);
  }

  function type() {
    if (chars < PHRASES[index].length) {
      chars++;
      el.textContent = PHRASES[index].slice(0, chars);
      setTimeout(type, TYPE_MS);
      return;
    }
    setTimeout(erase, HOLD_MS);
  }

  setTimeout(erase, HOLD_MS);
})();

/* --- Scroll reveal -------------------------------------------------------- */

(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = GRADUSIQ_REDUCED_MOTION;

  // Bail out before hiding anything if we can't animate or can't observe.
  if (reduced || !('IntersectionObserver' in window)) return;

  // Opt the page into the hidden-then-revealed state only now that we know
  // we can undo it.
  root.classList.add('js-reveal');

  var items = document.querySelectorAll('.reveal');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    // Trigger slightly before the element reaches the viewport edge.
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.05
  });

  items.forEach(function (el, i) {
    // Stagger siblings so grids and lists cascade rather than pop at once.
    el.style.transitionDelay = (Math.min(i % 5, 4) * 55) + 'ms';
    observer.observe(el);
  });

  // Anything already on screen at load (the hero) shows immediately, so a
  // fresh page never opens to blank space if the observer is slow to fire.
  requestAnimationFrame(function () {
    items.forEach(function (el) {
      var box = el.getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) {
        el.classList.add('is-visible');
        observer.unobserve(el);
      }
    });
  });
})();
