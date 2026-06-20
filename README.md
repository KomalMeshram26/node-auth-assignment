# Node.js Authentication & Role-Based Access API

## Overview

This project is a secure REST API built using Node.js, Express.js, and MySQL. It implements authentication, authorization, user management, and security best practices commonly used in production applications.

## Features

* User Registration
* User Login
* JWT Authentication
* Role-Based Authorization
* Password Hashing using bcrypt
* Request Validation using express-validator
* Environment Variables Configuration
* Parameterized Queries (SQL Injection Prevention)
* Admin Seeder
* User Profile Management
* Generic Authentication Error Messages
* JWT Expiration Configuration

---

## Tech Stack

* Node.js
* Express.js
* MySQL
* jsonwebtoken (JWT)
* bcryptjs
* express-validator
* dotenv

---

## Project Structure

```text
src/
├── config/
├── controllers/
├── middleware/
├── repositories/
├── routes/
├── services/
├── validators/
├── utils/
├── seeds/
└── app.js
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd node-auth-assignment
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root directory:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=node_auth

JWT_SECRET=mySuperSecretKey
JWT_EXPIRE=1h

BCRYPT_SALT=10
```

---

## Database Setup

Create the database:

```sql
CREATE DATABASE node_auth;
```

Create the users table:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','manager','user') DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    last_login DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## Create Admin User

Run the seed command:

```bash
npm run seed
```

Default Admin Credentials:

```text
Email: admin@gmail.com
Password: Admin@123
```

---

## Run Application

Development Mode:

```bash
npm run dev
```

Production Mode:

```bash
npm start
```

Server will run on:

```text
http://localhost:5000
```

---

## Authentication

After successful login, a JWT token is returned.

For protected routes, include the token in the request header:

```http
Authorization: Bearer <jwt_token>
```

---

## API Endpoints

### Authentication APIs

#### Register User

```http
POST /api/auth/register
```

Request Body:

```json
{
  "name": "Komal",
  "email": "komal@gmail.com",
  "password": "Password@123"
}
```

---

#### Login User

```http
POST /api/auth/login
```

Request Body:

```json
{
  "email": "komal@gmail.com",
  "password": "Password@123"
}
```

---

### User APIs

#### Get Profile

```http
GET /api/users/profile
```

Authorization Required: Yes

---

#### Update User

```http
PUT /api/users/:id
```

Authorization Required: Yes

Request Body:

```json
{
  "name": "Updated Name",
  "email": "updated@email.com"
}
```

---

### Admin APIs

#### Get All Users

```http
GET /api/users/all
```

Authorization Required: Admin

---

#### Update User Role

```http
PATCH /api/users/:id/role
```

Authorization Required: Admin

Request Body:

```json
{
  "role": "manager"
}
```

Allowed Roles:

```text
admin
manager
user
```

---

## Security Features

* Passwords stored using bcrypt hashing
* No plain text password storage
* JWT-based authentication
* JWT expiration configured
* Parameterized SQL queries to prevent SQL Injection
* Input validation using express-validator
* Generic authentication error messages
* Environment variables for secrets and configuration
* Role-based access control
* HTTPS recommended for production deployment

---

## Assignment Requirements Checklist

* [x] Create User Login API
* [x] Use MySQL Database
* [x] Implement JWT Authentication
* [x] Add Proper Request Validation
* [x] Implement Proper Error Handling
* [x] Create Role-Based Logic for Users
* [x] Store Passwords using bcrypt Hashing
* [x] Never Store Plain Text Passwords
* [x] Use Environment Variables for Secrets and Configuration
* [x] Use Parameterized Queries to Prevent SQL Injection
* [x] Validate All Incoming Requests
* [x] Return Generic Authentication Error Messages
* [x] Set JWT Expiration Time
* [x] Follow Secure Coding Practices

---

## Postman Collection

Import the provided Postman collection:

```text
Nitya_Group_Assignment.postman_collection.json
```

---

## Author

Komal Meshram

Node.js Developer
 