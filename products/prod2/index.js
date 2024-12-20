// Function to handle adding a product to the cart
function addToCart() {
    const productName = document.querySelector(".details-container h2").textContent; // Product name
    const productPrice = parseFloat(document.querySelector(".price").textContent.replace("$", "")); // Product price

    // Get the main image for the product
    const productImage = document.querySelector(".carousel-item.active img").src;

    // Get selected size
    const selectedSize = document.querySelector("#size-options span.selected");
    const size = selectedSize ? selectedSize.textContent : "N/A";

    // Get selected color
    const selectedColor = document.querySelector("#color-options .color.selected");
    const color = selectedColor ? selectedColor.classList[1] : "N/A";

    // Get quantity
    const quantity = parseInt(document.getElementById("quantity").value) || 1;

    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product with the same options is already in the cart
    const existingProduct = cart.find(item =>
        item.name === productName &&
        item.size === size &&
        item.color === color
    );

    if (existingProduct) {
        // Increment quantity
        existingProduct.quantity += quantity;
    } else {
        // Add new product
        cart.push({
            name: productName,
            price: productPrice,
            size: size,
            color: color,
            quantity: quantity,
            image: productImage // Include product image
        });
    }

    // Save cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`Added ${productName} (Size: ${size}, Color: ${color}, Quantity: ${quantity}) to your cart!`);
}

// Add event listeners for size and color options
function setupOptionSelectors() {
    const sizeOptions = document.querySelectorAll("#size-options span");
    const colorOptions = document.querySelectorAll("#color-options .color");

    // Handle size selection
    sizeOptions.forEach(size => {
        size.addEventListener("click", () => {
            sizeOptions.forEach(s => s.classList.remove("selected"));
            size.classList.add("selected");
        });
    });

    // Handle color selection
    colorOptions.forEach(color => {
        color.addEventListener("click", () => {
            colorOptions.forEach(c => c.classList.remove("selected"));
            color.classList.add("selected");
        });
    });
}

// Initialize event listeners on page load
document.addEventListener("DOMContentLoaded", () => {
    setupOptionSelectors();

    const addToCartButton = document.querySelector(".add-to-cart");
    addToCartButton.addEventListener("click", addToCart);
});