/* GradusIQ landing page — scroll reveal.
   No dependencies. Degrades to fully visible content if anything is missing. */

(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = window.matchMedia &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
