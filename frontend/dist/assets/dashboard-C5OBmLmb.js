import"./app-DjkSlvHv.js";Auth.isLoggedIn()||(window.location.href="/pages/login.html");async function l(){try{const i=await apiFetch("/listings/me"),e=Auth.user;document.getElementById("user-name").textContent=(e==null?void 0:e.full_name)||(e==null?void 0:e.email)||"Client",document.getElementById("stat-total").textContent=i.length;const a=document.getElementById("dash-grid");let n=`<div class="new-listing-card" onclick="window.location.href='/pages/new-listing.html'">
      <div class="plus">+</div>
      <strong style="color:var(--text2);">Add new listing</strong>
      <p>List a new business</p>
    </div>`;i.length===0?n+=`<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:12px;padding:40px;color:var(--text3);">
        <div style="font-size:2rem;opacity:0.3;">🏪</div>
        <p>No listings yet. Create your first one!</p>
      </div>`:n+=i.map(t=>{var s;return`
        <div class="listing-manage-card">
          <div class="lmc-cover">
            ${(s=t.images)!=null&&s[0]?`<img src="${API}${t.images[0].image_url}" alt="">`:t.name.charAt(0)}
          </div>
          <div class="lmc-body">
            <div class="lmc-name">${t.name}</div>
            <div class="lmc-meta">
              <span class="badge badge-accent" style="margin-right:6px;">${t.category}</span>
              ${t.city}, ${t.state}
            </div>
            <div class="lmc-actions">
              <a href="/pages/business.html?id=${t.id}" class="btn btn-ghost btn-sm">View</a>
              <a href="/pages/edit-listing.html?id=${t.id}" class="btn btn-secondary btn-sm">Edit</a>
              <button class="btn btn-danger btn-sm" onclick="confirmDelete(${t.id})">Delete</button>
            </div>
          </div>
        </div>`}).join(""),a.innerHTML=n}catch(i){toast(i.message,"error")}}l();
