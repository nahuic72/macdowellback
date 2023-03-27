const UserManager = require("../../models/users");
const WaiterManager = require("../../models/waiter");
const ChefManager = require("../../models/chef");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminManager = require("../../models/admin");

const registerControllerEmployeers = async (req, res) => {
  var BCRYP_SALT_RAUNDS = 5;

  const { username, password, role } = req.body;

  const ifExist = await UserManager.signIn(username);

  if (!ifExist) {
    const passwordCryp = await bcrypt.hash(password, BCRYP_SALT_RAUNDS);
    
    await UserManager.register(username.toLowerCase(), passwordCryp);

    if (role === "waiter") {
      await WaiterManager.register();
    } else if (role === "chef") {
      await ChefManager.register();
    } else if (role === "admin") {
      await AdminManager.register();
    }
    
    res.status(201).json({Msg: "se ha creado el usuario correctamente"});
  } else {
    const error = [{ Msg: "usuario ya existente" }];
    res.status(406).json(error);
  }
};

module.exports = registerControllerEmployeers;
