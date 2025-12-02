document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    const buttons = document.querySelectorAll(".cart-icon");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const name  = btn.dataset.name;
            const price = parseInt(btn.dataset.price);
            const img   = btn.dataset.img;

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const exist = cart.find(item => item.name === name);

            if (exist) {
                exist.qty += 1;
            } else {
                cart.push({ name, price, img, qty: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();

            // SweetAlert notification
            swal("Berhasil ditambahkan!", name + " telah masuk ke keranjang.", "success");
        });
    });
});

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    cart.forEach(item => total += item.qty);

    const count = document.getElementById("cart-count");
    if (count) count.textContent = total;
}
