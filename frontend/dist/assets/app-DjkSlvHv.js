(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();const l="http://localhost:8000",i={get token(){return localStorage.getItem("token")},get user(){try{return JSON.parse(localStorage.getItem("user"))}catch{return null}},set(e,o){localStorage.setItem("token",e),localStorage.setItem("user",JSON.stringify(o))},clear(){localStorage.removeItem("token"),localStorage.removeItem("user")},isLoggedIn(){return!!this.token}};async function u(e,o={}){const n={"Content-Type":"application/json",...o.headers};i.token&&(n.Authorization=`Bearer ${i.token}`),o.body instanceof FormData&&delete n["Content-Type"];const r=await fetch(l+e,{...o,headers:n});if(r.status===401){i.clear(),window.location.href="/pages/login.html";return}if(!r.ok){const t=await r.json().catch(()=>({detail:"Something went wrong"}));throw new Error(t.detail||JSON.stringify(t))}return r.status===204?null:r.json()}function c(e,o="info"){let n=document.getElementById("toast-container");n||(n=document.createElement("div"),n.id="toast-container",document.body.appendChild(n));const r={success:"✓",error:"✕",info:"ℹ"},t=document.createElement("div");t.className=`toast toast-${o}`,t.innerHTML=`<span>${r[o]}</span><span>${e}</span>`,n.appendChild(t),setTimeout(()=>{t.style.animation="fadeOut 0.3s ease forwards",setTimeout(()=>t.remove(),300)},3200)}function d(){const e=document.getElementById("nav-actions");e&&(i.isLoggedIn()?(i.user,e.innerHTML=`
      <a href="/pages/dashboard.html" class="btn btn-ghost btn-sm">Dashboard</a>
      <button onclick="logout()" class="btn btn-secondary btn-sm">Sign out</button>
    `):e.innerHTML=`
      <a href="/pages/login.html" class="btn btn-ghost btn-sm">Sign in</a>
      <a href="/pages/register.html" class="btn btn-primary btn-sm">List your business</a>
    `)}function p(){i.clear(),c("Signed out successfully","info"),setTimeout(()=>window.location.href="/",800)}const m=["Food & Beverage","Retail","Health & Wellness","Technology","Education","Finance","Real Estate","Beauty & Salon","Automotive","Entertainment","Travel & Tourism","Home Services","Legal","Sports & Fitness","Fashion","Other"];function g(e){var n;const o=e.logo_url?`<img src="${l}${e.logo_url}" alt="${e.name}" style="width:100%;height:100%;object-fit:cover;">`:`<div style="width:100%;height:100%;display:grid;place-items:center;font-size:2.2rem;background:var(--surface2);">${e.name.charAt(0)}</div>`;return`
    <a href="/pages/business.html?id=${e.id}" class="card business-card" style="display:block;">
      <div style="height:180px;overflow:hidden;position:relative;">
        ${o}
        <div style="position:absolute;top:12px;left:12px;">
          <span class="badge badge-accent">${e.category}</span>
        </div>
      </div>
      <div style="padding:20px;">
        <h3 style="font-size:1.1rem;margin-bottom:6px;">${e.name}</h3>
        <p style="color:var(--text2);font-size:0.87rem;margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${e.description}</p>
        <div style="display:flex;align-items:center;gap:6px;color:var(--text3);font-size:0.82rem;">
          <span>📍</span><span>${e.city}, ${e.state}</span>
        </div>
        ${(n=e.services)!=null&&n.length?`<div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:6px;">${e.services.slice(0,3).map(r=>`<span style="background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:3px 10px;font-size:0.78rem;color:var(--text2);">${r}</span>`).join("")}</div>`:""}
      </div>
    </a>`}function f(e){document.getElementById(e).classList.add("open")}function h(e){document.getElementById(e).classList.remove("open")}window.API=l;window.Auth=i;window.apiFetch=u;window.toast=c;window.initNavbar=d;window.logout=p;window.CATEGORIES=m;window.renderCard=g;window.openModal=f;window.closeModal=h;document.addEventListener("DOMContentLoaded",d);
