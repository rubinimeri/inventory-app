const pool = require("./pool");

async function getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM categories");
    return rows;
}

async function getAllMakes() {
    const { rows } = await pool.query("SELECT * FROM makes");
    return rows;
}

async function getAllProducts() {
    const { rows } = await pool.query("SELECT * FROM products");
    return rows;
}

async function getProduct(productId) {
    const { rows: [product] } = await pool.query(`SELECT * FROM products WHERE id = ${productId}`);
    return product;
}

module.exports = {
    getAllCategories,
    getAllProducts,
    getAllMakes,
    getProduct
}