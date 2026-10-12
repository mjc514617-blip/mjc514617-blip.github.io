const hearts = document.getElementById("hearts");
const envelope = document.getElementById("envelope");
const letterButton = document.getElementById("letterButton");
const yesButton = document.getElementById("yesBtn");
const maybeButton = document.getElementById("maybeBtn");
const maybeResponse = document.getElementById("maybeResponse");
const celebration = document.getElementById("celebration");
const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");

document.querySelectorAll("img[data-fallback]").forEach((image) => {
  image.addEventListener("error", () => {
    image.closest(".photo-placeholder").classList.add("image-missing");
  });
});

letterButton.addEventListener("click", () => {
  const isOpen = envelope.classList.toggle("open");
  letterButton.setAttribute("aria-expanded", String(isOpen));
  letterButton.textContent = isOpen ? "Close the letter " : "Open the letter ";
  letterButton.insertAdjacentHTML("beforeend", '<span aria-hidden="true">→</span>');
  document.getElementById("letterPaper").setAttribute("aria-hidden", String(!isOpen));
});

maybeButton.addEventListener("click", () => {
  maybeResponse.textContent = "Haha, okay — I’ll respect that. I’ll be right here when you’re ready ♡";
  maybeButton.classList.remove("playful");
  window.requestAnimationFrame(() => maybeButton.classList.add("playful"));
  maybeButton.textContent = "Still your choice 🙈";
});

yesButton.addEventListener("click", () => {
  celebration.classList.remove("hidden");
  celebration.querySelector(".reveal").classList.add("visible");
  celebration.scrollIntoView({ behavior: "smooth", block: "center" });
  for (let index = 0; index < 28; index += 1) {
    window.setTimeout(createHeart, index * 90);
  }
});

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.setAttribute("aria-pressed", "true");
      musicLabel.textContent = "pause our song";
    } catch {
      musicLabel.textContent = "add audio/our-song.mp3";
    }
  } else {
    music.pause();
    musicToggle.setAttribute("aria-pressed", "false");
    musicLabel.textContent = "play our song";
  }
});

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = ["♡", "♥", "✦", "·"][Math.floor(Math.random() * 4)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${12 + Math.random() * 18}px`;
  heart.style.animationDuration = `${5 + Math.random() * 5}s`;
  hearts.appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove());
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
window.setInterval(createHeart, 1200);
