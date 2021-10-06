const express = require('express');
const router = express.Router();
const productController = require('../../controllers/controller_product');

//api/productos
router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.put('/:slug', productController.updateProduct);
router.get('/:slug', productController.getProduct);
router.delete('/:slug', productController.deleteProduct);

module.exports = router;