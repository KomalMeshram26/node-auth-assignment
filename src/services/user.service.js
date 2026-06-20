const userRepository = require(
  "../repositories/user.repository"
);

exports.getProfile = async (
  userId
) => {
  const user =
    await userRepository.findById(
      userId
    );

  console.log("USER SERVICE :: PROFILE DATA :: USER:-", user)

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  return user;
};


exports.getAllUsers = async () => {
  return await userRepository.getAllUsers();
};

exports.updateUser = async (
  userId,
  loggedInUser,
  userData
) => {
  if ("role" in userData) {
    throw new Error(
      "Role cannot be updated through this API"
    );
  }

  if (
    loggedInUser.role !== "admin" &&
    loggedInUser.id !== userId
  ) {
    throw new Error("Access denied");
  }

  if (userData.email) {
    const existingUser =
      await userRepository.findByEmail(
        userData.email
      );

    if (
      existingUser &&
      existingUser.id !== userId
    ) {
      throw new Error(
        "Email already exists"
      );
    }
  }

  await userRepository.updateProfile(
    userId,
    userData
  );

  return true;
};


exports.updateUserRole = async (
  userId,
  role,
  loggedInUser
) => {

  if (loggedInUser.role !== "admin") {
    throw new Error("Access denied");
  }

  const user =
    await userRepository.findById(
      userId
    );

  console.log("USER SERVICE :: UPDATE USER DATA:-", user)

  if (!user) {
    throw new Error("User not found");
  }

  // Prevent admin from changing their own role
  if (loggedInUser.id === Number(userId)) {
    throw new Error(
      "You cannot update your own role"
    );
  }

 const updatedData =  await userRepository.updateUserRole(
    userId,
    role
  );
  
 console.log("USER SERVICE :: UPDATED DATA:-", updatedData)

 return true;
};