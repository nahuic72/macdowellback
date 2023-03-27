AccessManager= require("../../models/AccessWorker");

const Accessworker = async (req, res) => {
    const user= req.params.id_user;
    const response = await AccessManager.getAccess(user);
    res.status(200).json(response);
  };


module.exports = Accessworker;