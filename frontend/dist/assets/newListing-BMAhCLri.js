import"./app-DjkSlvHv.js";Auth.isLoggedIn()||(window.location.href="/pages/login.html");const n=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],t=[],i=document.getElementById("category");CATEGORIES.forEach(e=>i.innerHTML+=`<option value="${e}">${e}</option>`);const c=document.getElementById("hours-grid");n.forEach(e=>{c.innerHTML+=`
    <div class="form-row" style="align-items:center;">
      <div style="display:flex;align-items:center;gap:12px;">
        <input type="checkbox" id="chk-${e}" checked style="width:16px;height:16px;accent-color:var(--accent);">
        <label for="chk-${e}" style="font-size:0.9rem;font-weight:500;min-width:90px;">${e}</label>
      </div>
      <input class="form-input" type="text" id="hrs-${e}" placeholder="9:00 AM – 6:00 PM">
    </div>`});function o(){const e=document.getElementById("service-input").value.trim();!e||t.includes(e)||(t.push(e),r(),document.getElementById("service-input").value="")}function r(){document.getElementById("services-tags").innerHTML=t.map(e=>`<div class="service-tag-item">${e}<button onclick="removeService('${e}')">✕</button></div>`).join("")}document.getElementById("service-input").addEventListener("keydown",e=>{e.key==="Enter"&&(e.preventDefault(),o())});
