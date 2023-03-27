const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserManager = require("../../models/users");
const ClientsManager = require("../../models/clients");
const AdminManager = require("../../models/admin");
const ChefManager = require("../../models/chef");
const WaiterManager = require("../../models/waiter");

const signInController = async (req, res) => {
  const { username, password } = req.body;
  const response = await UserManager.signIn(username.toLowerCase());

  if (!response) {
    res.status(401).json({ error: "usuario no encontrado" });
    return;
  }

  const samePassword = await bcrypt.compare(password, response.password);

  if (!samePassword) {
    res.status(401).json({ error: "usuario y/o contraseña incorrecta" });
    return;
  }
  const { id_user } = response;

  const client = await ClientsManager.getClient(id_user);
  if (typeof client !== "undefined") {
    const token = jwt.sign({ username }, process.env.SECRET, {
      algorithm: "HS256",
      expiresIn: 3000,
    });

    res.status(200).json({ token, name: client.name, id_user: client.id_user });
  }

  const admin = await AdminManager.getAdmin(id_user);
  if (typeof admin !== "undefined") {
    const token = jwt.sign({ username }, process.env.SECRET, {
      algorithm: "HS256",
      expiresIn: 3000,
    });

    res.status(200).json({ token, id_user: admin.id_user, username : username, role: "admin" });
  }

  const chef = await ChefManager.getChef(id_user);
  if (typeof chef !== "undefined") {
    const token = jwt.sign({ username }, process.env.SECRET, {
      algorithm: "HS256",
      expiresIn: 3000,
    });

    res.status(200).json({ token, id_user: chef.id_user , username : username, role: "chef"});
  }

  const waiter = await WaiterManager.getWaiter(id_user);
  if (typeof waiter !== "undefined") {
    const token = jwt.sign({ username }, process.env.SECRET, {
      algorithm: "HS256",
      expiresIn: 3000,
    });

    res.status(200).json({ token, id_user: waiter.id_user, username : username, role: "waiter" });
  }
};

module.exports = signInController;
