// Navbar scroll
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
  document.getElementById('navLinks').classList.remove('open');
}));

// Fade up observer
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), 80);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach((el, i) => {
  el.style.transitionDelay = (i % 4 * 0.1) + 's';
  obs.observe(el);
});

// Gallery slider
var gIdx = 0;
function slideG(dir) { gIdx = (gIdx + dir + 4) % 4; updateG(); }
function goSlide(n) { gIdx = n; updateG(); }
function updateG() {
  var track = document.getElementById('galleryTrack');
  if (!track) return;
  var wrap = track.parentElement;
  var w = wrap.getBoundingClientRect().width || wrap.offsetWidth;
  if (!w) { setTimeout(updateG, 100); return; }
  track.style.transform = 'translateX(-' + (gIdx * w) + 'px)';
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === gIdx);
  });
}
setInterval(() => slideG(1), 4500);

// Form submit - Formspree
async function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const form = document.getElementById('apptForm');
  const successMsg = document.getElementById('successMsg');
  const errorMsg = document.getElementById('errorMsg');

  btn.textContent = 'Bhej rahe hain...';
  btn.disabled = true;
  btn.style.opacity = '0.7';
  errorMsg.style.display = 'none';

  const formData = new FormData(form);

  try {
    const response = await fetch('https://formspree.io/f/mlgzqejn', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });
    const result = await response.json();
    if (response.ok) {
      form.style.display = 'none';
      successMsg.style.display = 'block';
    } else {
      errorMsg.textContent = (result.errors && result.errors[0] && result.errors[0].message) || 'Kuch galat hua! Dobara try karein.';
      errorMsg.style.display = 'block';
      btn.textContent = 'Book Appointment →';
      btn.disabled = false;
      btn.style.opacity = '1';
    }
  } catch (err) {
    errorMsg.textContent = 'Network error! Internet check karein.';
    errorMsg.style.display = 'block';
    btn.textContent = 'Book Appointment →';
    btn.disabled = false;
    btn.style.opacity = '1';
  }
}

  // ── LAZY LOADING ──
  // Hero background lazy load
  (function() {
    var hero = document.getElementById('hero');
    if (!hero) return;
    var bg = hero.getAttribute('data-bg');
    if (!bg) return;
    var img = new window.Image();
    img.onload = function() {
      hero.style.background = 'linear-gradient(rgba(15,23,42,0.65), rgba(15,23,42,0.55)), url("' + bg + '") center top / cover no-repeat';
    };
    img.src = bg;
  })();

  // Intersection Observer for all data-src images
  var lazyImages = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    var imgObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px 0px' });

    lazyImages.forEach(function(img) {
      imgObserver.observe(img);
    });
  } else {
    // Fallback for older browsers
    lazyImages.forEach(function(img) {
      img.src = img.getAttribute('data-src');
    });
  }


  // Review Slider
  var rIdx = 0, rTotal = 5;
  function slideReview(dir) { rIdx = (rIdx + dir + rTotal) % rTotal; updateReview(); }
  function goReview(n)      { rIdx = n; updateReview(); }
  function updateReview() {
    var track = document.getElementById('reviewTrack');
    if (!track) return;
    track.style.transform = 'translateX(-' + (rIdx * 100) + '%)';
    document.querySelectorAll('.review-dot').forEach(function(d,i){ d.classList.toggle('active', i===rIdx); });
  }
  setInterval(function(){ slideReview(1); }, 5000);

  // Why Section Before/After slider
  var baIdx = 0;
  var baTotal = 5;
  function slideBA(dir) { baIdx = (baIdx + dir + baTotal) % baTotal; updateBA(); }
  function goBASlide(n) { baIdx = n; updateBA(); }
  function updateBA() {
    var track = document.getElementById('galleryTrack2');
    if (!track) return;
    var wrap = track.parentElement;
    var w = wrap.getBoundingClientRect().width || wrap.offsetWidth;
    if (!w) { setTimeout(updateBA, 100); return; }
    track.style.transform = 'translateX(-' + (baIdx * w) + 'px)';
    var imgs = track.querySelectorAll('img');
    [baIdx, (baIdx+1)%baTotal].forEach(function(i) {
      if (imgs[i] && imgs[i].getAttribute('data-src')) {
        imgs[i].src = imgs[i].getAttribute('data-src');
        imgs[i].removeAttribute('data-src');
      }
    });
    var dots = document.querySelectorAll('#galleryDots2 .dot');
    dots.forEach(function(d,i) { d.classList.toggle('active', i === baIdx); });
  }
  setInterval(function() { slideBA(1); }, 5000);

  // Services Before/After slider
  var sIdx = 0;
  var sTotal = 4;
  function slideServ(dir) { sIdx = (sIdx + dir + sTotal) % sTotal; updateServ(); }
  function goServSlide(n) { sIdx = n; updateServ(); }
  function updateServ() {
    var track = document.getElementById('servGalleryTrack');
    if (!track) return;
    var wrap = track.parentElement;
    var w = wrap.getBoundingClientRect().width || wrap.offsetWidth;
    if (!w) { setTimeout(updateServ, 100); return; }
    track.style.transform = 'translateX(-' + (sIdx * w) + 'px)';
    // Load image if lazy
    var imgs = track.querySelectorAll('img');
    [sIdx, (sIdx+1)%sTotal].forEach(function(i) {
      if (imgs[i] && imgs[i].getAttribute('data-src')) {
        imgs[i].src = imgs[i].getAttribute('data-src');
        imgs[i].removeAttribute('data-src');
      }
    });
    document.querySelectorAll('#servDots .dot').forEach(function(d,i) {
      d.classList.toggle('active', i === sIdx);
    });
  }
  setInterval(function() { slideServ(1); }, 5000);

  // Re-calculate on resize
  window.addEventListener('resize', function() { updateG(); updateBA(); updateServ(); });
  window.addEventListener('load', function() {
    setTimeout(function() { updateG(); updateBA(); updateServ(); }, 50);
  });