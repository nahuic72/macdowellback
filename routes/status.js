var router = require('express').Router();

router.get('/:in_status', require('../controllers/statusControllers/getStatusIn'));


module.exports = router;