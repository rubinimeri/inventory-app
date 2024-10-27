const db = require("../db/queries");

async function productsGet(req, res) {
    const { category } = req.query;
    const categories = await db.getAllCategories();

    if (!category) {
        const products = await db.getAllProducts();
        return res.render("products/products", { products: products, categories: categories, selectedCategory: null, selectedCategories: []});
    }

    if(Array.isArray(category)) {
        const SQL = `(${category.map(cat => `'${cat}'`).join(',')})`;
        const products = await db.getProductsByCategories(SQL);
        console.log(category);
        return res.render("products/products", { products: products, categories: categories, selectedCategories: category, selectedCategory: null});
    }

    const products = await db.getProductsByCategory(category);
    res.render("products/products", { products: products, categories: categories, selectedCategory: category, selectedCategories: []});
}

async function productGet(req, res) {
    const { productId } = req.params;
    const product = await db.getProduct(productId);
    const categories = await db.getAllCategories();
    const makes = await db.getAllMakes();

    res.render("products/product", { 
        product: product, 
        categories: categories, 
        makes: makes 
    });
}

async function editProductGet(req, res) {
    const { productId } = req.params;
    const product = await db.getProduct(productId);
    const categories = await db.getAllCategories();
    const makes = await db.getAllMakes();

    res.render("products/editProduct", { 
        product: product, 
        categories: categories, 
        makes: makes 
    });
}

async function editProductPost(req, res) {
    const { productId } = req.params;
    const product = { name, character, price, category, make } = req.body;
    await db.updateProduct(parseInt(productId), product);
    res.redirect(`/products/${productId}`);
}

async function createProductGet(req, res) {
    const categories = await db.getAllCategories();
    const makes = await db.getAllMakes();

    res.render("products/addProduct", {categories: categories, makes: makes});
}

async function createProductPost(req, res) {
    const product = { name, character, price, category, make } = req.body;
    await db.addProduct(product);
    res.redirect('/products');
}

module.exports = {
    productsGet,
    productGet,
    editProductGet,
    editProductPost,
    createProductGet,
    createProductPost
}