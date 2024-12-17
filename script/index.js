document.addEventListener("DOMContentLoaded", () => {
    let cartCounter = 0;
    const cartCounterElement = document.getElementById("cart-counter");
    const cartItemsElement = document.getElementById("cart-items");

    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", () => {
            // Increment the cart counter
            cartCounter++;
            cartCounterElement.textContent = cartCounter;

            // Add the item to the cart
            const itemName = button.getAttribute("data-name");
            const itemPrice = button.getAttribute("data-price");

            const newItem = document.createElement("li");
            newItem.className = "list-group-item d-flex justify-content-between lh-sm";
            newItem.innerHTML = `
                <div>
                    <h6 class="my-0">${itemName}</h6>
                </div>
                <span class="text-body-secondary">$${itemPrice}</span>
            `;
            cartItemsElement.appendChild(newItem);
        });
    });
});