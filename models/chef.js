const startConnection = require("./connection");

class Chef {
  constructor(id_chef = null, id_user = null) {
    this.id_chef = id_chef;
    this.id_user = id_user;
  }
}

const pgClient = startConnection();

class ChefManager {
  static async register() {
    const lastId = await pgClient.query("select max(id_user) from users");
    const id_user = lastId.rows[0].max;

    const newChef = await pgClient.query(
      "INSERT INTO chef (id_user) VALUES ($1)",
      [id_user]
    );
    return newChef;
  }

  static async getChef(id) {

    const response = await pgClient.query('SELECT * FROM chef WHERE id_user=$1', [id])
    const chef = convertChefDataToObjects(response.rows)
    return chef[0]

  }

}


function convertChefDataToObjects(data) {
  let chef = [];
  for (const objectData of data) {
    chef.push(
      new Chef(
        (id_chef = objectData.id_chef),
        (id_user = objectData.id_user),
      )
    );
  }
  return chef;
}


module.exports = ChefManager;