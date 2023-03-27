startConnection = require("./connection");

class Access {2
    constructor( 
      id_user=null,
      username=null,
      password=null,
      state=null
    ) {
      this.id_user = id_user;
      this.username = username;
      this.password = password;
      this.state = state
    }
}

pgClient = startConnection()

class AccessManager {
  

  static async getAccess(user) {
      const queryResponse = await pgClient.query("select * from (select users.*, '3,4,5' as state from users right join waiter  on users.id_user= waiter.id_user union select users.*, '1,2,3' as state from users right join chef on users.id_user= chef.id_user union select users.*, '1,2,3,4,5' as state from users right join admin on users.id_user= admin.id_user ) as worker where worker.id_user=$1",[user]);
      const access = convertAccessToObjects(queryResponse.rows);
      return access;
  }
}

  function convertAccessToData(access) {
    return `'${id_user}' , '${username}','${password}','${state}'`;
  }
  function convertAccessToObjects(data) {
    let access = [];
    for (const objectData of data) {
      access.push(
        new Access(
          (id_user = objectData.id_user),
          (username = objectData.username),
          (password = objectData.password),
          (state = objectData.state)
        )
      );
    };
    return access;
  }
  
  module.exports = AccessManager;