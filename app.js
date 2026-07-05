/* =========================================================
   SHOPPIE SPORT — app.js
   Berisi: data produk, filter/search, keranjang (localStorage),
   modal detail produk, checkout + simulasi payment gateway,
   navigasi mobile, dan event tracking dummy (Google Analytics).
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     1. DATA PRODUK
     --------------------------------------------------------- */
  const PRODUCTS = [
    {
      id: "p01",
      name: "Sepatu Lari Velocity X2",
      category: "Sepatu",
      price: 899000,
      rating: 4.8,
      image: "images/sepatu_lari.jpg",
      desc: "Sepatu lari ringan dengan bantalan responsif, cocok untuk latihan harian maupun lari jarak jauh. Upper mesh breathable menjaga kaki tetap sejuk."
    },
    {
      id: "p02",
      name: "Sepatu Basket AirJump Pro",
      category: "Sepatu",
      price: 1250000,
      rating: 4.7,
      image: "images/sepatu_basket_air_jump.jpg",
      desc: "Ankle support tinggi dan sol grip agresif untuk perubahan arah cepat di lapangan indoor maupun outdoor."
    },
    {
      id: "p03",
      name: "Sepatu Training FlexCore",
      category: "Sepatu",
      price: 749000,
      rating: 4.5,
      image: "images/Sepatu_Training_FlexCore.jpg",
      desc: "Dirancang untuk latihan multi-arah: angkat beban, HIIT, hingga jogging ringan. Sol stabil dan fleksibel."
    },
    {
      id: "p04",
      name: "Jersey Bola FC Thunder Home",
      category: "Pakaian",
      price: 350000,
      rating: 4.6,
      image: "images/Jersey_Bola_FC_Thunder_Home.jpg",
      desc: "Jersey replika dengan bahan dry-fit, sirkulasi udara baik untuk pertandingan maupun latihan rutin."
    },
    {
      id: "p05",
      name: "Celana Training DryFit Flex",
      category: "Pakaian",
      price: 275000,
      rating: 4.4,
      image: "images/Celana_Training_DryFit_Flex.jpg",
      desc: "Celana training elastis dengan bahan quick-dry, nyaman dipakai untuk lari maupun sesi gym."
    },
    {
      id: "p06",
      name: "Jaket Windbreaker StormGuard",
      category: "Pakaian",
      price: 425000,
      rating: 4.7,
      image: "images/Jaket_Windbreaker_StormGuard.jpg",
      desc: "Melindungi dari angin dan gerimis ringan saat lari pagi atau latihan outdoor, tetap ringan dan ringkas dilipat."
    },
    {
      id: "p07",
      name: "Bola Basket Pro Grip 7",
      category: "Peralatan",
      price: 320000,
      rating: 4.6,
      image: "images/Bola_Basket_Pro_Grip_7.jpg",
      desc: "Ukuran resmi 7 dengan permukaan komposit, grip stabil untuk permainan indoor maupun outdoor."
    },
    {
      id: "p08",
      name: "Bola Futsal ProMatch",
      category: "Peralatan",
      price: 275000,
      rating: 4.5,
      image: "images/Bola_Futsal_ProMatch.jpg",
      desc: "Pantulan rendah sesuai standar futsal, jahitan tangan untuk daya tahan lebih lama."
    },
    {
      id: "p09",
      name: "Matras Yoga ProFlex 6mm",
      category: "Peralatan",
      price: 199000,
      rating: 4.5,
      image: "images/Matras_Yoga_ProFlex_6mm.jpg",
      desc: "Matras anti-slip tebal 6mm, nyaman untuk yoga, peregangan, maupun latihan lantai lainnya."
    },
    {
      id: "p10",
      name: "Dumbbell Set Adjustable 10kg",
      category: "Peralatan",
      price: 650000,
      rating: 4.7,
      image: "images/Dumbbell_Set_Adjustable_10kg.jpg",
      desc: "Sepasang dumbbell dengan plat dapat disesuaikan hingga 10kg per sisi, cocok untuk latihan kekuatan di rumah."
    },
    {
      id: "p11",
      name: "Tas Olahraga Duffel Pro 40L",
      category: "Aksesoris",
      price: 310000,
      rating: 4.4,
      image: "images/Tas_Olahraga_Duffel_Pro_40L.jpg",
      desc: "Kapasitas 40 liter dengan kompartemen sepatu terpisah, ideal untuk latihan maupun perjalanan singkat."
    },
    {
      id: "p12",
      name: "Botol Minum Hydro Sport 750ml",
      category: "Aksesoris",
      price: 89000,
      rating: 4.6,
      image: "images/Botol_Minum_Hydro_Sport_750ml.jpg",
      desc: "Botol BPA-free dengan penanda takaran, menjaga kamu tetap terhidrasi selama latihan."
    },
    {
      id: "p13",
      name: "Kaos Kaki Compression Pro (3 Pasang)",
      category: "Aksesoris",
      price: 125000,
      rating: 4.3,
      image: "images/Kaos_Kaki_Compression_Pro__3_Pasang_.jpg",
      desc: "Kaos kaki kompresi ringan, mengurangi kelelahan otot betis saat lari maupun latihan panjang."
    }
  ];

  const SHIPPING_COST = 15000;
  const CART_KEY = "shoppieSportCart";

  /* ---------------------------------------------------------
     2. UTIL
     --------------------------------------------------------- */
  const rupiah = (n) =>
    "Rp " + Math.round(n).toLocaleString("id-ID");

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  function trackEvent(name, params) {
    if (typeof gtag === "function") {
      gtag("event", name, params || {});
    }
  }

  function showToast(msg) {
    const toast = $("#toast");
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  /* ---------------------------------------------------------
     3. STATE KERANJANG (localStorage)
     --------------------------------------------------------- */
  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }
  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  let cart = loadCart();

  function cartTotal() {
    return cart.reduce((sum, item) => {
      const p = PRODUCTS.find((x) => x.id === item.id);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
  }
  function cartCount() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }

  function addToCart(id, qty) {
    qty = qty || 1;
    const existing = cart.find((x) => x.id === id);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id, qty });
    }
    saveCart(cart);
    renderCart();
    const p = PRODUCTS.find((x) => x.id === id);
    trackEvent("add_to_cart", { item_id: id, item_name: p ? p.name : id, quantity: qty });
    showToast((p ? p.name : "Produk") + " ditambahkan ke keranjang");
  }

  function updateQty(id, delta) {
    const item = cart.find((x) => x.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter((x) => x.id !== id);
    }
    saveCart(cart);
    renderCart();
  }

  function removeFromCart(id) {
    cart = cart.filter((x) => x.id !== id);
    saveCart(cart);
    renderCart();
    showToast("Produk dihapus dari keranjang");
  }

  function renderCart() {
    const list = $("#cartList");
    const badge = $("#cartBadge");
    const totalEl = $("#cartTotal");

    badge.textContent = cartCount();

    if (cart.length === 0) {
      list.innerHTML = '<p class="cart-empty">Keranjang kamu masih kosong.<br>Yuk mulai belanja!</p>';
    } else {
      list.innerHTML = cart
        .map((item) => {
          const p = PRODUCTS.find((x) => x.id === item.id);
          if (!p) return "";
          return `
            <div class="cart-item" data-id="${p.id}">
              <img src="${p.image}" alt="${p.name}">
              <div class="cart-item__info">
                <h4>${p.name}</h4>
                <span class="cart-item__price">${rupiah(p.price)}</span>
                <div class="cart-item__row">
                  <div class="qty-control">
                    <button class="qty-minus" aria-label="Kurangi">−</button>
                    <span>${item.qty}</span>
                    <button class="qty-plus" aria-label="Tambah">+</button>
                  </div>
                  <button class="remove-btn">Hapus</button>
                </div>
              </div>
            </div>`;
        })
        .join("");
    }

    totalEl.textContent = rupiah(cartTotal());
  }

  /* delegasi klik untuk tombol di dalam cart drawer */
  $("#cartList").addEventListener("click", (e) => {
    const itemEl = e.target.closest(".cart-item");
    if (!itemEl) return;
    const id = itemEl.dataset.id;
    if (e.target.classList.contains("qty-plus")) updateQty(id, 1);
    if (e.target.classList.contains("qty-minus")) updateQty(id, -1);
    if (e.target.classList.contains("remove-btn")) removeFromCart(id);
  });

  /* ---------------------------------------------------------
     4. KATALOG: RENDER + FILTER + SEARCH + SORT
     --------------------------------------------------------- */
  const grid = $("#productGrid");
  const resultInfo = $("#resultInfo");
  const filterSearch = $("#filterSearch");
  const filterCategory = $("#filterCategory");
  const filterSort = $("#filterSort");

  function getFilteredProducts() {
    let list = [...PRODUCTS];
    const q = filterSearch.value.trim().toLowerCase();
    const cat = filterCategory.value;
    const sort = filterSort.value;

    if (q) {
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (cat !== "semua") {
      list = list.filter((p) => p.category === cat);
    }
    if (sort === "harga-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "harga-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "nama-asc") list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }

  function renderCatalog() {
    const list = getFilteredProducts();
    resultInfo.textContent = `Menampilkan ${list.length} dari ${PRODUCTS.length} produk`;

    if (list.length === 0) {
      grid.innerHTML = '<p class="no-result">Produk tidak ditemukan. Coba kata kunci atau filter lain.</p>';
      return;
    }

    grid.innerHTML = list
      .map(
        (p) => `
      <article class="product-card reveal" data-id="${p.id}">
        <div class="product-card__img">
          <span class="product-card__cat">${p.category}</span>
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </div>
        <div class="product-card__body">
          <h3>${p.name}</h3>
          <span class="product-card__price">${rupiah(p.price)}</span>
          <div class="product-card__actions">
            <button class="btn btn--ghost detail-btn">Detail</button>
            <button class="btn btn--primary add-btn">+ Keranjang</button>
          </div>
        </div>
      </article>`
      )
      .join("");

    observeReveals();
  }

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    if (!card) return;
    const id = card.dataset.id;
    if (e.target.classList.contains("detail-btn")) openProductModal(id);
    if (e.target.classList.contains("add-btn")) addToCart(id, 1);
  });

  [filterSearch, filterCategory, filterSort].forEach((el) =>
    el.addEventListener("input", renderCatalog)
  );

  /* filter cepat dari link kategori di footer */
  $$('.footer__col a[data-cat]').forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      filterCategory.value = a.dataset.cat;
      renderCatalog();
      document.getElementById("katalog").scrollIntoView({ behavior: "smooth" });
    });
  });

  /* pencarian di navbar mendorong ke input filter katalog */
  $("#navSearchInput").addEventListener("input", (e) => {
    filterSearch.value = e.target.value;
    renderCatalog();
  });
  $("#navSearchInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      document.getElementById("katalog").scrollIntoView({ behavior: "smooth" });
    }
  });

  /* ---------------------------------------------------------
     5. MODAL DETAIL PRODUK
     --------------------------------------------------------- */
  const overlay = $("#overlay");
  const modal = $("#productModal");
  const modalBody = $("#modalBody");
  let modalQty = 1;

  function openProductModal(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    modalQty = 1;

    modalBody.innerHTML = `
      <div class="modal__img"><img src="${p.image}" alt="${p.name}"></div>
      <div class="modal__info">
        <span class="product-card__cat">${p.category}</span>
        <h3 style="text-transform:none;font-family:var(--font-body);">${p.name}</h3>
        <p>${p.desc}</p>
        <p style="font-size:13px;">⭐ ${p.rating} / 5.0 rating pembeli</p>
        <div class="modal__price">${rupiah(p.price)}</div>
        <div class="qty-row">
          <div class="qty-control">
            <button id="modalQtyMinus" aria-label="Kurangi">−</button>
            <span id="modalQtyValue">1</span>
            <button id="modalQtyPlus" aria-label="Tambah">+</button>
          </div>
        </div>
        <button class="btn btn--primary btn--block" id="modalAddBtn">Tambah ke Keranjang</button>
      </div>`;

    $("#modalQtyMinus").addEventListener("click", () => {
      modalQty = Math.max(1, modalQty - 1);
      $("#modalQtyValue").textContent = modalQty;
    });
    $("#modalQtyPlus").addEventListener("click", () => {
      modalQty += 1;
      $("#modalQtyValue").textContent = modalQty;
    });
    $("#modalAddBtn").addEventListener("click", () => {
      addToCart(id, modalQty);
      closeModal();
    });

    overlay.classList.add("show");
    modal.classList.add("show");
    trackEvent("view_item", { item_id: p.id, item_name: p.name, value: p.price });
  }

  function closeModal() {
    modal.classList.remove("show");
    overlay.classList.remove("show");
  }
  $("#modalClose").addEventListener("click", closeModal);

  /* ---------------------------------------------------------
     6. CART DRAWER OPEN/CLOSE
     --------------------------------------------------------- */
  const cartDrawer = $("#cartDrawer");

  function openCart() {
    cartDrawer.classList.add("open");
    overlay.classList.add("show");
  }
  function closeCart() {
    cartDrawer.classList.remove("open");
    overlay.classList.remove("show");
  }
  $("#cartToggle").addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);

  overlay.addEventListener("click", () => {
    closeModal();
    closeCart();
  });

  /* ---------------------------------------------------------
     7. NAVBAR: MENU MOBILE + SEARCH BAR
     --------------------------------------------------------- */
  $("#menuToggle").addEventListener("click", () => {
    $("#navLinks").classList.toggle("open");
  });
  $$("#navLinks a").forEach((a) =>
    a.addEventListener("click", () => $("#navLinks").classList.remove("open"))
  );
  $("#searchToggle").addEventListener("click", () => {
    $("#searchBar").classList.toggle("open");
    if ($("#searchBar").classList.contains("open")) $("#navSearchInput").focus();
  });

  /* ---------------------------------------------------------
     8. CHECKOUT
     --------------------------------------------------------- */
  const checkoutOverlay = $("#checkoutOverlay");
  const checkoutModal = $("#checkoutModal");
  const checkoutStepForm = $("#checkoutStepForm");
  const checkoutProcessing = $("#checkoutProcessing");
  const checkoutSuccess = $("#checkoutSuccess");

  function openCheckout() {
    if (cart.length === 0) {
      showToast("Keranjang masih kosong");
      return;
    }
    renderCheckoutSummary();
    checkoutOverlay.classList.add("show");
    checkoutModal.classList.add("show");
    checkoutStepForm.style.display = "grid";
    checkoutProcessing.classList.remove("show");
    checkoutSuccess.classList.remove("show");
    closeCart();
    trackEvent("begin_checkout", { value: cartTotal(), items: cartCount() });
  }
  function closeCheckout() {
    checkoutOverlay.classList.remove("show");
    checkoutModal.classList.remove("show");
  }
  $("#goCheckout").addEventListener("click", openCheckout);
  $("#footerCheckoutLink").addEventListener("click", (e) => {
    e.preventDefault();
    openCheckout();
  });
  $("#checkoutClose").addEventListener("click", closeCheckout);
  checkoutOverlay.addEventListener("click", closeCheckout);
  $("#closeSuccess").addEventListener("click", () => {
    closeCheckout();
    document.getElementById("home").scrollIntoView({ behavior: "smooth" });
  });

  function renderCheckoutSummary() {
    const itemsEl = $("#checkoutItems");
    itemsEl.innerHTML = cart
      .map((item) => {
        const p = PRODUCTS.find((x) => x.id === item.id);
        if (!p) return "";
        return `<div class="summary-item"><span>${p.name} × ${item.qty}</span><span>${rupiah(p.price * item.qty)}</span></div>`;
      })
      .join("");

    const subtotal = cartTotal();
    const total = subtotal + SHIPPING_COST;
    $("#sumSubtotal").textContent = rupiah(subtotal);
    $("#sumOngkir").textContent = rupiah(SHIPPING_COST);
    $("#sumTotal").textContent = rupiah(total);
  }

  /* --- validasi form sederhana --- */
  const checkoutForm = $("#checkoutForm");
  const fields = {
    nama: { input: $("#coNama"), err: $("#errNama") },
    email: { input: $("#coEmail"), err: $("#errEmail") },
    telepon: { input: $("#coTelepon"), err: $("#errTelepon") },
    alamat: { input: $("#coAlamat"), err: $("#errAlamat") }
  };

  function validateField(key) {
    const { input, err } = fields[key];
    input.classList.add("touched");
    let message = "";

    if (!input.value.trim()) {
      message = "Wajib diisi.";
    } else if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      message = "Format email tidak valid.";
    } else if (key === "telepon" && !/^0[0-9]{9,13}$/.test(input.value.trim())) {
      message = "Gunakan format 08xxxxxxxxxx.";
    } else if (key === "nama" && input.value.trim().length < 3) {
      message = "Nama minimal 3 karakter.";
    } else if (key === "alamat" && input.value.trim().length < 10) {
      message = "Alamat terlalu singkat, tulis lebih lengkap.";
    }

    err.textContent = message;
    return message === "";
  }

  Object.keys(fields).forEach((key) => {
    fields[key].input.addEventListener("blur", () => validateField(key));
  });

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const results = Object.keys(fields).map(validateField);
    if (results.includes(false)) {
      showToast("Periksa kembali data yang kamu isi");
      return;
    }

    const metode = checkoutForm.querySelector('input[name="metode"]:checked').value;
    runPaymentSimulation(metode);
  });

  function runPaymentSimulation(metode) {
    checkoutStepForm.style.display = "none";
    checkoutProcessing.classList.add("show");
    $("#processingMethod").textContent = " (" + metode + ")";

    setTimeout(() => {
      const orderId =
        "SS-" + Date.now().toString().slice(-8) + "-" + Math.floor(Math.random() * 90 + 10);
      const total = cartTotal() + SHIPPING_COST;

      $("#orderId").textContent = orderId;
      $("#orderSummaryText").textContent =
        `Total ${rupiah(total)} via ${metode}. Struk telah dikirim ke ${fields.email.input.value}.`;

      trackEvent("purchase", {
        transaction_id: orderId,
        value: total,
        currency: "IDR",
        payment_method: metode
      });

      checkoutProcessing.classList.remove("show");
      checkoutSuccess.classList.add("show");

      cart = [];
      saveCart(cart);
      renderCart();
      checkoutForm.reset();
    }, 1800);
  }

  /* ---------------------------------------------------------
     9. NEWSLETTER (dummy)
     --------------------------------------------------------- */
  $("#newsletterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("#newsletterEmail").value.trim();
    const msg = $("#newsletterMsg");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.style.color = "#E6483A";
      msg.textContent = "Masukkan email yang valid.";
      return;
    }
    msg.style.color = "";
    msg.textContent = "Terima kasih! Kamu akan menerima info promo terbaru.";
    $("#newsletterEmail").value = "";
  });

  /* ---------------------------------------------------------
     10. SCROLL REVEAL (IntersectionObserver)
     --------------------------------------------------------- */
  let revealObserver;
  function observeReveals() {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
    }
    $$(".reveal:not(.in)").forEach((el) => revealObserver.observe(el));
  }

  /* ---------------------------------------------------------
     11. INIT
     --------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderCatalog();
    renderCart();
    observeReveals();
  });
})();
