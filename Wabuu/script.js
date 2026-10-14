const hearts = document.getElementById("hearts");
const envelope = document.getElementById("envelope");
const letterButton = document.getElementById("letterButton");
const yesButton = document.getElementById("yesBtn");
const maybeButton = document.getElementById("maybeBtn");
const maybeResponse = document.getElementById("maybeResponse");
const celebration = document.getElementById("celebration");
const invitation = document.getElementById("invitation");
const backToQuestion = document.getElementById("backToQuestion");
const dateForm = document.getElementById("dateForm");
const dateChoice = document.getElementById("dateChoice");
const timeChoice = document.getElementById("timeChoice");
const chosenDate = document.getElementById("chosenDate");
const chosenDateText = document.getElementById("chosenDateText");
const chosenTimeText = document.getElementById("chosenTimeText");
const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");

const today = new Date();
dateChoice.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

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
  const moves = [
    { x: 0, y: -58 },
    { x: 88, y: -24 },
    { x: 78, y: 72 },
    { x: -35, y: 108 },
    { x: -85, y: 24 }
  ];
  const moveIndex = Number(maybeButton.dataset.moves || 0);
  const move = moves[moveIndex % moves.length];
  maybeButton.dataset.moves = String(moveIndex + 1);
  maybeButton.classList.remove("playful");
  maybeButton.style.setProperty("--dodge-x", `${move.x}px`);
  maybeButton.style.setProperty("--dodge-y", `${move.y}px`);
  maybeButton.classList.add("dodging");
  maybeResponse.textContent = "Hehe, that button is walking away in style 🙈";
  maybeButton.textContent = "Nope, try again 🙈";
});

function resetMaybeButton() {
  maybeButton.classList.remove("dodging", "playful");
  maybeButton.style.removeProperty("--dodge-x");
  maybeButton.style.removeProperty("--dodge-y");
  maybeButton.dataset.moves = "0";
  maybeButton.textContent = "No, I wouldn't";
  maybeResponse.textContent = "";
}

yesButton.addEventListener("click", () => {
  resetMaybeButton();
  invitation.classList.add("hidden");
  celebration.classList.remove("hidden");
  celebration.querySelector(".reveal").classList.add("visible");
  celebration.scrollIntoView({ behavior: "smooth", block: "start" });
  for (let index = 0; index < 28; index += 1) {
    window.setTimeout(createHeart, index * 90);
  }
});

backToQuestion.addEventListener("click", () => {
  celebration.classList.add("hidden");
  invitation.classList.remove("hidden");
  invitation.scrollIntoView({ behavior: "smooth", block: "center" });
});

dateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const selectedDate = new Date(`${dateChoice.value}T00:00:00`);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(selectedDate);
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(`2000-01-01T${timeChoice.value}`));

  chosenDateText.textContent = formattedDate;
  chosenTimeText.textContent = formattedTime;
  dateForm.classList.add("hidden");
  chosenDate.classList.remove("hidden");
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
