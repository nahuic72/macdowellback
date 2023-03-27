const OrdersManager = require("../../models/orders");

const getIdOrder = async (req, res) => {
  const id = req.params.id;
  const response = await OrdersManager.getId(id)
  res.status(200).json(response);
};

module.exports = getIdOrder;
