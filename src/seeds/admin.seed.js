require("dotenv").config();

const bcrypt = require("bcryptjs");
const db = require("../config/db");

async function createAdmin() {
  try {
    // Check if admin already exists
    const [existingAdmin] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      ["admin@gmail.com"]
    );

    if (existingAdmin.length > 0) {
      console.log("Admin already exists");
      process.exit();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      "Admin@123",
      Number(process.env.BCRYPT_SALT)
    );

    // Create admin
    await db.execute(
      `INSERT INTO users
       (name, email, password, role)
       VALUES (?, ?, ?, ?)`,
      [
        "Admin",
        "admin@gmail.com",
        hashedPassword,
        "admin",
      ]
    );

    console.log("Admin created successfully");
    process.exit();
  } catch (error) {
    console.error("Seed Error:", error.message);
    process.exit(1);
  }
}

createAdmin();