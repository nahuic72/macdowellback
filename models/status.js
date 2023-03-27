startConnection = require("./connection");

class Status {
    constructor( 
      id_status=null,
      description=null,
    ) {
      this.id_status = id_status;
      this.description = description;
    }
}

pgClient = startConnection()

class statusManager {
  
  static async getAll() {
      const queryResponse = await pgClient.query("select * from status");
      const status = convertStatusDataToObjects(queryResponse.rows);
      return status;
    } 

  static async getStatus(in_status) {

      const myquery=`select * from status WHERE id_status in (${in_status}) order by id_status`;

      const queryResponse = await pgClient.query(myquery);
      const status = convertStatusDataToObjects(queryResponse.rows);
      return status;
  }
}

  function convertStatusObjecToData(status) {
    return `'${id_status}' , '${description}'`;
  }
  function convertStatusDataToObjects(data) {
    let status = [];
    for (const objectData of data) {
      status.push(
        new Status(
          (id_status = objectData.id_status),
          (description = objectData.description)
        )
      );
    };
    return status;
  }
  
  module.exports = statusManager;