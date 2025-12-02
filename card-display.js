let cart = [];
let subtotal = 0;
let tax = 0;
let shipping = 0;
let discount = 0;

// Load cart items
document.addEventListener("DOMContentLoaded", () => {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    renderItems();
    updateTotals();
});

// Render Order Items
function renderItems() {
    const box = document.getElementById("order-items");
    box.innerHTML = "";

    cart.forEach((item, i) => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `
            <img src="${item.img}">
            <div class="item-details">
                <strong>${item.name}</strong><br>
                Rp ${item.price.toLocaleString()}
                <div class="qty-box">
                    <button onclick="changeQty(${i}, -1)">−</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty(${i}, 1)">+</button>
                </div>
            </div>
            <span class="remove-btn" onclick="removeItem(${i})">✕</span>
        `;
        box.appendChild(div);
    });
}

// Change quantity
function changeQty(i, val) {
    cart[i].qty += val;
    if (cart[i].qty < 1) cart[i].qty = 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderItems();
    updateTotals();
}

// Remove item
function removeItem(i) {
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderItems();
    updateTotals();
}

// Shipping change
document.getElementById("shipping-method").addEventListener("change", function(){
    shipping = parseInt(this.value) || 0;
    updateTotals();
});

// Apply discount
document.getElementById("apply-discount").addEventListener("click", () => {
    const code = document.getElementById("discount-code").value;

    if (code === "WELCOME123") {
        discount = 12000;
             Swal.fire({
             title: "Berhasil!",
            text: "Diskon Berhasil di Tambahkan!",
            icon: "success"
            });
    } else {
        discount = 0;
        Swal.fire({
            icon: "error",
            title: "Oops Bukan itu wlee...",
            text: "Coba Masukan Lagi!",
        // footer: '<a href="#">Why do I have this issue?</a>'
});
    }
    updateTotals();
});

// Calculate totals
function updateTotals() {
    subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    tax = Math.round(subtotal * 0.1);
    const total = subtotal + tax + shipping - discount;

    document.getElementById("subtotal").textContent = format(subtotal);
    document.getElementById("tax").textContent = format(tax);
    document.getElementById("shipping-price").textContent = format(shipping);
    document.getElementById("disc-amount").textContent = format(discount);
    document.getElementById("final-total").textContent = format(total);
}

function format(num) {
    return "Rp " + num.toLocaleString();
}

// Checkout button
document.getElementById("checkout-btn").addEventListener("click", () => {

    Swal.fire({
        title: "Transaksi Berhasil!",
        text: "Produk berhasil dibeli.",
        icon: "success",
        confirmButtonText: "OK"
    }).then(() => {

        // Hapus seluruh data keranjang
        localStorage.removeItem("cart");

        // Update tampilan checkout jadi kosong
        cart = [];
        renderItems();
        updateTotals();

        // Update jumlah cart di navbar
        updateCartCount();

        // Redirect ke halaman utama (opsional)
        window.location.href = "index.html"; 
        // kalau tidak mau redirect, hapus baris ini
    });
});

