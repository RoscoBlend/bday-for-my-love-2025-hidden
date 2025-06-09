
window.addEventListener("load", () => {
  const modal = document.getElementById("greetingModal");
  const btn = document.getElementById("closeModal");
  modal.style.display = "flex";
  btn.onclick = () => {
    modal.style.display = "none";
  };
});

let currentIndex = 0;
const slides = document.querySelector(".slides");
const totalSlides = slides.children.length;

document.querySelector(".prev").onclick = () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlider();
};

document.querySelector(".next").onclick = () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
};

function updateSlider() {
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(() => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
}, 5000);

const heartsCanvas = document.getElementById("heartsCanvas");
const ctxH = heartsCanvas.getContext("2d");
let hearts = [];

function resizeCanvas() {
  heartsCanvas.width = window.innerWidth;
  heartsCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createHeart() {
  hearts.push({
    x: Math.random() * heartsCanvas.width,
    y: heartsCanvas.height,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 1 + 0.5,
    alpha: 1
  });
}

function drawHearts() {
  ctxH.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);
  hearts.forEach((h, i) => {
    ctxH.fillStyle = `rgba(255, 105, 135, ${h.alpha})`;
    ctxH.beginPath();
    ctxH.moveTo(h.x, h.y);
    ctxH.bezierCurveTo(h.x - h.size, h.y - h.size, h.x - h.size, h.y + h.size / 2, h.x, h.y + h.size);
    ctxH.bezierCurveTo(h.x + h.size, h.y + h.size / 2, h.x + h.size, h.y - h.size, h.x, h.y);
    ctxH.fill();

    h.y -= h.speed;
    h.alpha -= 0.005;
    if (h.alpha <= 0) hearts.splice(i, 1);
  });
  requestAnimationFrame(drawHearts);
}
setInterval(createHeart, 300);
drawHearts();

const fireworksCanvas = document.getElementById("fireworksCanvas");
const ctxF = fireworksCanvas.getContext("2d");

fireworksCanvas.width = window.innerWidth;
fireworksCanvas.height = window.innerHeight;

function randomColor() {
  const colors = ['#ff85a2', '#ffd700', '#00e5ff', '#ff4081'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function explode(x, y) {
  let particles = [];
  for (let i = 0; i < 30; i++) {
    particles.push({
      x, y,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 5 + 1,
      radius: 2,
      alpha: 1,
      color: randomColor()
    });
  }

  const animate = () => {
    ctxF.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    particles.forEach((p, i) => {
      const vx = Math.cos(p.angle) * p.speed;
      const vy = Math.sin(p.angle) * p.speed;
      p.x += vx;
      p.y += vy;
      p.alpha -= 0.02;

      ctxF.beginPath();
      ctxF.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctxF.fillStyle = `${p.color}${Math.floor(p.alpha * 255).toString(16)}`;
      ctxF.fill();

      if (p.alpha <= 0) particles.splice(i, 1);
    });

    if (particles.length > 0) requestAnimationFrame(animate);
  };

  animate();
}

setInterval(() => {
  const x = Math.random() * fireworksCanvas.width;
  const y = Math.random() * fireworksCanvas.height / 2;
  explode(x, y);
}, 4000);

// Аудио управление с кнопками Play / Pause
const bgMusic = document.getElementById("bg-music");
const audioCard = document.getElementById("audio-card");

document.getElementById("play-bg").onclick = () => {
  audioCard.pause();
  audioCard.currentTime = 0;
  bgMusic.play();
};
document.getElementById("pause-bg").onclick = () => {
  bgMusic.pause();
};

document.getElementById("play-card").onclick = () => {
  bgMusic.pause();
  bgMusic.currentTime = 0;
  audioCard.play();
};
document.getElementById("pause-card").onclick = () => {
  audioCard.pause();
};
