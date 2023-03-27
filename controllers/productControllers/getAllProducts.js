ProductsManager = require("../../models/products");

const getAllProducts = async (req, res) => {
  const response = await ProductsManager.getAll();
  res.status(200).json(response);
};


module.exports = getAllProducts;