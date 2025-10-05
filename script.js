const foods = [
  {id:1, name: "Samosa", price: 10, img: "samosa.jpg"},      
  {id:2, name: "Sandwich", price: 30, img: "sandwich.jpg"},  
  {id:3, name: "Bread Pakora", price: 25, img: "bp.jpeg "},
  {id:4, name: "Coke", price: 45, img: "cold.jpeg"},
  {id:5, name: "Chicken Lolipop", price: 140, img: "lolipop.jpeg"},
  {id:6, name: "Boiled Egg", price: 8, img: "egg.jpeg"},
  {id:7, name: "Pav Bhaji", price: 35, img: "pavbhaji.jpeg"},
  {id:8, name: "Chola Bhatura", price: 70, img: "chola.jpeg"},
  {id:9, name: "Litti chokha", price: 20, img: "litti.jpeg"}
];

let cart = {};

function renderMenu() {
  const grid = document.getElementById('menuGrid');  
  grid.innerHTML = '';
  foods.forEach(item => {
    const card = document.createElement('div');
    card.className = 'col-md-6 col-lg-4 mb-3';
    card.innerHTML = `
  <div class="menu-card">
    <img src="${item.img}" alt="${item.name}" class="food-img" style="width:100px;height:100px;object-fit:cover;border-radius:12px;margin-bottom:10px;">
    <div class="card-title">${item.name}</div>
    <div class="card-price">₹${item.price}</div>
    <div class="qty-controls">
      <button id="decBtn${item.id}" class="qty-btn">-</button>
      <input type="text" id="qtyInput${item.id}" value="1" class="qty-input" readonly>
      <button id="incBtn${item.id}" class="qty-btn">+</button>
      <button id="addBtn${item.id}" class="add-btn">Add to Cart</button>
    </div>
  </div>
`;

    grid.appendChild(card);
    document.getElementById(`decBtn${item.id}`).onclick = () => {
      let qty = +document.getElementById(`qtyInput${item.id}`).value;
      if (qty > 1) document.getElementById(`qtyInput${item.id}`).value = qty - 1;
    };
    document.getElementById(`incBtn${item.id}`).onclick = () => {
      let qty = +document.getElementById(`qtyInput${item.id}`).value;
      document.getElementById(`qtyInput${item.id}`).value = qty + 1;
    };
    document.getElementById(`addBtn${item.id}`).onclick = () => {
      let qty = +document.getElementById(`qtyInput${item.id}`).value;
      addToCart(item, qty);
    };
  });
}

function addToCart(item, qty) {
  if (cart[item.id]) {
    cart[item.id].qty += qty;
  } else {
    cart[item.id] = { ...item, qty };
  }
  renderCart();
}

function renderCart() {
  const cartEl = document.getElementById('cartItems');
  cartEl.innerHTML = '';
  let subtotal = 0;
  Object.values(cart).forEach(item => {
    subtotal += item.price * item.qty;
    const row = document.createElement('div');
    row.className = 'cart-item-row';
    row.innerHTML = `
      <span>${item.name} <span class="text-muted">x${item.qty}</span></span>
      <span>₹${item.price * item.qty}
          <button class="btn btn-sm btn-dark ms-2" onclick="updateCartQty(${item.id}, 1)">+</button>
          <button class="btn btn-sm btn-dark" onclick="updateCartQty(${item.id}, -1)">-</button>
          <button class="btn btn-sm btn-danger ms-2" onclick="removeCartItem(${item.id})">x</button>
      </span>
    `;
    cartEl.appendChild(row);
  });
  let delivery = subtotal === 0 ? 0 : (subtotal >= 200 ? 0 : 20);
  let total = subtotal + delivery;
  document.getElementById('cartSubtotal').textContent = `₹${subtotal}`;
  document.getElementById('cartDelivery').textContent = `₹${delivery}`;
  document.getElementById('cartTotal').textContent = `₹${total}`;
  document.getElementById('placeOrderBtn').disabled = subtotal === 0;
}

function updateCartQty(id, delta) {
  if (cart[id]) {
    cart[id].qty += delta;
    if (cart[id].qty < 1) { delete cart[id]; }
  }
  renderCart();
}
function removeCartItem(id) {
  delete cart[id];
  renderCart();
}
document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  renderCart();
  document.getElementById('placeOrderBtn').onclick = function() {
    if (Object.keys(cart).length === 0) return;
    alert(
      "Order Placed!\n" +
      Object.values(cart).map(i => `${i.name} x${i.qty}`).join(', ') +
      `\nPayment: COD\nTotal: ${document.getElementById('cartTotal').textContent}`
    );
    cart = {};
    renderCart();
  };
});
