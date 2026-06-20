const db = require("../config/db");

exports.findByEmail = async (email) => {
  const [users] = await db.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  return users[0];
};

exports.createUser = async (userData) => {
  const { name, email, password } = userData;

  const [result] = await db.execute(
    `INSERT INTO users (name,email,password)
     VALUES (?,?,?)`,
    [name, email, password]
  );

  return result;
};

exports.findById = async (id) => {
  const [users] = await db.execute(
    `SELECT
      id,
      name,
      email,
      role,
      is_active,
      created_at
     FROM users
     WHERE id = ?`,
    [id]
  );

  return users[0];
};


exports.getAllUsers = async () => {
  const [users] = await db.execute(
    `SELECT
      id,
      name,
      email,
      role,
      is_active,
      created_at
     FROM users`
  );

  return users;
};


exports.updateProfile = async (id, userData) => {
  const fields = [];
  const values = [];

  if (userData.name !== undefined) {
    fields.push("name = ?");
    values.push(userData.name);
  }

  if (userData.email !== undefined) {
    fields.push("email = ?");
    values.push(userData.email);
  }

  if (fields.length === 0) {
    throw new Error("At least one field is required");
  }

  values.push(id);

  const [result] = await db.execute(
    `UPDATE users
     SET ${fields.join(", ")}
     WHERE id = ?`,
    values
  );

  return result;
};


exports.updateUserRole = async (
  userId,
  role
) => {
  const [result] = await db.execute(
    `
    UPDATE users
    SET role = ?
    WHERE id = ?
    `,
    [role, userId]
  );

  return result;
};