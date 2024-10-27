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

async function updateProduct(productId, product) {
    await pool.query(`
        UPDATE products 
        SET name = '${product.name}', character = '${product.character}', 
        price = ${parseInt(product.price)}, category_id = ${parseInt(product.category)},
        make_id = ${parseInt(product.make)}
        WHERE id = ${productId};`)
}

async function addProduct(product) {
    await pool.query(`
        INSERT INTO products (name, character, price, category_id, make_id)
        VALUES ('
        ${product.name}', '${product.character}', 
        ${parseInt(product.price)}, ${parseInt(product.category)},
        ${parseInt(product.make)})
        `)
}

module.exports = {
    getAllCategories,
    getAllProducts,
    getAllMakes,
    getProduct,
    updateProduct,
    addProduct
}