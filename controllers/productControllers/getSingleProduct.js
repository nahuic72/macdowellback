ProductsManager = require("../../models/products");

const getSingleProduct = async (req, res) => {
    const id = req.params.id;
    const response = await ProductsManager.getSingle(id)
    res.status(200).json(response[0]);
  };


module.exports = getSingleProduct;