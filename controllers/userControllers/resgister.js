const UserManager = require("../../models/users");
const ClientsManager = require("../../models/clients");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  var BCRYP_SALT_RAUNDS = 10;

  const { username, password, name} = req.body;

  const ifExist = await UserManager.signIn(username);

  if (!ifExist) {
    const passwordCryp = await bcrypt.hash(password, BCRYP_SALT_RAUNDS);

    await UserManager.register(username.toLowerCase(), passwordCryp);
    await ClientsManager.register(name);
    const token = jwt.sign({ username }, process.env.SECRET, {
      algorithm: "HS256",
      expiresIn: 3000,
    });

    const client = await ClientsManager.getClient();

    res.status(201).json({ token, name: client.name, id_user: client.id_user });
  } else{
    const error =[{Msg:"usuario ya existente"}]
      res.status(406).json(error)
  }
};

module.exports = registerController;
