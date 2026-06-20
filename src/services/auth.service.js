const userRepository = require("../repositories/user.repository");
const { hashPassword , comparePassword} = require("../utils/bcrypt");
const { generateToken, } = require("../utils/jwt");

exports.registerUser = async (userData) => {
  const { name, email, password } = userData;

  console.log("AUTH SERVICE :: USERDATA:-", userData)

  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await hashPassword(password);

  await userRepository.createUser({name,email,password: hashedPassword,});

  return true;
};


exports.loginUser = async (
  email,
  password
) => {
  const user =
    await userRepository.findByEmail(
      email
    );

  console.log("AUTH SERVICE :: LOGIN :: USER :-", user)

  // Generic message for security
  if (!user) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const isMatch =
    await comparePassword(
      password,
      user.password
    );

  if (!isMatch) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const token =
    generateToken({
      id: user.id,
      role: user.role,
      email: user.email,
    });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};