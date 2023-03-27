var router = require("express").Router();
const { body, validationResult } = require("express-validator");
const validateToken = require('../middlewares/validateToken')

router.get( "/get-orders",  require("../controllers/ordersControllers/getOrders"));

router.get("/:id", require("../controllers/ordersControllers/getIdOrder"));

router.get("/ordersDetail/:id_status", require("../controllers/ordersControllers/getOrdersDetail"));

router.post(
  "/create-order",
  body("email", "Ingrese un email valido").isEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsMsg = errors.array();
      res.status(400).json({ errorsMsg: errorsMsg });
    } else {
      next();
    }
  },
  require("../controllers/ordersControllers/createOrder")
);


router.post(
  "/create-product-order",
  require("../controllers/ordersControllers/createProductOrder")
);


router.post(
  "/create-order-status",
  require("../controllers/ordersControllers/createOrderStatus")
);


router.patch(
  "/set-order/:id",
  require("../controllers/ordersControllers/setOrders")
);

//cambio estado por id pedido al siguiente
router.patch(
  "/status/:id",validateToken,
  require("../controllers/statusControllers/pacthStatusOrder")
);

module.exports = router;
