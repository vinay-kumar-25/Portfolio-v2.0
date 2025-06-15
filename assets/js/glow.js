const style = document.createElement("style");
style.textContent = `
  .glow-container {
    position: relative;
    overflow: hidden;
    border-radius: 20px;
  }
  .dummy-overlay {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    border-radius: inherit;
    overflow: hidden;
    pointer-events: none;
    background: transparent;
  }
  .glow {
    position: absolute;
    top: 0; left: 0;
    width: 1100px;   /* Super wide */
    height: 750px;   /* Super tall for ultra-smoothness */
    pointer-events: none;
    border-radius: 50%;
    background: radial-gradient(
      ellipse 55% 40% at 50% 50%,
      rgba(255,20,147,0.55) 0%,     /* Strong, vivid center */
      rgba(255,20,147,0.38) 25%,    /* Smooth gradiency */
      rgba(255,20,147,0.18) 55%,
      rgba(255,20,147,0.07) 75%,
      rgba(255,20,147,0.01) 90%,
      rgba(255,20,147,0) 100%
    );
    filter: blur(12px);             /* Extra smoothness */
    mix-blend-mode: screen;
    transition: transform 0.25s cubic-bezier(.4,1.4,.6,1), opacity 0.2s;
    opacity: 0.85;
    will-change: transform;
  }
`;
document.head.appendChild(style);
document.querySelectorAll(".glow-container").forEach(container => {
  container.style.position = "relative";

  const overlay = document.createElement("div");
  overlay.className = "dummy-overlay";
  container.appendChild(overlay);

  const glow = document.createElement("div");
  glow.className = "glow";
  overlay.appendChild(glow);

  // Hide glow initially (optional)
  glow.style.transform = `translate(-9999px, -9999px)`;
  glow.style.opacity = "0";

  container.addEventListener("mousemove", e => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.transform = `translate(${x - 550}px, ${y - 375}px)`; // Center the glow
    glow.style.opacity = "0.85";
  });

  container.addEventListener("mouseleave", () => {
    glow.style.transform = `translate(-9999px, -9999px)`;
    glow.style.opacity = "0";
  });
});
