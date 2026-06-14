/* ============================================
   NIRMALYA SARKAR — TUITION WEBSITE
   script.js — All interactivity
   ============================================ */

// ─── NAVBAR SCROLL ───────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 20) {
    nav.style.boxShadow = '0 2px 16px rgba(0,0,0,0.1)';
  } else {
    nav.style.boxShadow = '0 1px 8px rgba(0,0,0,0.06)';
  }
});

// ─── MOBILE NAV TOGGLE ───────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ─── FAQ ACCORDION ───────────────────────────
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-q').forEach(q => q.classList.remove('open'));
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));

  // Open clicked (if it was closed)
  if (!isOpen) {
    btn.classList.add('open');
    answer.classList.add('open');
  }
}

// ─── FEE CALCULATOR ──────────────────────────
function calcFee() {
  const checked = document.querySelectorAll('.day-options input[type="checkbox"]:checked');
  const days    = checked.length;
  const classes = days * 4; // ~4 weeks per month
  const total   = classes * 1000;

  document.getElementById('daysCount').textContent  = days;
  document.getElementById('classCount').textContent = classes;
  document.getElementById('totalFee').textContent   = '₹' + total.toLocaleString('en-IN');
}

function setPreset(dayValues) {
  // Uncheck all first
  document.querySelectorAll('.day-options input[type="checkbox"]').forEach(cb => {
    cb.checked = dayValues.includes(cb.value);
  });
  calcFee();
}

// ─── ENROLLMENT FORM VALIDATION & WHATSAPP ───
document.getElementById('enrollForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const fields = [
    { id: 'parentName',   label: 'Parent Name',     type: 'text'   },
    { id: 'parentMobile', label: 'Mobile Number',   type: 'phone'  },
    { id: 'studentName',  label: 'Student Name',    type: 'text'   },
    { id: 'studentAge',   label: 'Student Age',     type: 'text'   },
    { id: 'studentClass', label: 'Class',           type: 'select' },
    { id: 'board',        label: 'Board',           type: 'select' },
    { id: 'school',       label: 'School Name',     type: 'text'   },
    { id: 'subject',      label: 'Subject',         type: 'select' },
    { id: 'timeSlot',     label: 'Time Slot',       type: 'select' },
  ];

  let valid = true;

  fields.forEach(f => {
    const el  = document.getElementById(f.id);
    const err = document.getElementById('err-' + f.id);
    el.classList.remove('error');
    if (err) err.textContent = '';

    const val = el.value.trim();

    if (!val) {
      el.classList.add('error');
      if (err) err.textContent = f.label + ' is required.';
      valid = false;
    } else if (f.type === 'phone') {
      if (!/^[6-9]\d{9}$/.test(val)) {
        el.classList.add('error');
        if (err) err.textContent = 'Enter a valid 10-digit Indian mobile number.';
        valid = false;
      }
    }
  });

  if (!valid) {
    // Scroll to first error
    const firstErr = document.querySelector('.error');
    if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // Build WhatsApp message
  const pName   = document.getElementById('parentName').value.trim();
  const pMobile = document.getElementById('parentMobile').value.trim();
  const pEmail  = document.getElementById('parentEmail').value.trim();
  const sName   = document.getElementById('studentName').value.trim();
  const sAge    = document.getElementById('studentAge').value.trim();
  const sClass  = document.getElementById('studentClass').value;
  const board   = document.getElementById('board').value;
  const school  = document.getElementById('school').value.trim();
  const subject = document.getElementById('subject').value;
  const slot    = document.getElementById('timeSlot').value;
  const notes   = document.getElementById('notes').value.trim();

  const msg =
    `📚 *New Enrollment Request*\n\n` +
    `*Parent Name:* ${pName}\n` +
    `*Mobile:* ${pMobile}\n` +
    (pEmail ? `*Email:* ${pEmail}\n` : '') +
    `\n*Student Name:* ${sName}\n` +
    `*Age:* ${sAge}\n` +
    `*Class:* ${sClass}\n` +
    `*Board:* ${board}\n` +
    `*School:* ${school}\n` +
    `*Subject:* ${subject}\n` +
    `*Preferred Slot:* ${slot}\n` +
    (notes ? `*Notes:* ${notes}\n` : '') +
    `\n_Sent from nirmalyatutor.in_`;

  const waUrl = `https://wa.me/917278062793?text=${encodeURIComponent(msg)}`;

  document.getElementById('formSuccess').style.display = 'block';

  setTimeout(() => {
    window.open(waUrl, '_blank');
  }, 600);
});

// ─── SCROLL REVEAL (lightweight) ─────────────
const revealEls = document.querySelectorAll(
  '.why-card, .subject-card, .result-card, .fee-card, .testi-card, .qual-list li'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
