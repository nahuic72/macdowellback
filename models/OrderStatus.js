startConnection = require("./connection");

class orderStatus {
    constructor(
      id_order=null, 
      id_status=null
    ) {
      this.id_order = id_order;
      this.id_status = id_status;
    }
}

pgClient = startConnection()

class orderStatusManager {
  
  static async getAll() {
      const queryResponse = await pgClient.query("select * from order_status");
      const OrderStatus = convertOrderStatusDataToObjects(queryResponse.rows);
      return OrderStatus;
    }
  static async getId(status) {
      const queryResponse = await pgClient.query(" select * from order_status WHERE id_status=$1",[status])
      const OrderStatus = convertOrderStatusDataToObjects(queryResponse.rows);
      return OrderStatus;
  }
 
  
  
    static async createOrderStatus() {
    const ultimo= await pgClient.query("select max(id_num_order) from orders");
    const id_order=ultimo.rows[0].max;
    const newOrderStatus = await pgClient.query(`INSERT INTO order_status (id_order,id_status) 
    values
    ($1, $2)`, [ id_order,1]);
    
    return newOrderStatus;
    }
 
    static async pacthStatus(id) {
      const queryStatus = await pgClient.query("SELECT id_status FROM order_status where id_order=$1",[id]);
      let status=queryStatus.rows[0].id_status;
      let other = status+1;
      const newStatus = await  pgClient.query( "UPDATE order_status SET id_status=$1 WHERE id_order=$2",
      [other , id] );
      return newStatus;
    }
    
  }

  function convertOrderStatusObjecToData(OrderStatus) {
    return `'${id_order}', '${id_status}'`;
  }
  function convertOrderStatusDataToObjects(data) {
    let OrderStatus = [];
    for (const objectData of data) {
      OrderStatus.push(
        new orderStatus(
          (id_order = objectData.id_order),
          (id_status = objectData.id_status)
        )
      );
    };
    return OrderStatus;
  }
  
  module.exports = orderStatusManager;