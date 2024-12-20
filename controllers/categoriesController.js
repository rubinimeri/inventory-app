const db = require("../db/queries");

async function categoriesGet(req, res) {
    const categories = await db.getAllCategories();
    res.render("categories/categories", { categories: categories })
}

async function addCategoryGet(req, res) {
    res.render("categories/addCategory");
}

async function addCategoryPost(req, res) {
    const { category } = req.body;
    await db.addCategory(category);
    res.redirect('/categories');
}

async function deleteCategoryPost(req, res) {
    const { categoryId } = req.params;
    await db.deleteCategory(parseInt(categoryId));
    res.redirect('/categories');
}

module.exports = {
    categoriesGet,
    addCategoryGet,
    addCategoryPost,
    deleteCategoryPost
}