const { body } = require("express-validator");

exports.updateProfileValidation = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Valid email required"),

  body("role")
    .not()
    .exists()
    .withMessage(
      "Role cannot be updated through this API"
    ),
];


exports.updateRoleValidation = [
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["admin", "user", "manager"])
    .withMessage("Invalid role"),
];