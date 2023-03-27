const { body, validationResult } = require("express-validator");

const validateEmail =()=>{
  body("email", "Ingrese un email valido").exists().isEmail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      console.log(errors);
    }else{
        next()
    }
  }
}
   // body("email", "ingrese un e-mail valido").isEmail()
    /*(req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(203).json({ errors: errors.array() });
      }
    },*/

/*const validateEmail = [
  body("email").isEmail(),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (err) {
      res.status(203);
      res.send({ err: err.array() });
    }
  },
]; */

module.export = validateEmail
