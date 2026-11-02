// Brings each feature into view as you scroll to it. Without this script, or with reduced motion
// turned on, everything is simply shown.
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var targets = document.querySelectorAll(
    '.feature .phone, .feature-grid > div:not(.phone), .band .wrap > div, .closing > *, ' +
    '.gallery-head, .world, .theme'
  );
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  targets.forEach(function (el) {
    // Things side by side arrive one after another rather than all at once.
    var siblings = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.transitionDelay = (Math.min(siblings, 6) * 0.08) + 's';
    el.classList.add('reveal');
    observer.observe(el);
  });
})();
