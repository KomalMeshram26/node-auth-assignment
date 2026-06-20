const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const roleMiddleware = require("../middleware/role.middleware");

const userController = require("../controllers/user.controller");

const { updateProfileValidation,updateRoleValidation } = require("../validators/user.validator");

const validate = require( "../middleware/validation.middleware");

router.get("/profile", authMiddleware,userController.getProfile);

router.get("/all", authMiddleware,roleMiddleware("admin"),userController.getAllUsers);

router.put("/:id", authMiddleware, updateProfileValidation, validate,userController.updateUser);

router.patch("/:id/role",authMiddleware,roleMiddleware("admin"),updateRoleValidation,validate, userController.updateUserRole);

module.exports = router;