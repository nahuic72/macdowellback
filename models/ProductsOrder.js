startConnection = require("./connection");

class ProductsOrder {
  constructor(
    id_order = null,
    id_product = null,
    units = null,
    price = null,
    coment = null
  ) {
    this.id_order = id_order;
    this.id_product = id_product;
    this.units = units;
    this.price = price;
    this.coment = coment;
  }
}

pgClient = startConnection();

class productsOrderManager {
  static async getAllProducts() {
    const queryResponse = await pgClient.query(
      "select * from products_in_order"
    );
    const ProductsOrder = convertOrderDataToObjects(queryResponse.rows);
    return ProductsOrder;
  }
  static async getId(id) {
    const queryResponse = await pgClient.query(
      " select * from products_in_order WHERE id_order=$1",
      [id]
    );
    const ProductsOrder = convertOrderDataToObjects(queryResponse.rows);
    return ProductsOrder;
  }

  static async createproducts_in_Order(products) {
    const ultimo = await pgClient.query("select max(id_num_order) from orders");
    const id_order = ultimo.rows[0].max;
    const newProduct_Order = products.map((prod) => {
      return pgClient.query(
        `INSERT INTO products_in_order (id_order,id_product,units,price,coment) 
    values
    ($1, $2,$3, $4, $5)`,
        [id_order, prod.id_product, prod.quantity, prod.price, ""]
      );
    });

    return newProduct_Order;
  }
}

function convertOProductsOrderDataToObjects(ProductOrder) {
  return `'${id_order}', '${id_product}','${units}','${price}','${coment}'`;
}
function convertOProductsOrderDataToObjects(data) {
  let ProductsOrder = [];
  for (const objectData of data) {
    products_in_order.push(
      new newProduct_Order(
        (id_order = objectData.id_order),
        (id_product = objectData.id_product),
        (units = objectData.units),
        (price = objectData.price),
        (coment = objectData.pricomentce)
      )
    );
  }
  return ProductsOrder;
}

module.exports = productsOrderManager;
