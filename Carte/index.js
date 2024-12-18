// Load the cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update the cart display
function updateCartUI() {
    const cartElement = document.getElementById("cart");
    const totalElement = document.getElementById("total-price");
    cartElement.innerHTML = ""; // Clear the cart display

    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <span>${item.name} - ${item.price.toFixed(2)} MAD</span>
            <button class="btn btn-sm btn-secondary" onclick="changeQuantity('${item.id}', -1)">-</button>
            <span>${item.quantity}</span>
            <button class="btn btn-sm btn-secondary" onclick="changeQuantity('${item.id}', 1)">+</button>
        `;
        cartElement.appendChild(cartItem);
    });

    totalElement.textContent = `Total: ${totalPrice.toFixed(2)} MAD`;

    // Handle empty cart
    if (cart.length === 0) {
        cartElement.innerHTML = "<p>Your cart is empty!</p>";
        totalElement.textContent = "Total: 0 MAD";
    }
}

// Function to change the quantity of a product
function changeQuantity(productId, change) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
    }
}

// Initial cart display
updateCartUI();