const authService = require("../services/auth.service");

const {
  successResponse,
  errorResponse,
} = require("../utils/apiResponse");

exports.register = async (req, res) => {

  console.log("AUTH CONTROLLER ::USER REGISTRATION BODY:-", req.body)

  try {
    await authService.registerUser(req.body);
    return successResponse(res,
      "User registered successfully",
      null,
      201
    );
  } catch (error) {
    return errorResponse(
      res,
      error.message,
      400
    );
  }
};


exports.login = async (
  req,
  res
) => {

  console.log("AUTH CONTROLLER ::USER LOGIN BODY:-", req.body)

  try {
    const { email, password } =
      req.body;

    const result =
      await authService.loginUser(
        email,
        password
      );

    return successResponse(
      res,
      "Login successful",
      result
    );
  } catch (error) {
    return errorResponse(
      res,
      error.message,
      401
    );
  }
};