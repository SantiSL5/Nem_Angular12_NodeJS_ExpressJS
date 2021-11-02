const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/controller_category')

//api/productos
router.post('/', categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.put('/:slug', categoryController.updateCategory);
router.delete('/:slug', categoryController.deleteCategory);

module.exports = router;