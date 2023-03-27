statusManager= require("../../models/status");

const getStatusIn = async (req, res) => {
    const in_status= req.params.in_status;
    const response = await statusManager.getStatus(in_status);
    res.status(200).json(response);
  };


module.exports = getStatusIn;