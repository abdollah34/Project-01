document.getElementById("add-to-cart").addEventListener("click", () => {
    const quantity = document.getElementById("quantity").value;
    alert(`Added ${quantity} item(s) to your cart!`);
});