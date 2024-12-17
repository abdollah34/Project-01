// Initialize an empty cart
const cart = [];

// Add to Cart function
function addToCart(product) {
    // Check if the product already exists in the cart
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({...product, quantity: 1 });
    }
    updateCartDisplay();
}

// Update Cart Display
function updateCartDisplay() {
    const cartList = document.querySelector('.list-group');
    const cartCount = document.querySelector('.badge.bg-primary');
    const totalAmount = document.querySelector('.list-group-item:last-child strong');

    cartList.innerHTML = cart
        .map(
            item => `
            <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 class="my-0">${item.name}</h6>
                    <small class="text-body-secondary">${item.description}</small>
                </div>
                <span class="text-body-secondary">$${item.price} x ${item.quantity}</span>
            </li>
        `
        )
        .join('');

    // Update cart count and total
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    totalAmount.textContent = `$${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}`;
}

// Example usage (simulate product addition)
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const product = {
            name: button.dataset.name,
            description: button.dataset.description,
            price: parseFloat(button.dataset.price)
        };
        addToCart(product);
    });
});