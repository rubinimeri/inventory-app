const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController");

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesController.categoriesGet);
categoriesRouter.get("/add", categoriesController.addCategoryGet);
categoriesRouter.post("/add", categoriesController.addCategoryPost);
categoriesRouter.post("/delete/:categoryId", categoriesController.deleteCategoryPost);

module.exports = categoriesRouter;