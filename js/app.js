
const currentPage = Number(document.body.dataset.page || 1);

function fadeNavigate(href){
  document.body.style.opacity = "0";
  setTimeout(() => window.location.href = href, 240);
}

document.querySelectorAll("[data-nav]").forEach(link => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return;
    e.preventDefault();
    fadeNavigate(href);
  });
});

document.addEventListener("keydown", (e) => {
  const prev = document.querySelector("[data-prev]");
  const next = document.querySelector("[data-next]");
  if (e.key === "ArrowRight" && next) fadeNavigate(next.getAttribute("href"));
  if (e.key === "ArrowLeft" && prev) fadeNavigate(prev.getAttribute("href"));
});

window.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "1";
  const bar = document.querySelector(".progress-bar");
  if (bar) {
    const total = 10;
    const pct = Math.max(10, Math.min(100, (currentPage / total) * 100));
    requestAnimationFrame(() => { bar.style.width = pct + "%"; });
  }
});
