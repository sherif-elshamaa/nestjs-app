# NestJS Auth + Todo API

A secure authentication and CRUD-based Todo API built with NestJS, Mongoose, and JWT.

## 🔧 Environment Setup

Create a `.env` file in the project root:

```env
PORT=5000
mongodb=mongodb+srv://
jwt_secret=your_jwt_secret
jwt_expire=1d
```

## 📦 Dependencies Used

- `@nestjs/common`
- `@nestjs/core`
- `@nestjs/config`
- `@nestjs/mongoose`
- `@nestjs/passport`
- `@nestjs/jwt`
- `@nestjs/swagger`
- `passport`
- `passport-jwt`
- `mongoose`
- `bcryptjs`
- `class-validator`
- `class-transformer`

## 📚 API Endpoints

### Auth Routes

#### POST `/auth/signup`
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "StrongP@ss123"
}
```
**Response:**
```json
{
  "token": "<jwt_token>"
}
```

#### POST `/auth/login`
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "StrongP@ss123"
}
```
**Response:**
```json
{
  "token": "<jwt_token>",
  "user": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Todo Routes *(Protected with Bearer Token)*

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### POST `/todo`
**Request Body:**
```json
{
  "task": "Learn NestJS",
}
```
**Response:**
```json
{
  "_id": "<todo_id>",
  "task": "Learn NestJS",
  "status": "pending",
  "userId": "<user_id>",
  "createdAt": "<timestamp>",
  "updatedAt": "<timestamp>"
}
```

#### GET `/todo`
Returns all todos for the authenticated user.

#### PUT `/todo/:id`
**Request Body:**
```json
{
  "task": "Learn NestJS in depth",
  "status": "completed"
}
```
**Response:**
```json
{
  "_id": "<todo_id>",
  "task": "Learn NestJS in depth",
  "status": "completed",
  "userId": "<user_id>",
  "createdAt": "<timestamp>",
  "updatedAt": "<timestamp>"
}
```

#### DELETE `/todo/:id`
Deletes a specific todo.

---

## 📘 Swagger Docs
Access full API documentation at: `http://localhost:5000/api/v1`

---

## 🛡 Security Notes
- Passwords are hashed using `bcryptjs`
- JWT tokens are signed with expiration and secret key
- Protected routes ensure user-level access using JWT payloads

---

## 🚀 To Run
```bash
npm install
npm run start:dev
```

---


