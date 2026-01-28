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
  const itemsText = currentOrder.items.map(item => `${item.name} x ${item.qty}`).join(', ');
  document.getElementById("orderItemName").innerText = itemsText;

  document.getElementById("orderAddressText").innerText = currentOrder.address;
  updateTimeline(currentOrder.status);
}
