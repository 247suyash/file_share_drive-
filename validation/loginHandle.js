const { body } = require("express-validator");
const { UserModel } = require("./../models");

const loginValidations = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")

,
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required....")

];

module.exports = {
  loginValidations,
};
