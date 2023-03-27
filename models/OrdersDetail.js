startConnection = require("./connection");

class OrdersDetail {
    constructor( 
      id_order=null,
      date=null,
      time=null,
      id_product=null,
      name=null,
      units=null,
      price=null,
      id_status=null,
      description=null
    ) {
      this.id_order = id_order;
      this.date = date;
      this.time = time;
      this.id_product = id_product;
      this.name = name;
      this.units = units;
      this.price = price;
      this.id_status = id_status;
      this.description = description;
    }
}

pgClient = startConnection()

class OrdersDetailManager {
  
  static async getOrdersDetail(id_state) {
    const queryResponse = await pgClient.query("select pedidos.*,estado.id_status,estado.description from (select products_in_order.id_order,orders.order_date date,orders.order_time time,products_in_order.id_product, products.name, products_in_order.units, products_in_order.price from products_in_order right join orders on orders.id_num_order= products_in_order.id_order inner join products on products.id_product=products_in_order.id_product) as pedidos inner join (select order_status.id_order,status.id_status, status.description  from order_status left join status on order_status.id_status=status.id_status) as estado on pedidos.id_order=estado.id_order where id_status=$1 order by id_order", [id_state]);
    const OrdersDetail = queryResponse.rows;
    return OrdersDetail;
  }
}
  

  function convertDetailOrderToData(OrderDetail) {
    return `'${id_order}','${date}','${time}','${id_product},'${name}','${units}','${price}','${id_status}','${description}'`;
  }
  function convertDetailOrderToObjects(data) {
    let ordersDetail = [];
    for (const objectData of data) {
      ordersDetail.push(
        new OrderDetail(
          (id_order = objectData.id_order),
          (date = objectData.date),
          (time = objectData.time),
          (id_product = objectData.id_product),
          (name = objectData.name),
          (units = objectData.units),
          (price = objectData.price),
          (id_status = objectData.id_status),
          (description = objectData.description)
        )
      );
    };
    return orderDetail;
  }
  
  module.exports = OrdersDetailManager;