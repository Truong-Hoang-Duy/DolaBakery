const productDetails = JSON.parse(localStorage.getItem("productDetails"));

const imageContainer = document.querySelector(".image-container img");
imageContainer.src = productDetails.imgLink;

const productTitle = document.querySelector(".product-title");
productTitle.textContent = productDetails.productName;

const productPrice = document.querySelector(".product-price");
productPrice.textContent = productDetails.productPrice;

const cartButton = document.querySelector(".cart-button");
cartButton.addEventListener("click", () => {
  const data = {
    name: productDetails.productName,
    image_url: productDetails.imgLink,
    productPrice: productDetails.productPrice,
    quantity: 1,
  };
  const cartData = JSON.parse(localStorage.getItem("CART_ITEMS"));
  cartData.push(data);
  localStorage.setItem("CART_ITEMS", JSON.stringify(cartData));
  window.location.reload();
});
