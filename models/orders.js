const startConnection = require("./connection");

class Order {
  constructor(
    id_num_order = null,
    order_date = null,
    order_time = null,
    id_user = null,
    order_mail = null
  ) {
    this.id_num_order = id_num_order;
    this.order_date = order_date;
    this.order_time = order_time;
    this.order_mail = order_mail;
    this.id_user = id_user;
  }
}

const pgClient = startConnection();

class OrdersManager {

  static async getAll() {
    const queryResponse = await pgClient.query("select * from orders");
    const orders = convertOrderDataToObjects(queryResponse.rows);
    return orders;
  }

  static async getId(id) {
    const queryResponse = await pgClient.query(
      "select * from orders where id_num_order=$1",
      [id]
    );
    const orders = convertOrderDataToObjects(queryResponse.rows);
    return orders;
  }
  
 

    static async createOrder(dataOrder) {
        var today = new Date();
        var now = today.toLocaleString().split(',')[0]
        var fecha = now.split('/').reverse().join('/');
        var time =today.toLocaleTimeString('it-IT');

        const {email, id_user} = dataOrder;
        if (!id_user){
        const newOrder = await pgClient.query(`INSERT INTO orders(order_date,order_time,order_mail) 
        values ($1, $2, $3)`, [fecha, time, email]);
        return newOrder;
        } 
        const newOrder = await pgClient.query(`INSERT INTO orders(order_date,order_time,order_mail,id_user) 
        values ($1, $2, $3, $4)`, [fecha, time, email, id_user]);
        return newOrder;

      }  
  
  }
  
  function convertOrderObjectToData(order) {
    return `'${id_num_order}', '${order_date}','${order_time} '${id_user}','${order_mail}'`;
  }
  function convertOrderDataToObjects(data) {
    let orders = [];
    for (const objectData of data) {
      orders.push(
        new Order(
          (id_num_order = objectData.id_num_order),
          (order_date = objectData.order_date),
          (order_time = objectData.order_time),
          (id_user= objectData.id_user),
          (order_mail = objectData.order_mail)
        )
      );
    }
    return orders;
  }
  
  module.exports = OrdersManager;