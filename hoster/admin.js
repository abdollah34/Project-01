document.addEventListener("DOMContentLoaded", () => {
    const productSelect = document.getElementById("product-select");
    const productForm = document.getElementById("product-form");
    const productName = document.getElementById("product-name");
    const productPrice = document.getElementById("product-price");
    const productDiscount = document.getElementById("product-discount");
    const productDescription = document.getElementById("product-description");
    const productImages = document.getElementById("product-images");

    // Fetch the list of products and populate the dropdown
    fetch("/api/products")
        .then((response) => response.json())
        .then((products) => {
            products.forEach((product) => {
                const option = document.createElement("option");
                option.value = product;
                option.textContent = product;
                productSelect.appendChild(option);
            });
        })
        .catch((error) => console.error("Error fetching products:", error));

    // Handle form submission
    productForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const selectedProduct = productSelect.value;
        const formData = new FormData();

        // Add form data for product update
        formData.append("name", productName.value.trim());
        formData.append("price", productPrice.value.trim());
        formData.append("discount", productDiscount.value.trim());
        formData.append("description", productDescription.value.trim());

        // Add all selected images to the form data
        Array.from(productImages.files).forEach((file) => {
            formData.append("images", file);
        });

        // Send a POST request to update the selected product
        fetch(`/api/products/${selectedProduct}`, {
                method: "POST",
                body: formData,
            })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error("Failed to update product.");
                }
            })
            .then((message) => {
                alert(message);
                // Optionally reset the form after successful update
                productForm.reset();
            })
            .catch((error) => {
                console.error("Error updating product:", error);
                alert("An error occurred while updating the product.");
            });
    });
});