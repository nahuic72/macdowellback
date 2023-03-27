const OrdersManager = require("../../models/orders");


const getOrders = async (req, res) => {
  const response = await OrdersManager.getAll();
  res.status(200).json(response);
};

module.exports = getOrders;
