const startConnection = require("./connection");

class User {
  constructor(
    id_user = null,
    username = null,
    password = null,
  ) {
    this.id_user = id_user;
    this.username = username;
    this.password = password;
  }
}

pgClient = startConnection();

class UserManager {
    static async getAll() {
      const queryResponse = await pgClient.query("SELECT * FROM user");
      const user = convertUserDataToObjects(queryResponse.rows);
      return user;
    }
  
    static async signIn(username) {
      const queryResponse = await pgClient.query('SELECT * FROM users WHERE username=$1', [username])
      if (!queryResponse){
        return null 
      }
      const user = convertUserDataToObjects(queryResponse.rows);
      return user[0];
    }
  

    static async register(username, password){
      const queryResponse = await pgClient.query('INSERT INTO users (username, password) VALUES ($1,$2)', [username, password])
      return (queryResponse)
    }
    
  }

  function convertUserObjectToData(info) {
    return `'${info.name}', '${info.email}', '${info.password}'`;
  }
  
  function convertUserDataToObjects(data) {
    let user = [];
    for (const objectData of data) {
      user.push(
        new User(
          (id_user = objectData.id_user),
          (username = objectData.username),
          (password = objectData.password)
        )
      );
    }
    return user;
  }
  
  module.exports = UserManager;