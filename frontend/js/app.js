const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/* ─── TOKEN ─── */
const Auth = {
  get token() { return localStorage.getItem('token'); },
  get user() { try { return JSON.parse(localStorage.getItem('user')); } catch { return null; } },
  set(token, user) { localStorage.setItem('token', token); localStorage.setItem('user', JSON.stringify(user)); },
  clear() { localStorage.removeItem('token'); localStorage.removeItem('user'); },
  isLoggedIn() { return !!this.token; },
};

/* ─── API FETCH ─── */
async function apiFetch(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (Auth.token) headers['Authorization'] = `Bearer ${Auth.token}`;
  if (options.body instanceof FormData) delete headers['Content-Type'];

  const res = await fetch(API + path, { ...options, headers });
  if (res.status === 401) { Auth.clear(); window.location.href = '/pages/login.html'; return; }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Something went wrong' }));
    throw new Error(err.detail || JSON.stringify(err));
  }
  if (res.status === 204) return null;
  return res.json();
}

/* ─── TOAST ─── */
function toast(msg, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
  container.appendChild(el);
  setTimeout(() => {
    el.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => el.remove(), 300);
  }, 3200);
}

/* ─── NAVBAR INIT ─── */
function initNavbar() {
  const actionsEl = document.getElementById('nav-actions');
  if (!actionsEl) return;
  if (Auth.isLoggedIn()) {
    const user = Auth.user;
    actionsEl.innerHTML = `
      <a href="/pages/dashboard.html" class="btn btn-ghost btn-sm">Dashboard</a>
      <button onclick="logout()" class="btn btn-secondary btn-sm">Sign out</button>
    `;
  } else {
    actionsEl.innerHTML = `
      <a href="/pages/login.html" class="btn btn-ghost btn-sm">Sign in</a>
      <a href="/pages/register.html" class="btn btn-primary btn-sm">List your business</a>
    `;
  }
}

function logout() {
  Auth.clear();
  toast('Signed out successfully', 'info');
  setTimeout(() => window.location.href = '/', 800);
}

/* ─── CATEGORY LIST ─── */
const CATEGORIES = [
  'Food & Beverage', 'Retail', 'Health & Wellness', 'Technology',
  'Education', 'Finance', 'Real Estate', 'Beauty & Salon',
  'Automotive', 'Entertainment', 'Travel & Tourism', 'Home Services',
  'Legal', 'Sports & Fitness', 'Fashion', 'Other'
];

/* ─── RENDER BUSINESS CARD ─── */
function renderCard(b) {
  const img = b.logo_url
    ? `<img src="${API}${b.logo_url}" alt="${b.name}" style="width:100%;height:100%;object-fit:cover;">`
    : `<div style="width:100%;height:100%;display:grid;place-items:center;font-size:2.2rem;background:var(--surface2);">${b.name.charAt(0)}</div>`;

  return `
    <a href="/pages/business.html?id=${b.id}" class="card business-card" style="display:block;">
      <div style="height:180px;overflow:hidden;position:relative;">
        ${img}
        <div style="position:absolute;top:12px;left:12px;">
          <span class="badge badge-accent">${b.category}</span>
        </div>
      </div>
      <div style="padding:20px;">
        <h3 style="font-size:1.1rem;margin-bottom:6px;">${b.name}</h3>
        <p style="color:var(--text2);font-size:0.87rem;margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${b.description}</p>
        <div style="display:flex;align-items:center;gap:6px;color:var(--text3);font-size:0.82rem;">
          <span>📍</span><span>${b.city}, ${b.state}</span>
        </div>
        ${b.services?.length ? `<div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:6px;">${b.services.slice(0,3).map(s=>`<span style="background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:3px 10px;font-size:0.78rem;color:var(--text2);">${s}</span>`).join('')}</div>` : ''}
      </div>
    </a>`;
}

/* ─── MODAL HELPERS ─── */
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

/* ─── INIT ─── */
window.API = API;
window.Auth = Auth;
window.apiFetch = apiFetch;
window.toast = toast;
window.initNavbar = initNavbar;
window.logout = logout;
window.CATEGORIES = CATEGORIES;
window.renderCard = renderCard;
window.openModal = openModal;
window.closeModal = closeModal;

document.addEventListener('DOMContentLoaded', initNavbar);
