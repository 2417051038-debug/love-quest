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
  playMusic();
  nextScreen("musicPage");
}

function playMusic() {
  const music = document.getElementById("bgMusic");
  const status = document.getElementById("musicStatus");
  const musicBtn = document.getElementById("musicBtn");

  if (!music) return;

  music.volume = 0.7;

  music.play()
    .then(function() {
      if (status) status.innerText = "Lagu sedang diputar 💗";
      if (musicBtn) musicBtn.innerText = "⏸️";
    })
    .catch(function() {
      if (status) status.innerText = "Klik tombol 🎵 untuk memutar lagu";
      if (musicBtn) musicBtn.innerText = "🎵";
    });
}

function toggleMusic() {
  const music = document.getElementById("bgMusic");
  const status = document.getElementById("musicStatus");
  const musicBtn = document.getElementById("musicBtn");

  if (!music) return;

  if (music.paused) {
    music.play()
      .then(function() {
        if (status) status.innerText = "Lagu sedang diputar 💗";
        if (musicBtn) musicBtn.innerText = "⏸️";
      })
      .catch(function() {
        if (status) status.innerText = "Lagunya belum bisa diputar. Cek file assets/lagu.mp3";
        if (musicBtn) musicBtn.innerText = "🎵";
      });
  } else {
    music.pause();
    if (status) status.innerText = "Lagu dijeda";
    if (musicBtn) musicBtn.innerText = "🎵";
  }
}

function nextScreen(screenId) {
  const screens = document.querySelectorAll(".screen");

  screens.forEach(function(screen) {
    screen.classList.remove("active");
  });

  const targetScreen = document.getElementById(screenId);

  if (!targetScreen) return;

  targetScreen.classList.add("active");

  if (screenId === "galleryPage") {
    playMusic();
  }

  if (screenId === "gamePage") {
    playMusic();
    startGame();
  }

  if (screenId === "letterPage") {
    playMusic();
    showLetter();
  }
}

function nextPhoto() {
  currentPhoto++;

  if (currentPhoto >= photos.length) {
    currentPhoto = 0;
  }

  const memoryPhoto = document.getElementById("memoryPhoto");
  const caption = document.getElementById("caption");

  memoryPhoto.src = photos[currentPhoto].src;
  caption.innerText = photos[currentPhoto].caption;

  playMusic();
}

function startGame() {
  score = 0;

  const scoreText = document.getElementById("score");
  const gameArea = document.getElementById("gameArea");

  scoreText.innerText = score;
  gameArea.innerHTML = "";

  clearInterval(gameInterval);
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

  love.onclick = function() {
    score++;

    const scoreText = document.getElementById("score");
    scoreText.innerText = score;

    love.remove();

    if (score >= 20) {
      winGame();
    }
  };

  gameArea.appendChild(love);

  setTimeout(function() {
    if (love.parentNode) {
      love.remove();
    }
  }, randomDuration * 1000);
}

function winGame() {
  clearInterval(gameInterval);

  const gameArea = document.getElementById("gameArea");
  gameArea.innerHTML = "";

  nextScreen("letterPage");
}

function showLetter() {
  const letter = document.getElementById("loveLetter");

  letter.innerText = letterText;
}

function showEnding() {
  playMusic();
  nextScreen("endingPage");
}
