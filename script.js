function custLogin() {
  const name = document.getElementById("custName").value;
  document.getElementById("login").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");
  document.getElementById("customerName").innerText = name;
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

function updateTimeline(step) {
  document.querySelectorAll("#activeOrder .step").forEach((s, i) => {
    s.classList.toggle("active", i <= step);
  });
}

function callRider() {
  alert("Calling your rider:please wait! " + currentOrder.rider);
}

function sendSOS() {
  alert("🚨 SOS sent to support!");
}
let currentOrder = { items: [], address: "", status: 0, rider: null };

function addItem() {
  const name = document.getElementById("itemName").value;
  const qty = parseInt(document.getElementById("itemQty").value);
  if (!name || qty <= 0) return alert("Enter item name and valid quantity");

  currentOrder.items.push({ name, qty });
  renderCart();
}

function renderCart() {
  const ul = document.getElementById("cartList");
  ul.innerHTML = "";
  currentOrder.items.forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.name} x ${item.qty}`;
    ul.appendChild(li);
  });
}
function renderActiveOrder() {
  const items = (currentOrder.placedItems && currentOrder.placedItems.length) ? currentOrder.placedItems : currentOrder.items;
  const itemsText = items.map(item => `${item.name} x ${item.qty}`).join(', ');
  document.getElementById("orderItemName").innerText = itemsText;

  document.getElementById("orderAddressText").innerText = currentOrder.address;
  updateTimeline(currentOrder.status);
}

function placeOrder() {
  const address = document.getElementById("orderAddress").value.trim();
  if (currentOrder.items.length === 0) return alert("Cart is empty. Add items first.");
  if (!address) return alert("Please enter a delivery address.");

  // Snapshot items for the active order, set address/status
  currentOrder.placedItems = currentOrder.items.slice();
  currentOrder.address = address;
  currentOrder.status = 0; // Order placed

  // Show active order UI
  renderActiveOrder();
  document.getElementById("activeOrder").classList.remove("hidden");

  // Add to order history
  const ul = document.getElementById("orderHistory");
  const li = document.createElement("li");
  li.innerText = `${currentOrder.placedItems.map(i => `${i.name} x ${i.qty}`).join(', ')} — ${address}`;
  ul.prepend(li);

  // Clear cart inputs and data (keep placedItems for active order display)
  currentOrder.items = [];
  renderCart();
  document.getElementById("orderAddress").value = "";

  alert("Order placed!");
}
