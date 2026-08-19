const transitionDuration = 130;
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

const clearPageTransition = () => {
  document.documentElement.classList.remove("page-leaving");
};

window.addEventListener("pageshow", clearPageTransition);

document.querySelectorAll("#navbarNav a.nav-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    const destination = new URL(link.href, window.location.href);
    const isModifiedClick =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    const isCurrentPage =
      destination.pathname === window.location.pathname &&
      destination.hash === window.location.hash;

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      isModifiedClick ||
      destination.origin !== window.location.origin ||
      isCurrentPage ||
      prefersReducedMotion.matches ||
      "startViewTransition" in document
    ) {
      return;
    }

    event.preventDefault();
    document.documentElement.classList.add("page-leaving");

    window.setTimeout(() => {
      window.location.assign(destination.href);
    }, transitionDuration);
  });
});
