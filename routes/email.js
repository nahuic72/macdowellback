var router = require('express').Router();
const { response } = require('express');
const { postEmailOrder } = require('../controllers/mailControllers/emailController')

router.post('/getmail', postEmailOrder);
module.exports = router;

