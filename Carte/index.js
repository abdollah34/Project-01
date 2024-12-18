        // Function to load and display cart data
        function loadCart() {
            const cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from localStorage
            const cartItemsElement = document.getElementById("cart-items");
            const cartCountElement = document.getElementById("cart-count");
            const cartTotalElement = document.getElementById("cart-total");

            // Clear existing cart content
            cartItemsElement.innerHTML = "";

            if (cart.length === 0) {
                // If the cart is empty
                cartItemsElement.innerHTML = '<li class="list-group-item d-flex justify-content-between"><span>Your cart is empty.</span></li>';
                cartCountElement.textContent = "0";
                cartTotalElement.textContent = "$0.00";
                return;
            }

            // Populate the cart items
            let totalItems = 0;
            let totalPrice = 0;
            cart.forEach(item => {
                const cartItem = document.createElement("li");
                cartItem.className = "list-group-item d-flex justify-content-between lh-sm";
                cartItem.innerHTML = `
                    <div>
                        <h6 class="my-0">${item.name}</h6>
                        <small class="text-muted">Quantity: ${item.quantity}</small>
                    </div>
                    <span class="text-muted">$${(item.price * item.quantity).toFixed(2)}</span>
                `;
                cartItemsElement.appendChild(cartItem);
                totalItems += item.quantity;
                totalPrice += item.price * item.quantity;
            });

            // Update the cart count badge
            cartCountElement.textContent = totalItems;

            // Update the total price
            cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
        }

        // Load the cart when the page loads
        document.addEventListener("DOMContentLoaded", loadCart);