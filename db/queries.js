const pool = require("./pool");

async function getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM categories");
    return rows;
}

async function addCategory(category) {
    await pool.query(`INSERT INTO categories (name) VALUES ('${category}')`)
}

async function getAllMakes() {
    const { rows } = await pool.query("SELECT * FROM makes");
    return rows;
}

async function getAllProducts() {
    const { rows } = await pool.query("SELECT * FROM products");
    return rows;
}

async  function getProductsByCategory(category) {
    const { rows } = await pool.query(`SELECT products.id, products.name, character, price, category_id, make_id FROM products INNER JOIN categories ON categories.id = products.category_id WHERE categories.name = '${category}'`);
    return rows;
}

async  function getProductsByCategories(categories) {
    const { rows } = await pool.query(`SELECT products.id, products.name, character, price, category_id, make_id FROM products INNER JOIN categories ON categories.id = products.category_id WHERE categories.name IN ${categories}`);
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
    addCategory,
    getAllProducts,
    getAllMakes,
    getProduct,
    updateProduct,
    addProduct,
    getProductsByCategory,
    getProductsByCategories
}