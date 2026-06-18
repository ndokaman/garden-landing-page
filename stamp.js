let lastX = 0, lastY = 0, firstMove = true, clicked = false;
let stampInterval = null;
const isTouch = window.matchMedia("(pointer: coarse)").matches;

function spawnStamp(x, y, center) {
  const stamp = document.createElement("span");
  stamp.textContent = "enter";
  stamp.className = "stamp";
  stamp.style.left = `${x}px`;
  stamp.style.top = `${y}px`;
  if (center) stamp.style.transform = "translate(-50%, -50%)";
  document.body.appendChild(stamp);
}

spawnStamp(window.innerWidth / 2, window.innerHeight / 2, true);

// MOBILE STAMP
if (isTouch) {
  document.querySelectorAll(".stamp").forEach(s => s.remove());
  const centerY = window.innerHeight / 2;
  const centerX = window.innerWidth / 2;
  const spacing = 12;
  const stepsUp = Math.ceil(centerY / spacing);
  const stepsDown = Math.ceil((window.innerHeight - centerY) / spacing);
  const total = Math.max(stepsUp, stepsDown);
  spawnStamp(centerX, centerY, true);
  let step = 1;
  stampInterval = setInterval(() => {
    if (step > total) {
      clearInterval(stampInterval);
      return;
    }
    const above = centerY - spacing * step;
    const below = centerY + spacing * step;
    if (above >= 0) spawnStamp(centerX, above, true);
    if (below <= window.innerHeight) spawnStamp(centerX, below, true);
    step++;
  }, 100);
}
// MOBILE STAMP

if (!isTouch) {
  window.addEventListener("mousemove", (e) => {
    if (clicked) return;
    if (firstMove) {
      document.querySelectorAll(".stamp").forEach((s) => s.remove());
      firstMove = false;
    } else {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (Math.abs(dx) < 50 && Math.abs(dy) < 15) return;
    }
    spawnStamp(e.clientX, e.clientY);
    lastX = e.clientX;
    lastY = e.clientY;
  });
}

function handleEnter() {
  if (clicked) return;
  clearInterval(stampInterval);
  clicked = true;
  document.querySelector(".enter-page").classList.add("exit");
  const stamps = document.querySelectorAll(".stamp");
  stamps.forEach(s => s.classList.add("lighten"));
  setTimeout(() => {
    const img = document.querySelector(".garden-page img");
    img.src = img.src;
    document.querySelector(".garden-page").classList.add("visible");
    stamps.forEach(s => s.classList.add("fade-out"));
    setTimeout(() => {
      document.querySelectorAll(".stamp").forEach(s => s.remove());
    }, 600);
  }, 400);
}

window.addEventListener("click", handleEnter);
if (isTouch) {
  window.addEventListener("touchend", handleEnter);
}