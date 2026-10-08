// ══════════════════════════════════════════
// CONFETTI (hero background)
// ══════════════════════════════════════════
function initConfetti() {
  const wrap = document.getElementById('confetti');
  if (!wrap) return;
  const colors = ['#f5c842', '#e8455a', '#4fb3f6', '#a18cd1', '#43cea2', '#ff7e5f', '#fbc2eb'];
  for (let i = 0; i < 55; i++) {
    const el = document.createElement('span');
    el.style.cssText = `
      left:${Math.random() * 100}%;top:-20px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      width:${6 + Math.random() * 8}px;height:${6 + Math.random() * 8}px;
      border-radius:${Math.random() > .5 ? '50%' : '2px'};
      animation-duration:${4 + Math.random() * 6}s;
      animation-delay:${Math.random() * 6}s;
    `;
    wrap.appendChild(el);
  }
}

// ══════════════════════════════════════════
// PETAL / FIREWORK BURST – Canvas
// ══════════════════════════════════════════
let canvas = null;
let ctx = null;
let particles = [];
let rafId = null;
let burstActive = false;

function resizeCanvas() {
  if (!canvas) {
    canvas = document.getElementById('petal-canvas');
    if (canvas) ctx = canvas.getContext('2d');
  }
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

const PETALS = ['🌸', '🌺', '🌼', '🌹', '💐', '🎀', '⭐', '✨', '💫', '🎊', '🎉', '🎈'];

class Petal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.emoji = PETALS[Math.floor(Math.random() * PETALS.length)];
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 14;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed - (4 + Math.random() * 6);
    this.gravity = 0.28 + Math.random() * 0.18;
    this.rotation = Math.random() * 360;
    this.rotSpeed = (Math.random() - 0.5) * 10;
    this.size = 18 + Math.random() * 22;
    this.alpha = 1;
    this.decay = 0.012 + Math.random() * 0.012;
    this.life = 1;
  }
  update() {
    this.vx *= 0.98;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotSpeed;
    this.life -= this.decay;
    this.alpha = this.life;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.font = `${this.size}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.emoji, 0, 0);
    ctx.restore();
  }
}

function burst(originX, originY, count = 60) {
  for (let i = 0; i < count; i++) {
    particles.push(new Petal(originX, originY));
  }
}

function animateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => { p.update(); p.draw(); });

  if (particles.length > 0) {
    rafId = requestAnimationFrame(animateCanvas);
  } else {
    canvas.classList.remove('active');
    burstActive = false;
  }
}

function triggerBurst(centerX, centerY) {
  resizeCanvas();
  canvas.classList.add('active');
  particles = [];
  burst(centerX, centerY, 50);
  burst(centerX - 120, centerY + 40, 20);
  burst(centerX + 120, centerY + 40, 20);
  burst(window.innerWidth * 0.15, window.innerHeight * 0.5, 25);
  burst(window.innerWidth * 0.85, window.innerHeight * 0.5, 25);
  burst(window.innerWidth * 0.5, window.innerHeight * 0.15, 20);

  if (rafId) cancelAnimationFrame(rafId);
  burstActive = true;
  animateCanvas();
}

// ══════════════════════════════════════════
// SLIDESHOW VIDEO PLAYER LOGIC
// ══════════════════════════════════════════
const SLIDES = [
  {
    type: 'image',
    src: 'birthday_vuong/photo1.jpg',
    title: 'Kỷ Niệm Rạng Rỡ 📸',
    sub: 'Nụ cười tỏa nắng và những khoảnh khắc tuyệt vời nhất!'
  },
  {
    type: 'image',
    src: 'birthday_vuong/photo2.jpg',
    title: 'Phong Cách & Bản Lĩnh 💼',
    sub: 'Luôn tự tin, quyết đoán và chinh phục mọi mục tiêu!'
  },
  {
    type: 'image',
    src: 'birthday_vuong/photo3.png',
    title: 'Hành Trình Mới 🚀',
    sub: 'Chúc bạn tuổi mới bay cao, bay xa và đạt được mọi hoài bão!'
  },
  {
    type: 'image',
    src: 'birthday_vuong/photo4.png',
    title: 'Niềm Vui Bất Tận ✨',
    sub: 'Mỗi ngày trôi qua đều tràn ngập tiếng cười và hạnh phúc!'
  },
  {
    type: 'image',
    src: 'birthday_vuong/photo5.png',
    title: 'Trải Nghiệm Tuyệt Vời 🌍',
    sub: 'Chúc bạn có thêm nhiều chuyến đi và khám phá những vùng đất mới!'
  },
  {
    type: 'image',
    src: 'birthday_vuong/photo6.png',
    title: 'Thành Công Rực Rỡ 🎯',
    sub: 'Sự nghiệp thăng tiến, vạn sự hanh thông trong năm nay nhé!'
  },
  {
    type: 'image',
    src: 'birthday_vuong/photo7.png',
    title: 'Bình Yên & An Khang 🍀',
    sub: 'Sức khỏe dồi dào, tâm hồn luôn bình yên và thư thái.'
  },
  {
    type: 'image',
    src: 'birthday_vuong/photo8.png',
    title: 'Tình Bạn & Gia Đình 💛',
    sub: 'Luôn được yêu thương và bao bọc bởi những người tuyệt vời nhất!'
  },
  {
    type: 'image',
    src: 'birthday_vuong/photo9.png',
    title: 'Tuổi Trẻ Nhiệt Huyết 🔥',
    sub: 'Luôn giữ vững đam mê và ngọn lửa nhiệt huyết trong tim.'
  },
  {
    type: 'image',
    src: 'birthday_vuong/photo10.png',
    title: 'Chúc Mừng Sinh Nhật! 🎂',
    sub: 'Tuổi mới rực rỡ, thành công và thật nhiều may mắn nhé Trần Hữu Vượng!'
  },
  {
    type: 'poem',
    title: 'Gửi Tặng Vượng',
    sub: 'Bài thơ chúc mừng sinh nhật tuổi 23!',
    duration: 35000,
    content: `
      <p>🎆 Hôm nay sinh nhật bạn Vượng 🎂🎁🍻<br>
      🌟 Hai ba xuân mới, cát tường đầy tay 🍀💰✨</p>
      <p>⚔️ Ngày đêm tu luyện miệt mài 🐉🔥📖<br>
      🦅 Mong lên Nguyên Anh, chẳng ai địch cùng 😎⚡👑</p>
      <p>🌌 Đan lô đỏ lửa bập bùng 🔥🏺🌙<br>
      🍃 Linh đan cắn một phát bừng chân nguyên 💊✨🚀</p>
      <p>🎋 Tiên duyên rộng mở khắp miền 🐲🌈☁️<br>
      ⚔️ Bí tịch nhặt được liên thiên mỗi ngày 📜💎🎁</p>
      <p>🏸 Cầu lông đập một phát bay 💥🏸🌪️<br>
      😱 Đối phương đứng ngó, biết ngay thua rồi 🤣👏🔥</p>
      <p>🏆 Huy chương chất kín một nơi 🏅🥇🎖️<br>
      💪 Thân như thể pháp, sức thời Kim Cang ⚡🐉🗿</p>
      <p>🎤 Lên mic cất tiếng ngân vang 🎶🎵🎙️<br>
      🌺 "Cô gái Sầm Nưa" rộn ràng khắp nơi 🥳🌸🎆</p>
      <p>🎧 Nuôn na... nuôn na... chơi vơi 🎵💃🌈<br>
      🍻 Anh em phía dưới vỗ tay rần trời 👏🤣🎉</p>
      <p>🍖 Bàn tiệc thịt nướng đầy vơi 🍺🥩🍤<br>
      🌭 Ăn xong đột phá, lên đời cảnh cao 🚀🐉✨</p>
      <p>💰 Chúc cho tài lộc ào ào 🌊💵🎁<br>
      🏠 Nhà xe đủ cả, trước sau an hòa 🚗🏡🌸</p>
      <p>☀️ Sáng ra gặp hỷ gặp quà 🎊🎁🍀<br>
      🌙 Đêm về ngủ mộng thành ma... à tiên 😆👻🐲</p>
      <p>🎂 Sinh nhật xin chúc bạn hiền 🎉❤️🌟<br>
      🐉 Tu tiên đắc đạo, bạc tiền đầy kho 💰🏺✨</p>
      <p>🍻 Anh em mãi mãi hò dô 🎶🍺🤝<br>
      🏸 Đánh cầu thắng lớn, hát hò quanh năm 🎤🥇🎉</p>
      <div class="poem-footer-msg">
      🎊🎂🥳 Chúc Trần Hữu Vượng tuổi 23:<br>
      🐉 Tu vi thăng cấp ⬆️⚔️ • 🏸 Cầu lông bá đạo • 🎤 Hát "Cô gái Sầm Nưa" không lệch nhịp 🎶 • 💰 Ví tiền không đáy • 🍻 Bạn bè đông vui • ❤️ Vạn sự như ý • 🎁 Sinh nhật thật bùng nổ! 🎆🎉🍀🥳🍻🐲✨
      </div>
    `
  }
];

const SLIDE_DURATION = 4000; // 4s per slide
let currentIndex = 0;
let isPlaying = false;
let slideTimer = null;
let progressTimer = null;
let startTime = 0;

function buildSlideshowDOM() {
  const track = document.getElementById('sl-track');
  const dots = document.getElementById('sl-dots');

  if (!track || !dots) return;

  track.innerHTML = '';
  dots.innerHTML = '';

  SLIDES.forEach((slide, i) => {
    // Create Slide element
    const slideEl = document.createElement('div');
    slideEl.className = `sl-slide ${i === 0 ? 'active' : ''}`;
    slideEl.dataset.index = i;

    if (slide.type === 'image') {
      const box = document.createElement('div');
      box.className = 'sl-img-box';
      const img = document.createElement('img');
      img.src = slide.src;
      img.alt = slide.title;
      img.onerror = () => {
        // Fallback card if image fails
        box.innerHTML = `<div class="sl-card-box" style="background:linear-gradient(135deg, #1f4037, #99f2c8)"><div class="sl-card-emoji">🖼️</div><div class="sl-card-text">${slide.title}</div></div>`;
      };
      box.appendChild(img);
      slideEl.appendChild(box);
    } else if (slide.type === 'poem') {
      const box = document.createElement('div');
      box.className = 'sl-poem-box';
      box.innerHTML = slide.content;
      slideEl.appendChild(box);
    } else {
      const card = document.createElement('div');
      card.className = 'sl-card-box';
      card.style.background = slide.bg;
      card.innerHTML = `
        <div class="sl-card-emoji">${slide.emoji}</div>
        <div class="sl-card-text">${slide.title}</div>
      `;
      slideEl.appendChild(card);
    }

    track.appendChild(slideEl);

    // Create dot element
    const dot = document.createElement('div');
    dot.className = `sl-dot ${i === 0 ? 'active' : ''}`;
    dots.appendChild(dot);
  });

  updateCaption(0);
}

function updateCaption(index) {
  const counter = document.getElementById('sl-counter');
  const capTitle = document.getElementById('sl-cap-title');
  const capSub = document.getElementById('sl-cap-sub');

  if (counter) counter.textContent = `${index + 1} / ${SLIDES.length}`;
  if (capTitle) capTitle.textContent = SLIDES[index].title;
  if (capSub) capSub.textContent = SLIDES[index].sub;
}

function showSlide(index) {
  const slides = document.querySelectorAll('.sl-slide');
  const dots = document.querySelectorAll('.sl-dot');

  slides.forEach((s, i) => s.classList.toggle('active', i === index));
  dots.forEach((d, i) => d.classList.toggle('active', i === index));

  currentIndex = index;
  updateCaption(index);
  resetProgressBar();
}

function resetProgressBar() {
  const progress = document.getElementById('sl-progress');
  if (progress) progress.style.width = '0%';
}

function startVideoPlayback() {
  isPlaying = true;
  showSlide(currentIndex);
  runSlideCycle();
}

function runSlideCycle() {
  if (!isPlaying) return;

  const progress = document.getElementById('sl-progress');
  startTime = Date.now();
  
  const currentDuration = SLIDES[currentIndex].duration || SLIDE_DURATION;

  if (progressTimer) clearInterval(progressTimer);

  progressTimer = setInterval(() => {
    if (!isPlaying) return;
    const elapsed = Date.now() - startTime;
    const pct = Math.min(100, (elapsed / currentDuration) * 100);
    if (progress) progress.style.width = `${pct}%`;

    if (elapsed >= currentDuration) {
      clearInterval(progressTimer);
      nextSlide();
    }
  }, 30);
}

function nextSlide() {
  if (!isPlaying) return;
  const nextIdx = (currentIndex + 1) % SLIDES.length;
  showSlide(nextIdx);
  runSlideCycle();
}

function stopVideoPlayback() {
  isPlaying = false;
  if (progressTimer) clearInterval(progressTimer);
  if (slideTimer) clearTimeout(slideTimer);
  resetProgressBar();
}

function openSlideshow() {
  const modal = document.getElementById('slideshow');
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  currentIndex = 0;
  startVideoPlayback();
}

function closeSlideshow() {
  const modal = document.getElementById('slideshow');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  stopVideoPlayback();
}

function initSlideshowEvents() {
  buildSlideshowDOM();

  const closeBtn = document.getElementById('sl-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeSlideshow);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSlideshow();
  });
}

// ══════════════════════════════════════════
// PLAY BUTTON TRIGGER
// ══════════════════════════════════════════
function initPlayBtn() {
  const btn = document.getElementById('play-btn');
  console.log("btn", btn);
  if (!btn) return;

  btn.addEventListener('click', () => {
    console.log("Click vào nút play");
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    triggerBurst(cx, cy);

    setTimeout(openSlideshow, 250);
  });
}

// ══════════════════════════════════════════
// INIT
// ══════════════════════════════════════════
window.addEventListener('resize', () => { if (burstActive) resizeCanvas(); });

function initApp() {
  resizeCanvas();
  initConfetti();
  initSlideshowEvents();
  initPlayBtn();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
