const productsOrderManager = require("../../models/ProductsOrder");
const {getpdfOrder} = require('../mailControllers/pdfController')
const {postEmailOrder} = require('../mailControllers/emailController')

const createProductOrder = async (req, res) => {
  const products = req.body;
  await productsOrderManager.createproducts_in_Order(products);
  await getpdfOrder();
  res.status(201).end();
};

module.exports = createProductOrder;