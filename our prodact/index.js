document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.card');
        const cartIcon = document.getElementById('cart-icon');

        // Create a clone of the product image for the animation
        const productImage = productCard.querySelector('img');
        const flyingImage = productImage.cloneNode(true);

        // Style the cloned image for the animation
        flyingImage.style.position = 'absolute';
        flyingImage.style.left = `${productCard.offsetLeft + productImage.offsetLeft}px`;
        flyingImage.style.top = `${productCard.offsetTop + productImage.offsetTop}px`;
        flyingImage.style.zIndex = '999';
        document.body.appendChild(flyingImage);

        // Add the flying animation class
        flyingImage.classList.add('fly');

        // After animation ends, remove the cloned image and update cart count
        flyingImage.addEventListener('animationend', () => {
            document.body.removeChild(flyingImage);
            updateCartCount();
        });
    });
});

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    let count = parseInt(cartCount.textContent);
    cartCount.textContent = count + 1; // Increase the cart count by 1
}
// Select all scroll items
const scrollItems = document.querySelectorAll('.scroll-item');

// Set up Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show'); // Add 'show' class when in view
        } else {
            entry.target.classList.remove('show'); // Optional: remove class when out of view
        }
    });
}, { threshold: 0.1 }); // Trigger when 10% is visible

// Observe each scroll item
scrollItems.forEach(item => observer.observe(item));