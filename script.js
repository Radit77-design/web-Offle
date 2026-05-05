// ════════════════════════════════════════
// OFFLE — Premium Website JS
// ════════════════════════════════════════

// ── LOADER ──────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
});

// ── CUSTOM CURSOR ────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateCursor() {
  fx += (mx - fx) * 0.1;
  fy += (my - fy) * 0.1;
  follower.style.left = fx + 'px';
  follower.style.top = fy + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ── NAVBAR SCROLL ────────────────────────
const nav = document.getElementById('nav');
const backTop = document.getElementById('back-top');

window.addEventListener('scroll', () => {
  const y = window.scrollY;

  // Scrolled class
  nav.classList.toggle('scrolled', y > 80);

  // Back to top
  backTop.classList.toggle('visible', y > 400);

  // Active nav link
  document.querySelectorAll('section[id]').forEach(sec => {
    const top = sec.offsetTop - 120;
    const bot = top + sec.offsetHeight;
    if (y >= top && y < bot) {
      document.querySelectorAll('.nav-link').forEach(l => l.removeAttribute('data-active'));
      const active = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (active) active.setAttribute('data-active', '');
    }
  });
});

// ── HAMBURGER MENU ───────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mm-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── BACK TO TOP ──────────────────────────
backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── REVEAL ON SCROLL ─────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── MENU CARD TILT ───────────────────────
document.querySelectorAll('.menu-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * 6;
    const ry = ((x - cx) / cx) * -6;
    card.style.transform = `translateY(-10px) perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── LOKASI CARD ACTIVE ───────────────────
document.querySelectorAll('.lokasi-card').forEach(card => {
  card.addEventListener('click', () => {
    // Click already handled by the anchor inside
  });
});

// ── SMOOTH NUMBER COUNT ──────────────────
function countUp(el, target, duration = 1500) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Number.isInteger(target) ? Math.floor(start) : start.toFixed(1);
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.hstat-n').forEach(el => {
        const text = el.textContent;
        const num = parseFloat(text);
        if (!isNaN(num)) {
          const suffix = text.replace(/[\d.]/g, '');
          const original = el.textContent;
          // Only animate pure numbers
          if (suffix === '+' || suffix === '') {
            el.textContent = '0' + suffix;
            countUp({ textContent: '0', set(v) { el.textContent = Math.floor(v) + suffix; } }, num);
          }
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);

// ── FORM SUBMIT ──────────────────────────
function submitForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-btn');
  const textEl = btn.querySelector('.btn-text');
  const arrowEl = btn.querySelector('.btn-arrow');

  // Sending state
  textEl.textContent = 'Mengirim...';
  arrowEl.textContent = '⟳';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  setTimeout(() => {
    textEl.textContent = 'Terkirim!';
    arrowEl.textContent = '✓';
    btn.style.background = '#2A8A1A';
    btn.style.opacity = '1';

    setTimeout(() => {
      textEl.textContent = 'Kirim Pesan';
      arrowEl.textContent = '→';
      btn.style.background = '';
      btn.disabled = false;
      e.target.reset();
    }, 3000);
  }, 1500);
}

// ── PARALLAX HERO ORBS ───────────────────
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  document.querySelectorAll('.hero-orb').forEach((orb, i) => {
    const factor = (i + 1) * 0.4;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

// ── TICKER PAUSE ON HOVER ────────────────
const ticker = document.querySelector('.ticker');
if (ticker) {
  ticker.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
  ticker.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
}

// ── ACTIVE NAV STYLE ─────────────────────
document.querySelectorAll('.nav-link').forEach(link => {
  link.style.cssText = '';
});
const style = document.createElement('style');
style.textContent = `.nav-link[data-active] { color: var(--gold) !important; }
.nav-link[data-active]::after { width: 100% !important; }`;
document.head.appendChild(style);
