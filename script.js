let currentPhoto = 0;
let score = 0;
let gameInterval;

const photos = [
  {
    src: "assets/foto1.jpg",
    caption: "Ini salah satu momen yang aku suka."
  },
  {
    src: "assets/foto2.jpg",
    caption: "Setiap lihat foto ini, aku senyum sendiri."
  },
  {
    src: "assets/foto3.jpg",
    caption: "Makasih ya udah jadi orang yang berarti buat aku."
  }
];

const letterText = `Aku mau bilang sesuatu yang mungkin sederhana, tapi tulus banget.

Makasih ya udah hadir di hidup aku.

Dari banyak hal yang pernah aku temuin, kamu salah satu hal yang paling aku syukuri.

Aku suka caramu bikin hari biasa jadi terasa lebih hangat.
Aku suka saat kamu cerita, saat kamu ketawa, bahkan saat kamu nyebelin pun aku tetap sayang.

Semoga kita bisa terus sama-sama, saling ngerti, saling jaga, dan saling pulang.

Aku sayang kamu, lebih dari yang bisa aku tulis di sini.`;

function startJourney() {
  const music = document.getElementById("bgMusic");
  music.play();
  nextScreen("musicPage");
}

function nextScreen(screenId) {
  const screens = document.querySelectorAll(".screen");
  screens.forEach(screen => screen.classList.remove("active"));

  document.getElementById(screenId).classList.add("active");

  if (screenId === "gamePage") {
    startGame();
  }
}

function nextPhoto() {
  currentPhoto++;

  if (currentPhoto >= photos.length) {
    currentPhoto = 0;
  }

  document.getElementById("memoryPhoto").src = photos[currentPhoto].src;
  document.getElementById("caption").innerText = photos[currentPhoto].caption;
}

function startGame() {
  score = 0;
  document.getElementById("score").innerText = score;

  gameInterval = setInterval(createLove, 700);
}

function createLove() {
  const gameArea = document.getElementById("gameArea");
  const love = document.createElement("div");

  love.classList.add("love");
  love.innerText = "💖";

  const randomX = Math.random() * 85;
  const randomDuration = 2 + Math.random() * 2;

  love.style.left = randomX + "%";
  love.style.animationDuration = randomDuration + "s";

  love.onclick = function () {
    score++;
    document.getElementById("score").innerText = score;
    love.remove();

    if (score >= 20) {
      winGame();
    }
  };

  gameArea.appendChild(love);

  setTimeout(() => {
    love.remove();
  }, randomDuration * 1000);
}

function winGame() {
  clearInterval(gameInterval);

  const gameArea = document.getElementById("gameArea");
  gameArea.innerHTML = "";

  nextScreen("letterPage");
  typeLetter();
}

function typeLetter() {
  const letter = document.getElementById("loveLetter");
  letter.innerText = "";

  let index = 0;

  const typing = setInterval(() => {
    letter.innerText += letterText.charAt(index);
    index++;

    if (index >= letterText.length) {
      clearInterval(typing);
    }
  }, 35);
}

function showEnding() {
  nextScreen("endingPage");
}