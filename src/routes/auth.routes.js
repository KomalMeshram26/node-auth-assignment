const router = require("express").Router();

const authController = require("../controllers/auth.controller");

const { registerValidation,loginValidation } = require("../validators/auth.validator");

const validate = require("../middleware/validation.middleware");

router.post("/register", registerValidation, validate, authController.register);

router.post("/login", loginValidation, validate, authController.login);

module.exports = router;