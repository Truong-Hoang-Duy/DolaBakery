const cartItems = JSON.parse(localStorage.getItem("CART_ITEMS")) ?? [];
const containerProductCart = document.querySelector(".container-product-cart");
let totalPrice = 0;
console.log(cartItems);

for (let i = 0; i < cartItems.length; i++) {
  for (let j = i + 1; j < cartItems.length; j++) {
    // Kiểm tra nếu tên trùng và chưa cộng dồn
    if (cartItems[i].name === cartItems[j].name) {
      cartItems[i].quantity += cartItems[j].quantity; // Cộng dồn số lượng
      cartItems.splice(j, 1); // Xóa phần tử trùng
      j--; // Điều chỉnh lại chỉ số sau khi xóa
    }
  }
}

cartItems.forEach((item) => {
  totalPrice +=
    parseInt(item.productPrice.replace(/[^0-9]/g, "")) * item.quantity;
  const template = `
    <div class="cart-item">
        <div class="item-image">
            <img src=${item.image_url} alt=${item.name} />
        </div>
        <div class="item-details">
            <div class="item-title">${item.name}</div>
            <div class="item-price">${item.productPrice}</div>
            <div class="item-quantity">Số lượng: ${item.quantity}</div>
        </div>
    </div>
    `;
  containerProductCart.insertAdjacentHTML("beforeend", template);
});

const total = document.createElement("div");
total.classList.add("total");
total.textContent = `Tổng cộng: ${totalPrice.toLocaleString()}đ`;
containerProductCart.appendChild(total);

const templateBtn = `<button class="checkout-button">Thanh Toán</button>`;
containerProductCart.insertAdjacentHTML("beforeend", templateBtn);
