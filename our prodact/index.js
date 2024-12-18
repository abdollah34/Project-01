// Cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productName = button.getAttribute('data-name');
        const productPrice = button.getAttribute('data-price');

        // You can store these in localStorage or sessionStorage to keep the cart persistent
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart.push({ name: productName, price: productPrice });

        // Save back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Optionally, update the cart display
        updateCartDisplay();
    });
});

// Update cart display
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.querySelector('.list-group');

    // Clear current list
    cartList.innerHTML = '';

    // Loop through the cart and add items to the list
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerText = `${item.name} - ${item.price} MAD`;
        cartList.appendChild(listItem);
    });
}

// Initial cart display
updateCartDisplay();