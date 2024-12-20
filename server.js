const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const app = express();
const upload = multer({ dest: "uploads/" }); // Temporary upload directory

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productsDir = path.join(__dirname, "products");

// Get the list of products
app.get("/api/products", (req, res) => {
    fs.readdir(productsDir, (err, files) => {
        if (err) return res.status(500).send("Error reading products directory.");
        const directories = files.filter((file) => fs.statSync(path.join(productsDir, file)).isDirectory());
        res.json(directories);
    });
});

// Get product details
app.get("/api/products/:product", (req, res) => {
    const productPath = path.join(productsDir, req.params.product, "index.html");
    if (!fs.existsSync(productPath)) return res.status(404).send("Product not found.");
    fs.readFile(productPath, "utf-8", (err, data) => {
        if (err) return res.status(500).send("Error reading product file.");
        res.json({ html: data });
    });
});

// Update product details
// Update product details with multi-image support
app.post("/api/products/:product", upload.array("images", 10), (req, res) => {
    const productDir = path.join(productsDir, req.params.product);
    if (!fs.existsSync(productDir)) return res.status(404).send("Product not found.");

    const { name, price, description } = req.body;
    const htmlPath = path.join(productDir, "index.html");

    // Update index.html content
    fs.readFile(htmlPath, "utf-8", (err, data) => {
        if (err) return res.status(500).send("Error reading product file.");

        let updatedHtml = data;
        if (name) updatedHtml = updatedHtml.replace(/<h2>.*<\/h2>/, `<h2>${name}</h2>`);
        if (price) updatedHtml = updatedHtml.replace(/<p class="price">.*<\/p>/, `<p class="price">${price}</p>`);
        if (description) updatedHtml = updatedHtml.replace(/<p class="description">.*<\/p>/, `<p class="description">${description}</p>`);

        fs.writeFile(htmlPath, updatedHtml, (err) => {
            if (err) return res.status(500).send("Error updating product file.");
        });
    });

    // Save uploaded images
    if (req.files && req.files.length > 0) {
        const imageDir = path.join(productDir, "images");
        if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir);

        req.files.forEach((file) => {
            const imagePath = path.join(imageDir, file.originalname);
            fs.renameSync(file.path, imagePath);
        });
    }

    res.send("Product updated successfully.");
});


// Serve static files (for admin panel)
app.use(express.static(path.join(__dirname, "hoster")));

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));