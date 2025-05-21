const express = require('express');
const router = express.Router();
const controllerProduct = require('../controller/product')


router.get("/", controllerProduct.get);
router.get("/:id", controllerProduct.getById);
router.post("/", controllerProduct.addProduct);
router.put('/:id', controllerProduct.updateProduct);
router.delete('/:id', controllerProduct.deleteProduct);
router.delete('/:cart/:id', controllerProduct.deleteProduct);

module.exports = router;