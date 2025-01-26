const express = require("express");
const { validateRegister, validateLogin } = require("../middlewares/validators");
const authController = require("../controllers/auth-controller");

const router = express.Router();

router.get("/all-users", authController.getAllUsers);
router.post("/register", validateRegister, authController.register);
router.post("/login", validateLogin, authController.login);

module.exports = router;
