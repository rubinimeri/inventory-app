const { Router } = require("express");
const productsController = require("../controllers/productsController");

const productsRouter = Router();

productsRouter.get("/", productsController.productsGet);
productsRouter.get("/add", productsController.createProductGet)
productsRouter.post("/add", productsController.createProductPost)
productsRouter.get("/:productId", productsController.productGet);
productsRouter.get("/:productId/edit", productsController.editProductGet);
productsRouter.post("/:productId/edit", productsController.editProductPost);
productsRouter.post("/:productId/delete", productsController.deleteProductPost);

module.exports = productsRouter;