let menuData = [];
let cart = {};

function fetchMenu() {
  fetch("https://api.npoint.io/d48587410594df0f5932")
    .then((response) => response.json())
    .then((data) => {
      menuData = data;
      displayMenu();
    })
    .catch((error) => console.log("Error Fetching menu:", error));
}

function displayMenu() {
  const container = document.getElementById("menu-container");
  container.innerHTML = "";

  menuData.forEach((item) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
        <img src="${item.food_image}" alt="${item.food_name}" class="product-img">
        <h2>${item.food_name}</h2>
        <p>${item.food_description}</p>
        <p>Price: $${item.food_price}</p>
        <button onClick="addToCart('${item.food_name}', ${item.food_price})">Add to Cart</button>`;
    container.appendChild(productDiv);
  });
}

function addToCart(name, price) {
  if (cart[name]) {
    cart[name].quantity += 1;
  } else {
    cart[name] = { price, quantity: 1 };
  }
  updateCart();
}

function updateCart() {
  const cartContainer = document.getElementById("cart-container");
  const cartCount = document.getElementById("cart-count");

  cartContainer.innerHTML = "<h2>Shopping Cart</h2>";

  let totalItems = 0;
  let totalPrice = 0;

  if (Object.keys(cart).length === 0) {
    cartContainer.innerHTML += "<p>Cart is empty</p>";
    cartCount.textContent = "0";
    return;
  }

  Object.keys(cart).forEach((name) => {
    const item = cart[name];
    totalItems += item.quantity;
    totalPrice += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <p>${name} (${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</p>
      <button class="qty-btn" onClick="changeQuantity('${name}', 1)">+</button>
      <button class="qty-btn" onClick="changeQuantity('${name}', -1)">-</button>
      <button class="remove-btn" onClick="removeFromCart('${name}')">Remove</button>
    `;
    cartContainer.appendChild(cartItem);
  });

  cartContainer.innerHTML += `<h3>Total: $${totalPrice.toFixed(2)}</h3>`;
  cartCount.textContent = totalItems;
}

function changeQuantity(name, change) {
  if (cart[name]) {
    cart[name].quantity += change;
    if (cart[name].quantity <= 0) {
      delete cart[name]; // Remove item if quantity is zero
    }
  }
  updateCart();
}

function removeFromCart(name) {
  delete cart[name];
  updateCart();
}

function toggleCart() {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
}

fetchMenu();
