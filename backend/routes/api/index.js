const router = require('express').Router();

router.use('/product',require('./product'));
router.use('/category',require('./category'));

module.exports = router;