import"./app-yIULqX0W.js";Auth.isLoggedIn()||(window.location.href="/pages/login.html");const n=new URLSearchParams(location.search).get("id");n||(window.location.href="/pages/dashboard.html");const v=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];let a=[],i=null;async function m(){try{i=await apiFetch(`/listings/${n}`),document.getElementById("listing-name-sub").textContent=`Editing: ${i.name}`,a=i.services||[],u()}catch(s){toast(s.message,"error")}}function u(){document.getElementById("form-content").innerHTML=`
    <!-- IMAGES & LOGO -->
    <div class="form-section">
      <div class="form-section-title">Logo</div>
      <div class="form-section-sub">Upload a square logo for your business.</div>
      <div style="display:flex;align-items:flex-start;gap:20px;flex-wrap:wrap;">
        <div class="logo-preview" id="logo-preview">
          ${i.logo_url?`<img src="${API}${i.logo_url}" alt="">`:"🏪"}
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
        ${(i.images||[]).map(e=>`
          <div class="img-preview">
            <img src="${API}${e.image_url}" alt="">
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
            <input class="form-input" type="text" id="name" value="${i.name}">
          </div>
          <div class="form-group">
            <label class="form-label">Category</label>
            <select class="form-select" id="category">${CATEGORIES.map(e=>`<option value="${e}"${e===i.category?" selected":""}>${e}</option>`).join("")}</select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Description</label>
          <textarea class="form-textarea" id="description" rows="4">${i.description}</textarea>
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
        <div class="form-group"><label class="form-label">Address</label><input class="form-input" id="address" value="${i.address}"></div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">City</label><input class="form-input" id="city" value="${i.city}"></div>
          <div class="form-group"><label class="form-label">State</label><input class="form-input" id="state" value="${i.state}"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Country</label><input class="form-input" id="country" value="${i.country}"></div>
          <div class="form-group"><label class="form-label">Postal code</label><input class="form-input" id="postal_code" value="${i.postal_code}"></div>
        </div>
      </div>
    </div>

    <!-- CONTACT -->
    <div class="form-section">
      <div class="form-section-title">Contact</div>
      <div class="form-grid">
        <div class="form-row">
          <div class="form-group"><label class="form-label">Phone</label><input class="form-input" id="phone" value="${i.phone}"></div>
          <div class="form-group"><label class="form-label">Email</label><input class="form-input" id="email" value="${i.email}"></div>
        </div>
        <div class="form-group"><label class="form-label">Website</label><input class="form-input" id="website" value="${i.website||""}"></div>
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
    </div>`;const s=document.getElementById("hours-grid");v.forEach(e=>{var t;const l=((t=i.opening_hours)==null?void 0:t[e])||"";s.innerHTML+=`<div class="form-row" style="align-items:center;">
      <div style="display:flex;align-items:center;gap:12px;">
        <input type="checkbox" id="chk-${e}" ${l?"checked":""} style="width:16px;height:16px;accent-color:var(--accent);">
        <label for="chk-${e}" style="font-size:0.9rem;font-weight:500;min-width:90px;">${e}</label>
      </div>
      <input class="form-input" type="text" id="hrs-${e}" value="${l}" placeholder="9:00 AM – 6:00 PM">
    </div>`}),document.getElementById("service-input").addEventListener("keydown",e=>{e.key==="Enter"&&(e.preventDefault(),p())}),d()}function p(){const s=document.getElementById("service-input").value.trim();!s||a.includes(s)||(a.push(s),d(),document.getElementById("service-input").value="")}function g(s){a=a.filter(e=>e!==s),d()}function d(){document.getElementById("services-tags").innerHTML=a.map(s=>`<div class="service-tag-item">${s}<button onclick="removeService('${s}')">✕</button></div>`).join("")}async function f(s){if(!s.files[0])return;const e=new FormData;e.append("file",s.files[0]);try{const l=await apiFetch(`/listings/${n}/logo`,{method:"POST",body:e});document.getElementById("logo-preview").innerHTML=`<img src="${API}${l.logo_url}" alt="">`,toast("Logo updated!","success")}catch(l){toast(l.message,"error")}}async function b(s){const e=document.getElementById("images-preview");for(const l of s.files){const t=new FormData;t.append("file",l);try{const o=await apiFetch(`/listings/${n}/images`,{method:"POST",body:t});e.innerHTML+=`<div class="img-preview"><img src="${API}${o.image_url}" alt=""><div class="overlay"><button>✕</button></div></div>`,toast("Photo uploaded!","success")}catch(o){toast(o.message,"error")}}}async function y(){const s=document.getElementById("save-btn");s.disabled=!0,s.innerHTML='<span class="spinner"></span> Saving…';const e={};v.forEach(t=>{var o,c;if((o=document.getElementById(`chk-${t}`))!=null&&o.checked){const r=(c=document.getElementById(`hrs-${t}`))==null?void 0:c.value.trim();r&&(e[t]=r)}});const l={name:document.getElementById("name").value,category:document.getElementById("category").value,description:document.getElementById("description").value,address:document.getElementById("address").value,city:document.getElementById("city").value,state:document.getElementById("state").value,country:document.getElementById("country").value,postal_code:document.getElementById("postal_code").value,phone:document.getElementById("phone").value,email:document.getElementById("email").value,website:document.getElementById("website").value||null,opening_hours:Object.keys(e).length?e:null,services:a.length?a:null};try{await apiFetch(`/listings/${n}`,{method:"PUT",body:JSON.stringify(l)}),toast("Listing updated!","success"),s.disabled=!1,s.innerHTML="Save changes"}catch(t){toast(t.message,"error"),s.disabled=!1,s.innerHTML="Save changes"}}m();window.saveChanges=y;window.renderServices=d;window.load=m;window.addService=p;window.uploadImages=b;window.renderForm=u;window.removeService=g;window.uploadLogo=f;
