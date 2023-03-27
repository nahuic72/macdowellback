var router = require('express').Router();

router.get('/:id_user', require('../controllers/workerControllers/Accessworker'));

module.exports = router;