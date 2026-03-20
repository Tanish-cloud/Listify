import"./app-yIULqX0W.js";const t=new URLSearchParams(location.search).get("id");function g(i){document.getElementById("lightbox-img").src=i,document.getElementById("lightbox").classList.add("open")}function h(){document.getElementById("lightbox").classList.remove("open")}async function d(){if(!t){window.location.href="/pages/listings.html";return}try{const i=await apiFetch(`/listings/${t}`);document.title=`${i.name} — Listify`,c(i)}catch(i){document.getElementById("main-content").innerHTML=`<div class="empty-state"><div class="empty-icon">😕</div><h3>Business not found</h3><p>${i.message}</p></div>`}}function c(i){var e,a,n,o;const l=i.logo_url?`<img src="${API}${i.logo_url}" alt="${i.name}">`:`<span>${i.name.charAt(0)}</span>`,r=(e=i.images)!=null&&e.length?`<div class="images-grid">${i.images.map(s=>`<div class="img-thumb" onclick="openLightbox('${API}${s.image_url}')"><img src="${API}${s.image_url}" alt=""></div>`).join("")}</div>`:'<p style="color:var(--text3);font-size:0.9rem;">No images uploaded yet.</p>',v=(a=i.services)!=null&&a.length?i.services.map(s=>`<span class="service-tag">${s}</span>`).join(""):'<span style="color:var(--text3);font-size:0.9rem;">No services listed.</span>',m=i.opening_hours?Object.entries(i.opening_hours).map(([s,p])=>`<div class="hour-item"><div class="hour-day">${s}</div><div class="hour-time">${p}</div></div>`).join(""):'<p style="color:var(--text3);font-size:0.9rem;">Hours not provided.</p>';document.getElementById("main-content").innerHTML=`
    <div class="business-hero">
      <div class="biz-cover" style="${i.logo_url?"":"background:var(--surface2);"}">
        ${(n=i.images)!=null&&n[0]?`<img src="${API}${i.images[0].image_url}" alt="${i.name}">`:`<span style="opacity:.2;">${i.name.charAt(0)}</span>`}
        <div class="biz-logo">${l}</div>
      </div>
      <div class="biz-header">
        <div class="biz-meta">
          <span class="badge badge-accent">${i.category}</span>
          ${i.city?`<span style="color:var(--text3);font-size:0.85rem;">📍 ${i.city}, ${i.state}</span>`:""}
        </div>
        <h1 class="biz-name">${i.name}</h1>
        <p class="biz-desc">${i.description}</p>
      </div>
    </div>

    <div class="biz-layout">
      <div>
        <div class="info-card">
          <h3>Services</h3>
          <div>${v}</div>
        </div>
        <div class="info-card">
          <h3>Photos</h3>
          ${r}
        </div>
        <div class="info-card">
          <h3>Opening Hours</h3>
          <div class="hours-grid">${m}</div>
        </div>
      </div>

      <div>
        <div class="info-card">
          <h3>Contact & Location</h3>
          <div class="info-row"><span class="info-icon">📍</span><div><div class="info-label">Address</div><div class="info-value">${i.address}, ${i.city}, ${i.state} ${i.postal_code}, ${i.country}</div></div></div>
          <div class="info-row"><span class="info-icon">📞</span><div><div class="info-label">Phone</div><div class="info-value"><a href="tel:${i.phone}" style="color:var(--accent2);">${i.phone}</a></div></div></div>
          <div class="info-row"><span class="info-icon">✉️</span><div><div class="info-label">Email</div><div class="info-value"><a href="mailto:${i.email}" style="color:var(--accent2);">${i.email}</a></div></div></div>
          ${i.website?`<div class="info-row"><span class="info-icon">🌐</span><div><div class="info-label">Website</div><div class="info-value"><a href="${i.website}" target="_blank" style="color:var(--accent2);">${i.website.replace(/^https?:\/\//,"")}</a></div></div></div>`:""}
        </div>

        ${Auth.isLoggedIn()&&((o=Auth.user)==null?void 0:o.id)===i.owner_id?`
        <div class="info-card" style="border-color:rgba(108,99,255,0.3);">
          <h3>Owner actions</h3>
          <div style="display:flex;flex-direction:column;gap:10px;margin-top:4px;">
            <a href="/pages/edit-listing.html?id=${i.id}" class="btn btn-secondary btn-sm">✏️ Edit listing</a>
          </div>
        </div>`:""}
      </div>
    </div>`}d();window.openLightbox=g;window.load=d;window.closeLightbox=h;window.renderBusiness=c;
