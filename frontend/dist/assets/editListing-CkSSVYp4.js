import"./app-DjkSlvHv.js";Auth.isLoggedIn()||(window.location.href="/pages/login.html");const t=new URLSearchParams(location.search).get("id");t||(window.location.href="/pages/dashboard.html");const r=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];let l=[],e=null;async function c(){try{e=await apiFetch(`/listings/${t}`),document.getElementById("listing-name-sub").textContent=`Editing: ${e.name}`,l=e.services||[],n()}catch(s){toast(s.message,"error")}}function n(){document.getElementById("form-content").innerHTML=`
    <!-- IMAGES & LOGO -->
    <div class="form-section">
      <div class="form-section-title">Logo</div>
      <div class="form-section-sub">Upload a square logo for your business.</div>
      <div style="display:flex;align-items:flex-start;gap:20px;flex-wrap:wrap;">
        <div class="logo-preview" id="logo-preview">
          ${e.logo_url?`<img src="${API}${e.logo_url}" alt="">`:"🏪"}
        </div>
        <div style="flex:1;">
          <label class="upload-zone" for="logo-file">
            <div class="upload-icon">☁️</div>
            <strong>Click to upload logo</strong>
            <p>PNG, JPG or WEBP · square image recommended</p>
          </label>
          <input type="file" id="logo-file" accept="image/*" style="display:none;" onchange="uploadLogo(this)">
        </div>
      </div>
    </div>

    <div class="form-section">
      <div class="form-section-title">Photos</div>
      <div class="form-section-sub">Add photos to make your listing stand out.</div>
      <label class="upload-zone" for="img-files">
        <div class="upload-icon">📸</div>
        <strong>Click to upload photos</strong>
        <p>PNG, JPG or WEBP · multiple files allowed</p>
      </label>
      <input type="file" id="img-files" accept="image/*" multiple style="display:none;" onchange="uploadImages(this)">
      <div class="images-preview" id="images-preview">
        ${(e.images||[]).map(i=>`
          <div class="img-preview">
            <img src="${API}${i.image_url}" alt="">
            <div class="overlay"><button onclick="">✕</button></div>
          </div>`).join("")}
      </div>
    </div>

    <!-- BASIC INFO -->
    <div class="form-section">
      <div class="form-section-title">Basic information</div>
      <div class="form-section-sub">Update your business details.</div>
      <div class="form-grid">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Business name</label>
            <input class="form-input" type="text" id="name" value="${e.name}">
          </div>
          <div class="form-group">
            <label class="form-label">Category</label>
            <select class="form-select" id="category">${CATEGORIES.map(i=>`<option value="${i}"${i===e.category?" selected":""}>${i}</option>`).join("")}</select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea class="form-textarea" id="description" rows="4">${e.description}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Services</label>
          <div class="services-input-row">
            <input class="form-input" type="text" id="service-input" placeholder="Add a service…">
            <button type="button" class="btn btn-secondary" onclick="addService()">Add</button>
          </div>
          <div class="services-tags" id="services-tags"></div>
        </div>
      </div>
    </div>

    <!-- LOCATION -->
    <div class="form-section">
      <div class="form-section-title">Location</div>
      <div class="form-grid">
        <div class="form-group"><label class="form-label">Address</label><input class="form-input" id="address" value="${e.address}"></div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">City</label><input class="form-input" id="city" value="${e.city}"></div>
          <div class="form-group"><label class="form-label">State</label><input class="form-input" id="state" value="${e.state}"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Country</label><input class="form-input" id="country" value="${e.country}"></div>
          <div class="form-group"><label class="form-label">Postal code</label><input class="form-input" id="postal_code" value="${e.postal_code}"></div>
        </div>
      </div>
    </div>

    <!-- CONTACT -->
    <div class="form-section">
      <div class="form-section-title">Contact</div>
      <div class="form-grid">
        <div class="form-row">
          <div class="form-group"><label class="form-label">Phone</label><input class="form-input" id="phone" value="${e.phone}"></div>
          <div class="form-group"><label class="form-label">Email</label><input class="form-input" id="email" value="${e.email}"></div>
        </div>
        <div class="form-group"><label class="form-label">Website</label><input class="form-input" id="website" value="${e.website||""}"></div>
      </div>
    </div>

    <!-- HOURS -->
    <div class="form-section">
      <div class="form-section-title">Opening hours</div>
      <div class="form-grid" id="hours-grid"></div>
    </div>

    <div class="save-bar">
      <div class="save-bar-inner">
        <a href="/pages/dashboard.html" class="btn btn-ghost">Cancel</a>
        <button class="btn btn-primary btn-lg" id="save-btn" onclick="saveChanges()">Save changes</button>
      </div>
    </div>`;const s=document.getElementById("hours-grid");r.forEach(i=>{var o;const a=((o=e.opening_hours)==null?void 0:o[i])||"";s.innerHTML+=`<div class="form-row" style="align-items:center;">
      <div style="display:flex;align-items:center;gap:12px;">
        <input type="checkbox" id="chk-${i}" ${a?"checked":""} style="width:16px;height:16px;accent-color:var(--accent);">
        <label for="chk-${i}" style="font-size:0.9rem;font-weight:500;min-width:90px;">${i}</label>
      </div>
      <input class="form-input" type="text" id="hrs-${i}" value="${a}" placeholder="9:00 AM – 6:00 PM">
    </div>`}),document.getElementById("service-input").addEventListener("keydown",i=>{i.key==="Enter"&&(i.preventDefault(),v())}),d()}function v(){const s=document.getElementById("service-input").value.trim();!s||l.includes(s)||(l.push(s),d(),document.getElementById("service-input").value="")}function d(){document.getElementById("services-tags").innerHTML=l.map(s=>`<div class="service-tag-item">${s}<button onclick="removeService('${s}')">✕</button></div>`).join("")}c();
