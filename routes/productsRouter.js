const { Router } = require("express");
const productsController = require("../controllers/productsController");

const productsRouter = Router();

productsRouter.get("/", productsController.productsGet);
productsRouter.get("/:productId", productsController.productGet);
productsRouter.get("/:productId/edit", productsController.editProductGet);
productsRouter.post("/:productId/edit", productsController.editProductPost);

module.exports = productsRouter;