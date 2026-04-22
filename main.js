/* ─── LOADER ─── */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('done'), 1600);
});

/* ─── CURSOR ─── */
const cur = document.getElementById('cur');
const dot = document.getElementById('cur-dot');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function animCursor() {
  rx += (mx - rx) * .12;
  ry += (my - ry) * .12;
  cur.style.left = mx + 'px';
  cur.style.top = my + 'px';
  ring.style.left = (rx - 19) + 'px';
  ring.style.top = (ry - 19) + 'px';
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a,button,.svc-item,.proj-card,.vision-card,.proc-card,.t-item').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

/* ─── NAV ─── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 60));

/* ─── SCROLL REVEAL ─── */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('vis');
      obs.unobserve(e.target);
    }
  });
}, { threshold: .1 });

document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(el => obs.observe(el));

/* ─── COUNTERS ─── */
function animCount(el) {
  const target = +el.dataset.count;
  const suf = el.dataset.suf || '';
  let cur = 0;
  const step = target / 50;
  const iv = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = Math.round(cur) + suf;
    if (cur >= target) clearInterval(iv);
  }, 30);
}

const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animCount(e.target);
      countObs.unobserve(e.target);
    }
  });
}, { threshold: .5 });

document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

/* ─── SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ─── EASTER EGG: KONAMI ─── */
const K = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let ki = 0;

document.addEventListener('keydown', e => {
  if (e.keyCode === K[ki]) {
    ki++;
    if (ki === K.length) { openEgg(); ki = 0; }
  } else {
    ki = 0;
  }
});

let lc = 0, lt;

document.querySelector('.logo').addEventListener('click', () => {
  lc++; clearTimeout(lt);
  lt = setTimeout(() => lc = 0, 1400);
  if (lc >= 5) { openEgg(); lc = 0; }
});

document.querySelector('.foot-logo').addEventListener('click', () => {
  lc++; clearTimeout(lt);
  lt = setTimeout(() => lc = 0, 1400);
  if (lc >= 5) { openEgg(); lc = 0; }
});

function openEgg() { document.getElementById('egg').classList.add('on'); }
function closeEgg() { document.getElementById('egg').classList.remove('on'); }

document.getElementById('egg').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeEgg();
});

/* ─── HAMBURGER MENU ─── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMenu(open) {
  hamburger.classList.toggle('open', open);
  mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

hamburger.addEventListener('click', () => toggleMenu(!hamburger.classList.contains('open')));

document.querySelectorAll('.mobile-link').forEach(a => {
  a.addEventListener('click', () => toggleMenu(false));
});

/* ─── PARALLAX HERO BG TEXT ─── */
document.addEventListener('scroll', () => {
  const bg = document.querySelector('.hero-bg-text');
  if (bg) bg.style.transform = `translate(-50%,calc(-50% + ${scrollY * .18}px)) scale(1)`;
});

/* ─── HOVER TILT on proj cards ─── */
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `translateY(-6px) perspective(800px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});  