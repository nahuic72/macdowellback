const startConnection = require("./connection");

class Clients {
  constructor(id_client = null, id_user = null, name = null) {
    this.id_client = id_client;
    this.id_user = id_user;
    this.name = name;
  }
}

const pgClient = startConnection();

class ClientsManager {
  static async register(name) {
    const lastId = await pgClient.query("select max(id_user) from users");
    const id_user = lastId.rows[0].max;

    const newClient = await pgClient.query(
      "INSERT INTO clients (id_user, name) VALUES ($1,$2)",
      [id_user, name]
    );
    return newClient;
  }

  static async getClient (id){
    if(!id){ 
      const lastId = await pgClient.query("select max(id_user) from users");
      const id_user = lastId.rows[0].max;
      const response = await pgClient.query('SELECT * FROM clients WHERE id_user=$1', [id_user])
      const client = convertClientsDataToObjects(response.rows)
      return client[0]
    }
      
    const response = await pgClient.query('SELECT * FROM clients WHERE id_user=$1', [id])
    const client = convertClientsDataToObjects(response.rows)
    return client[0]
    
  }
  
}



function convertClientsDataToObjects(data) {
  let clients = [];
  for (const objectData of data) {
    clients.push(
      new Clients(
        (id_client = objectData.id_client),
        (id_user = objectData.id_user),
        (name = objectData.name)
      )
    );
  }
  return clients;
}


module.exports = ClientsManager;