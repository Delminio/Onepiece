
const currentPage = Number(document.body.dataset.page || 0);

function pageTurnNavigate(href){
  const overlay = document.querySelector(".page-turn-overlay");
  if (overlay) {
    overlay.classList.add("active");
    setTimeout(() => { window.location.href = href; }, 420);
  } else {
    document.body.style.opacity = "0";
    setTimeout(() => { window.location.href = href; }, 220);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const bar = document.querySelector(".progress > span");
  if (bar && currentPage) {
    const pct = Math.max(10, Math.min(100, currentPage * 10));
    requestAnimationFrame(() => { bar.style.width = pct + "%"; });
  }

  document.querySelectorAll("[data-nav]").forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      e.preventDefault();
      pageTurnNavigate(href);
    });
  });

  document.addEventListener("keydown", (e) => {
    const prev = document.querySelector("[data-prev]");
    const next = document.querySelector("[data-next]");
    if (e.key === "ArrowRight" && next) pageTurnNavigate(next.getAttribute("href"));
    if (e.key === "ArrowLeft" && prev) pageTurnNavigate(prev.getAttribute("href"));
  });
});
