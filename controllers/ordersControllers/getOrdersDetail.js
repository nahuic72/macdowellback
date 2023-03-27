const OrdersDetailManager = require("../../models/OrdersDetail");


const OrdersDetail = async (req, res) => { 
  const id_status= req.params.id_status;
  const response = await OrdersDetailManager.getOrdersDetail(id_status);
  res.status(200).json(response);
};

module.exports = OrdersDetail;