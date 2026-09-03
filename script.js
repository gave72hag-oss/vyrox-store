const SUPABASE_URL = "https://xdcwbkynggweuvadupdp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_uYSr_7dCLzUswh0REq75VQ_qGx5-biG";

const { createClient } = window.supabase;
const supabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const products = [
  {name:"متابعين تيك توك",cat:"TikTok",qty:"1000 متابع",price:2.35,icon:"🎵"},
  {name:"متابعين انستقرام",cat:"Instagram",qty:"1000 متابع",price:2.45,icon:"📸"},
  {name:"مشاهدات يوتيوب",cat:"YouTube",qty:"1000 مشاهدة",price:1.25,icon:"▶️"},
  {name:"مشاهدات تيك توك",cat:"TikTok",qty:"10000 مشاهدة",price:1.20,icon:"🎵"},
  {name:"لايكات انستقرام",cat:"Instagram",qty:"1000 لايك",price:1.80,icon:"❤️"}
];

let cart = [];

const productsEl = document.getElementById("products");

function renderProducts(list = products) {
  productsEl.innerHTML = list.map((p,i) =>
    `<article class="product">
      <span class="tag">${i===1 ? "الأفضل" : "مميز"}</span>
      <div class="ico">${p.icon}</div>
      <h3>${p.name}</h3>
      <p>${p.qty} · خدمة رقمية تجريبية</p>
      <div class="price">$${p.price.toFixed(2)}</div>
      <button class="add" onclick="addToCart(${products.indexOf(p)})">اطلب الآن 🛒</button>
    </article>`
  ).join("");
}

function addToCart(i) {
  cart.push(products[i]);
  updateCart();
  openCart();
}

function updateCart() {
  document.getElementById("cartCount").textContent = cart.length;

  document.getElementById("cartItems").innerHTML = cart.length
    ? cart.map((p,i) =>
      `<div class="cart-row">
        <span>${p.name}</span>
        <b>$${p.price.toFixed(2)}</b>
        <button onclick="removeItem(${i})">×</button>
      </div>`
    ).join("")
    : "<p>السلة فارغة.</p>";

  document.getElementById("total").textContent =
    "$" + cart.reduce((s,p) => s + p.price, 0).toFixed(2);
}

function removeItem(i) {
  cart.splice(i,1);
  updateCart();
}

function openCart() {
  document.getElementById("drawer").classList.add("open");
  document.getElementById("overlay").classList.add("show");
}

function closeCart() {
  document.getElementById("drawer").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
}

/* تسجيل الدخول */

