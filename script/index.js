// Initialize an empty cart
let cart = [];

// Function to add a product to the cart
function addToCart(product) {
    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        // If it's already in the cart, increase the quantity
        existingProduct.quantity += 1;
    } else {
        // Otherwise, add it to the cart
        cart.push({...product, quantity: 1 });
    }
    console.log("Cart Updated:", cart);
    updateCartUI();
}

// Function to update the cart display
function updateCartUI() {
    const cartElement = document.getElementById("cart");
    cartElement.innerHTML = ""; // Clear the cart display
    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <span>${item.name} - $${item.price}</span>
            <button onclick="changeQuantity('${item.id}', -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity('${item.id}', 1)">+</button>
        `;
        cartElement.appendChild(cartItem);
    });
}

// Function to change the quantity of a product
function changeQuantity(productId, change) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += change;
        // Remove the product if quantity is zero or less
        if (product.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        console.log("Cart Updated:", cart);
        updateCartUI();
    }
}

// Event listener for "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const product = {
            id: button.dataset.id,
            name: button.dataset.name,
            price: parseFloat(button.dataset.price),
        };
        addToCart(product);
    });
});