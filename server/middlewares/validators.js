const { check } = require("express-validator");

exports.validateRegister = [
  check("username", "Username is required").notEmpty(),
  check("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
];

exports.validateLogin = [
  check("username", "Username is required").notEmpty(),
  check("password", "Password is required").notEmpty(),
];
