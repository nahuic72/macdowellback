ProductsManager = require("../../models/products");

const patchProduct = async (req, res) => {
    const order = req.body
    await ProductsManager.pacthProduct(order)
    res.status(201).json();
  };


module.exports = patchProduct;