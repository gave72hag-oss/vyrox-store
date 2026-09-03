const products=[
 {name:"متابعين تيك توك",cat:"TikTok",qty:"1000 متابع",price:2.35,icon:"🎵"},
 {name:"متابعين انستقرام",cat:"Instagram",qty:"1000 متابع",price:2.45,icon:"📸"},
 {name:"مشاهدات يوتيوب",cat:"YouTube",qty:"1000 مشاهدة",price:1.25,icon:"▶️"},
 {name:"مشاهدات تيك توك",cat:"TikTok",qty:"10000 مشاهدة",price:1.20,icon:"🎵"},
 {name:"لايكات انستقرام",cat:"Instagram",qty:"1000 لايك",price:1.80,icon:"❤️"}
];
let cart=[];
const productsEl=document.getElementById("products");
function renderProducts(list=products){
 productsEl.innerHTML=list.map((p,i)=>`<article class="product"><span class="tag">${i===1?"الأفضل":"مميز"}</span><div class="ico">${p.icon}</div><h3>${p.name}</h3><p>${p.qty} · خدمة رقمية تجريبية</p><div class="price">$${p.price.toFixed(2)}</div><button class="add" onclick="addToCart(${products.indexOf(p)})">اطلب الآن 🛒</button></article>`).join("");
}
function addToCart(i){cart.push(products[i]);updateCart();openCart()}
function updateCart(){
 document.getElementById("cartCount").textContent=cart.length;
 document.getElementById("cartItems").innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-row"><span>${p.name}</span><b>$${p.price.toFixed(2)}</b><button onclick="removeItem(${i})">×</button></div>`).join(""):"<p>السلة فارغة.</p>";
 document.getElementById("total").textContent="$"+cart.reduce((s,p)=>s+p.price,0).toFixed(2);
}
function removeItem(i){cart.splice(i,1);updateCart()}
function openCart(){document.getElementById("drawer").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("drawer").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
document.getElementById("cartBtn").onclick=openCart;
document.getElementById("closeCart").onclick=closeCart;
document.getElementById("overlay").onclick=closeCart;
document.getElementById("themeBtn").onclick=()=>document.body.classList.toggle("light");
document.querySelectorAll(".categories button").forEach(b=>b.onclick=()=>renderProducts(b.dataset.cat==="other"?products:products.filter(p=>p.cat===b.dataset.cat)));
document.getElementById("allBtn").onclick=()=>renderProducts();
document.getElementById("trackBtn").onclick=()=>{const v=document.getElementById("orderInput").value.trim();document.getElementById("trackResult").innerHTML=v?`<p>حالة الطلب <b>${v}</b>: <span style="color:#62a4ff">تجريبي — بانتظار الربط بالنظام</span></p>`:"<p>أدخل رقم الطلب أولًا.</p>"};
document.getElementById("checkout").onclick=()=>alert("هذه نسخة تجريبية؛ الدفع والـAPI سنربطهما لاحقًا.");
renderProducts();updateCart();