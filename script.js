let selectedItem = "";
let selectedType = "";
let cart = [];
let quantity = 1;

const coffeeOptions = {
  Espresso: [
    { option: "Small", price: 90 },
    { option: "Medium", price: 110 },
    { option: "Large", price: 130 }
  ],
  Americano: [
    { option: "Small", price: 110 },
    { option: "Medium", price: 130 },
    { option: "Large", price: 150 }
  ],
  Cappuccino: [
    { option: "Small", price: 130 },
    { option: "Medium", price: 150 },
    { option: "Large", price: 170 }
  ],
  Latte: [
    { option: "Small", price: 140 },
    { option: "Medium", price: 160 },
    { option: "Large", price: 180 }
  ],
  Mocha: [
    { option: "Small", price: 150 },
    { option: "Medium", price: 170 },
    { option: "Large", price: 190 }
  ]
};

const dessertOptions = {
  Croissant: [
    { option: "Classic Butter", price: 85 },
    { option: "Chocolate", price: 95 },
    { option: "Almond", price: 105 }
  ],
  Muffin: [
    { option: "Blueberry", price: 75 },
    { option: "Chocolate Chip", price: 80 },
    { option: "Banana Walnut", price: 85 }
  ],
  Donut: [
    { option: "Glazed", price: 65 },
    { option: "Chocolate", price: 75 },
    { option: "Strawberry", price: 75 }
  ]
};

function openOrder(item, type) {
  selectedItem = item;
  selectedType = type;

  document.getElementById("modal-title").textContent = item;
  document.getElementById("option-label").textContent = type === "coffee" ? "Choose coffee size:" : "Choose dessert flavor:";

  quantity = 1;
  document.getElementById("quantity").textContent = quantity;

  const optionSelect = document.getElementById("item-option");
  optionSelect.innerHTML = "";

  const options = type === "coffee" ? coffeeOptions[item] : dessertOptions[item];

  options.forEach((choice, index) => {
    const label = document.createElement("label");
    label.className = "radio-option";

    label.innerHTML = `
      <input type="radio" name="itemChoice" value="${choice.option}|${choice.price}" ${index === 0 ? "checked" : ""}>
      <span>${choice.option} - ₱${choice.price}</span>
    `;

    optionSelect.appendChild(label);
  });

  document.getElementById("orderModal").classList.add("active");
}

function closeOrder() {
  document.getElementById("orderModal").classList.remove("active");
}

function increaseQuantity() {
  quantity++;
  document.getElementById("quantity").textContent = quantity;
}

function decreaseQuantity() {
  if (quantity > 1) {
    quantity--;
    document.getElementById("quantity").textContent = quantity;
  }
}

function addToCart() {
  const selectedRadio = document.querySelector('input[name="itemChoice"]:checked');
  const selected = selectedRadio.value.split("|");
  const option = selected[0];
  const price = Number(selected[1]);

  cart.push({
    item: selectedItem,
    option: option,
    price: price,
    quantity: quantity
  });

  updateCart();
  closeOrder();
  document.getElementById("addSuccessModal").classList.add("active");
}

function closeAddSuccess() {
  document.getElementById("addSuccessModal").classList.remove("active");
}

function openCart() {
  updateCart();
  document.getElementById("cartModal").classList.add("active");
}

function closeCart() {
  document.getElementById("cartModal").classList.remove("active");
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    cartTotal.textContent = "₱0";
    return;
  }

  let total = 0;

  cart.forEach((product, index) => {
    total += product.price * product.quantity;

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <div>
        <strong>${product.item}</strong><br>
        <span>${product.option}</span><br>
        <span>Quantity: ${product.quantity}</span>
      </div>
      <div>
        <strong>₱${product.price * product.quantity}</strong><br>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;

    cartItems.appendChild(itemDiv);
  });

  cartTotal.textContent = `₱${total}`;
}

const checkoutForm = document.querySelector(".checkout-form");

checkoutForm.addEventListener("submit", function(event) {
  event.preventDefault();

  document.getElementById("orderSuccessModal").classList.add("active");

  cart = [];
  updateCart();
  checkoutForm.reset();
});

function closeSuccess() {
  document.getElementById("orderSuccessModal").classList.remove("active");
  closeCart();
}