var router = require("express").Router();


router.get("/all-products", require('../controllers/productControllers/getAllProducts'));
router.get("/:id", require('../controllers/productControllers/getSingleProduct'));
router.patch("/setStock", require('../controllers/productControllers/patchProduct'))

module.exports = router;
