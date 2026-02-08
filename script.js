const revealNodes = document.querySelectorAll(".reveal");
const counterNodes = document.querySelectorAll("[data-counter]");
const scrollCue = document.querySelector(".scroll-cue");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
);

revealNodes.forEach((node) => revealObserver.observe(node));

const animateCounter = (node) => {
  const target = Number(node.dataset.counter || 0);
  if (!target) return;
  const duration = 800;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(target * progress);
    node.textContent = String(value);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      node.textContent = String(target);
    }
  };

  requestAnimationFrame(step);
};

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.6 }
);

counterNodes.forEach((node) => counterObserver.observe(node));

const updateScrollCue = () => {
  if (!scrollCue) return;
  if (window.scrollY > 80) {
    scrollCue.classList.add("hidden");
  } else {
    scrollCue.classList.remove("hidden");
  }
};

updateScrollCue();
window.addEventListener("scroll", updateScrollCue, { passive: true });
