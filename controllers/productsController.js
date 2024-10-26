const db = require("../db/queries");

async function productsGet(req, res) {
    const products = await db.getAllProducts();
    const categories = await db.getAllCategories();
    res.render("products", { products: products, categories: categories});
}

async function productGet(req, res) {
    const { productId } = req.params;
    const product = await db.getProduct(productId);
    const categories = await db.getAllCategories();
    const makes = await db.getAllMakes();

    res.render("product", { 
        product: product, 
        categories: categories, 
        makes: makes 
    });
}

module.exports = {
    productsGet,
    productGet,
}