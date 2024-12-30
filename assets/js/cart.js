(function () {
  const cartCount = $(".fa-cart-shopping .header__control-count");
  const cartList = $(".cart");

  const cartData = getData("CART_ITEMS");

  // lấy dữ liệu từ localStorage dựa trên khóa 'CART_ITEMS' và lưu vào biến
  cartCount.innerText = cartData.length;
  // gán độ dài của mảng cartData vào innerText của phần tử cartCount, đây là số lượng sản phẩm trong giỏ hàng.

  function updateData() {
    localStorage.setItem("CART_ITEMS", JSON.stringify(cartData));
    cartCount.innerText = cartData.length;
    //cập nhật số lượng sản phẩm trong giỏ hàng hiển thị trên giao diện người dùng, độ dài của mảng cartData (số lượng sản phẩm) được gán vào innerText của phần tử cartCount, để cập nhật số lượng sản phẩm trên giao diện.
  }

  function addCartItem(data) {
    const cartItem = document.createElement("div");
    cartItem.classList.add("header__control-dropdown-item");
    cartItem.setAttribute("data-name", data.name);
    cartItem.innerHTML = `
            <img src="${data.image_url}" width="70" height="70">
            <div class="header__control-dropdown-text" title="${data.name}">
                <h3 class="line-clamp line-clamp-1">${data.name}</h3>
                <div class="header__control-dropdown-remove">Xoá</div>
            </div>
        `;

    const deleteBtn = cartItem.querySelector(
      ".header__control-dropdown-remove"
    );
    deleteBtn.addEventListener("click", () => {
      const targetIndex = cartData.find((item) => item.name === data.name);
      cartData.splice(targetIndex, 1);
      cartItem.remove();
      updateData();
    });

    cartList.appendChild(cartItem);
  }

  cartData.forEach((item) => addCartItem(item));

  [productElements, allProduct].forEach((elements) => {
    elements.forEach((item) => {
      const cartIcon = item.querySelector(".fa-bag-shopping");
      const productImage = item.querySelector("img");
      const productPrice = item
        .querySelector(".product__price-new")
        .textContent.trim();
      cartIcon.parentElement.addEventListener("click", () => {
        const data = {
          name: item.dataset.name,
          image_url: productImage.src,
          productPrice,
          quantity: 1,
        };

        cartData.push(data);
        addCartItem(data);
        updateData();
      });
    });
  });
})();

function directionToDetails(pageProduct, swiper) {
  const imgLink = pageProduct.querySelector(
    swiper ? ".product__thumb img" : ".page__product-thumb img"
  ).src;
  const productName = pageProduct
    .querySelector(swiper ? ".product__name" : ".page__product-name")
    .textContent.trim();
  const productPrice = pageProduct
    .querySelector(".product__price-new")
    .textContent.trim();
  const data = {
    imgLink,
    productName,
    productPrice,
  };
  localStorage.setItem("productDetails", JSON.stringify(data));
  window.location.href = "../assets/pages/product-details.html";
}

const pageProductThumb = document.querySelectorAll(".page__product-thumb");
pageProductThumb.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const pageProduct = item.closest(".page__product");
    directionToDetails(pageProduct);
  });
});

const pageProductName = document.querySelectorAll(".page__product-name");
pageProductName.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const pageProduct = item.closest(".page__product");
    directionToDetails(pageProduct);
  });
});

const productNameSwipper = document.querySelectorAll(".product__name");
console.log(productNameSwipper);
productNameSwipper.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const pageProduct = item.closest(".product");
    directionToDetails(pageProduct, true);
  });
});
