
const currentPage = Number(document.body.dataset.page || 1);

function goTo(href){
  document.body.style.opacity = "0";
  setTimeout(() => window.location.href = href, 260);
}

window.addEventListener("DOMContentLoaded", () => {
  const bar = document.querySelector(".progress > span");
  if (bar) {
    const pct = Math.max(10, Math.min(100, currentPage * 10));
    requestAnimationFrame(() => { bar.style.width = pct + "%"; });
  }

  document.querySelectorAll("[data-nav]").forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      e.preventDefault();
      goTo(href);
    });
  });

  document.addEventListener("keydown", (e) => {
    const prev = document.querySelector("[data-prev]");
    const next = document.querySelector("[data-next]");
    if (e.key === "ArrowRight" && next) goTo(next.getAttribute("href"));
    if (e.key === "ArrowLeft" && prev) goTo(prev.getAttribute("href"));
  });

  const overlay = document.querySelector(".intro-overlay");
  const enterBtn = document.querySelector("#enterStory");
  if (overlay && enterBtn) {
    enterBtn.addEventListener("click", () => overlay.classList.add("hide"));
    setTimeout(() => overlay.classList.add("hide"), 3200);
  }

  // Spotify autoplay is usually blocked by browsers.
  // We keep the player open and visible to make playback easy.
});
