const userService = require(
  "../services/user.service"
);

const {
  successResponse,
  errorResponse,
} = require("../utils/apiResponse");

exports.getProfile = async (
  req,
  res
) => {

  try {
    const user =
      await userService.getProfile(
        req.user.id
      );

    console.log("USER CONTROLLER :: USER DATA:-", user)

    return successResponse(
      res,
      "Profile fetched successfully",
      user
    );
  } catch (error) {
    return errorResponse(
      res,
      error.message,
      404
    );
  }
};


exports.getAllUsers = async (
  req,
  res
) => {
  try {
    const users =
      await userService.getAllUsers();

    console.log("USER CONTROLLER :: ALL USER DATA DATA:-", users)

    return successResponse(
      res,
      "Users fetched successfully",
      users
    );
  } catch (error) {
    return errorResponse(
      res,
      error.message,
      500
    );
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await userService.updateUser(
      Number(id),
      req.user,
      req.body
    );

    console.log("USER CONTROLLER :: UPDATED DATA:-", updatedUser)

    return successResponse(
      res,
      "User updated successfully"
    );
  } catch (error) {
    return errorResponse(
      res,
      error.message,
      400
    );
  }
};


exports.updateUserRole = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const updateUserRole = await userService.updateUserRole(
      Number(id),
      role,
      req.user
    );

    console.log("USER CONTROLLER :: USER ROLE UPDATE:-", updateUserRole)

    return successResponse(
      res,
      "User role updated successfully"
    );
  } catch (error) {
    return errorResponse(
      res,
      error.message,
      400
    );
  }
};