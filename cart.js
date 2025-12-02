document.addEventListener("DOMContentLoaded", () => {

    updateCartCount(); // update jumlah keranjang di navbar saat halaman dibuka

    // ambil semua icon keranjang
    const buttons = document.querySelectorAll(".cart-icon");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {

            // ambil data produk dari dataset
            const name  = btn.dataset.name;
            const price = parseInt(btn.dataset.price);
            const img   = btn.dataset.img;

            // ambil cart lama dari localStorage
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // cek apakah produk sudah ada
            const exist = cart.find(item => item.name === name);

            if (exist) {
                exist.qty += 1;   // tambah qty jika sudah ada
            } else {
                cart.push({
                    name: name,
                    price: price,
                    img: img,
                    qty: 1
                });
            }

            // simpan kembali cart
            localStorage.setItem("cart", JSON.stringify(cart));

            updateCartCount(); // update angka di navbar

            // notifikasi
            Swal.fire({
             title: "Berhasil!",
            text: "Produk ditambahkan ke keranjang!",
            icon: "success"
            });

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
