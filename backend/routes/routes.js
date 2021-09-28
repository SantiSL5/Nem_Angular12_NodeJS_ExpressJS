const express = require('express');
const router = express.Router();
const productoController = require('../controllers/controller');

//api/productos
router.post('/', productoController.createProduct);
router.get('/', productoController.getProducts);
router.put('/:id', productoController.updateProduct);
router.get('/:id', productoController.getProduct);
router.delete('/:id', productoController.deleteProduct);

module.exports = router;