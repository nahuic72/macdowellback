var router = require('express').Router();


router.use('/products', require('./products'));
router.use('/users', require('./users'));
router.use('/orders', require('./orders'));
router.use('/status', require('./status'));
router.use('/worker', require('./worker'));


module.exports = router;