function createLoginModal() {
  if (document.getElementById("loginModal")) return;

  const modal = document.createElement("div");
  modal.id = "loginModal";

  modal.style.cssText = `
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.75);
    display:none;
    align-items:center;
    justify-content:center;
    z-index:9999;
    direction:rtl;
    padding:20px;
  `;

  modal.innerHTML = `
    <div style="
      width:100%;
      max-width:400px;
      background:#111827;
      padding:25px;
      border-radius:18px;
      box-shadow:0 20px 60px rgba(0,0,0,.5);
      color:white;
    ">

      <button id="closeLogin" style="
        float:left;
        background:none;
        border:0;
        color:#aaa;
        font-size:25px;
        cursor:pointer;
      ">×</button>

      <h2 style="margin-top:0">تسجيل الدخول</h2>

      <input
        id="loginEmail"
        type="email"
        placeholder="البريد الإلكتروني"
        style="
          width:100%;
          box-sizing:border-box;
          padding:13px;
          margin:8px 0;
          border-radius:10px;
          border:1px solid #374151;
          background:#1f2937;
          color:white;
        "
      >

      <input
        id="loginPassword"
        type="password"
        placeholder="كلمة المرور"
        style="
          width:100%;
          box-sizing:border-box;
          padding:13px;
          margin:8px 0;
          border-radius:10px;
          border:1px solid #374151;
          background:#1f2937;
          color:white;
        "
      >

      <button
        id="loginSubmit"
        style="
          width:100%;
          padding:13px;
          margin-top:10px;
          border:0;
          border-radius:10px;
          background:#2563eb;
          color:white;
          font-size:16px;
          cursor:pointer;
        "
      >دخول</button>

      <button
        id="signupSubmit"
        style="
          width:100%;
          padding:13px;
          margin-top:10px;
          border:1px solid #374151;
          border-radius:10px;
          background:transparent;
          color:white;
          font-size:16px;
          cursor:pointer;
        "
      >إنشاء حساب جديد</button>

      <p
        id="loginMessage"
        style="
          margin-bottom:0;
          line-height:1.6;
          text-align:center;
        "
      ></p>

    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById("closeLogin").onclick = () => {
    modal.style.display = "none";
  };

  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };

  document.getElementById("loginSubmit").onclick = loginUser;
  document.getElementById("signupSubmit").onclick = signupUser;
}

function showLoginModal() {
  createLoginModal();

  const modal = document.getElementById("loginModal");
  modal.style.display = "flex";

  document.getElementById("loginMessage").textContent = "";
}

async function loginUser() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const message = document.getElementById("loginMessage");

  if (!email || !password) {
    message.textContent = "أدخل البريد الإلكتروني وكلمة المرور.";
    return;
  }

  message.textContent = "جاري تسجيل الدخول...";

  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    message.textContent = "خطأ: " + error.message;
    return;
  }

  message.textContent = "تم تسجيل الدخول بنجاح ✅";

  setTimeout(() => {
    document.getElementById("loginModal").style.display = "none";
  }, 800);
}

async function signupUser() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const message = document.getElementById("loginMessage");

  if (!email || !password) {
    message.textContent = "أدخل البريد الإلكتروني وكلمة المرور.";
    return;
  }

  if (password.length < 6) {
    message.textContent =
      "كلمة المرور يجب أن تكون 6 أحرف على الأقل.";
    return;
  }

  message.textContent = "جاري إنشاء الحساب...";

  const { error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo:
        "https://gave72hag-oss.github.io/vyro-store/"
    }
  });

  if (error) {
    message.textContent = "خطأ: " + error.message;
    return;
  }

  message.textContent =
    "تم إنشاء الحساب ✅ افتح بريدك الإلكتروني لتأكيد الحساب.";
}

async function updateAuthButton() {
  const { data } = await supabaseClient.auth.getSession();
  const user = data.session?.user;
  const loginBtn = document.getElementById("loginBtn");

  if (!loginBtn) return;

  if (user) {
    loginBtn.textContent = "تسجيل خروج 🚪";

    loginBtn.onclick = async () => {
      await supabaseClient.auth.signOut();
      location.reload();
    };

  } else {
    loginBtn.textContent = "تسجيل دخول 👤";
    loginBtn.onclick = showLoginModal;
  }
}

/* السلة */

document.getElementById("cartBtn").onclick = openCart;
document.getElementById("closeCart").onclick = closeCart;
document.getElementById("overlay").onclick = closeCart;

/* الوضع الليلي / النهاري */

document.getElementById("themeBtn").onclick =
  () => document.body.classList.toggle("light");

/* التصنيفات */

document.querySelectorAll(".categories button").forEach(b =>
  b.onclick = () =>
    renderProducts(
      b.dataset.cat === "other"
        ? products
        : products.filter(p => p.cat === b.dataset.cat)
    )
);

document.getElementById("allBtn").onclick =
  () => renderProducts();

/* تتبع الطلب */

document.getElementById("trackBtn").onclick = () => {
  const v = document.getElementById("orderInput").value.trim();

  document.getElementById("trackResult").innerHTML = v
    ? `<p>
        حالة الطلب <b>${v}</b>:
        <span style="color:#62a4ff">
          تجريبي — بانتظار الربط بالنظام
        </span>
      </p>`
    : "<p>أدخل رقم الطلب أولًا.</p>";
};

/* الدفع */

document.getElementById("checkout").onclick =
  () => alert(
    "هذه نسخة تجريبية؛ الدفع والـAPI سنربطهما لاحقًا."
  );

/* تشغيل الموقع */

createLoginModal();
updateAuthButton();

supabaseClient.auth.onAuthStateChange(() => {
  updateAuthButton();
});

renderProducts();
updateCart();
