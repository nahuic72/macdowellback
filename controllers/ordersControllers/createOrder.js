const OrdersManager = require("../../models/orders");
const orderStatusManager = require("../../models/OrderStatus");



const createOrder = async (req, res) => {
  const dataOrder = req.body
  await OrdersManager.createOrder(dataOrder);
  await orderStatusManager.createOrderStatus();
  
  res.status(201).end();
};

module.exports = createOrder;
