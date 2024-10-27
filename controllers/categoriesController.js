const db = require("../db/queries");

async function categoriesGet(req, res) {
    const categories = await db.getAllCategories();
    res.render("categories/categories", { categories: categories })
}

async function addCategoryGet(req, res) {
    res.render("categories/categories");
}

module.exports = {
    categoriesGet
}