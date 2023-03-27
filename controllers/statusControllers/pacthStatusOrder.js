orderStatusManager= require("../../models/OrderStatus");

const pacthStatusOrder = async (req, res) => {

    const id = req.params.id;
    await orderStatusManager.pacthStatus(id);
    res.status(201).json(`Se ha cambiado el estado al pedido: ${id}`);
  };


module.exports = pacthStatusOrder;