const db = require("../db/queries");

async function categoriesGet(req, res) {
    const categories = await db.getAllCategories();
    console.log(categories);
    res.render("categories", { categories: categories })
}


module.exports = {
    categoriesGet
}