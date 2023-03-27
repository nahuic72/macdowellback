const { Client } = require("pg");

const startconnection = () => {
  const myClient = new Client({
    user: process.env.USERDB,
    host: process.env.HOSTDB,
    database: process.env.NAMEDB,
    password: process.env.PASSWORD,
    port: 5432,
  });
  myClient.connect();
  return myClient;
};

module.exports = startconnection
