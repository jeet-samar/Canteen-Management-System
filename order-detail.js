// On page load, fetch order data from localStorage and populate details
  document.addEventListener('DOMContentLoaded', () => {
    const orderData = JSON.parse(localStorage.getItem('orderData'));
    const orderToken = localStorage.getItem('orderToken');

    if (!orderData) {
      document.getElementById('orderItems').innerHTML = '<p>No order found. Please place an order first.</p>';
      return;
    }

    const orderItemsContainer = document.getElementById('orderItems');
    orderItemsContainer.innerHTML = '';

    orderData.items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'order-item';
      div.innerHTML = `<span>${item.name} x${item.qty}</span> <span>₹${item.price * item.qty}</span>`;
      orderItemsContainer.appendChild(div);
    });

    document.getElementById('orderSubtotal').textContent = orderData.subtotal.toFixed(2);
    document.getElementById('orderDelivery').textContent = orderData.delivery.toFixed(2);
    document.getElementById('orderTotal').textContent = orderData.total.toFixed(2);
    document.getElementById('orderPayment').textContent = orderData.payment || 'N/A';
    document.getElementById('orderToken').textContent = orderToken || 'N/A';

    document.getElementById('backBtn').onclick = () => {
      window.location.href = 'menu.html';
    };
  });
