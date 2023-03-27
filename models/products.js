const startConnection = require("./connection");

class Product {
  constructor(
    id_product = null,
    name = null,
    description = null,
    image = null,
    price = null,
    stock_day = null,
    available_stock = null
  ) {
    this.id_product = id_product;
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.stock_day = stock_day;
    this.available_stock = available_stock;
  }
}

pgClient = startConnection();

class ProductsManager {
  static async getAll() {
    const queryResponse = await pgClient.query("SELECT * FROM products");
    const products = convertProductDataToObjects(queryResponse.rows);
    return products;
  }

  static async getSingle(id) {
    const queryResponse = await pgClient.query(
      "SELECT * FROM products WHERE id_product=$1",
      [id]
    );
    const products = convertProductDataToObjects(queryResponse.rows);
    return products;
  }

  static async pacthProduct(order) {
    const queryResponse = await pgClient.query("SELECT * FROM products");
    let products = convertProductDataToObjects(queryResponse.rows);
    for (let i = 0; i < products.length; i++) {
      products = products.map((prod) =>
        order[i].id_product === prod.id_product
          ? { ...prod, available_stock: available_stock - order[i].quantity }
          : prod
      );
    }
    products.map((prod)=>  {return   pgClient.query( "UPDATE products SET available_stock=$1 WHERE id_product=$2",
    [prod.available_stock,prod.id_product] )})
    
  }
}

function convertProductObjectToData(product) {
  return `'${product.id}', '${product.name}', '${product.price}'`;
}

function convertProductDataToObjects(data) {
  let products = [];
  for (const objectData of data) {
    products.push(
      new Product(
        (id_product = objectData.id_product),
        (name = objectData.name),
        (description = objectData.description),
        (image = objectData.image),
        (price = objectData.price),
        (stock_day = objectData.stock_day),
        (available_stock = objectData.available_stock)
      )
    );
  }
  return products;
}

module.exports = ProductsManager;
