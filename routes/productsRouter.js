const { Router } = require("express");
const productsController = require("../controllers/productsController");

const productsRouter = Router();

productsRouter.get("/", productsController.productsGet);
productsRouter.get("/:productId", productsController.productGet)

module.exports = productsRouter;