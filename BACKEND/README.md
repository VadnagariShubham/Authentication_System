# Authentication API

A complete authentication system built with Express.js, Mongoose, and JWT following the MVC design pattern.

## Features

- ✅ User registration and login
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Input validation with express-validator
- ✅ Role-based authorization
- ✅ Profile management
- ✅ Password change functionality
- ✅ Account deletion
- ✅ Security middleware (helmet, rate limiting)
- ✅ MVC architecture

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Security**: helmet, express-rate-limit

## Project Structure

```
BACKEND/
├── models/
│   └── User.js              # User model with schema and methods
├── controllers/
│   └── authController.js    # Authentication logic
├── routes/
│   └── authRoutes.js        # API routes
├── middleware/
│   ├── auth.js              # JWT authentication middleware
│   └── validate.js          # Input validation middleware
├── validations/
│   └── authValidations.js   # Validation schemas
├── config.env               # Environment variables
├── index.js                 # Server entry point
├── package.json             # Dependencies
└── README.md               # Documentation
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `config.env` and update the values:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/auth_api
   JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
   JWT_EXPIRE=24h
   NODE_ENV=development
   ```

3. **Start the server:**
   ```bash
   # Development mode (with nodemon)
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication Routes

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "jwt_token_here"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "lastLogin": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

#### Get Profile (Protected)
```http
GET /api/auth/profile
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "isActive": true,
      "lastLogin": "2024-01-01T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

#### Update Profile (Protected)
```http
PUT /api/auth/profile
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```

#### Change Password (Protected)
```http
PUT /api/auth/change-password
Authorization: Bearer jwt_token_here
Content-Type: application/json

{
  "currentPassword": "Password123",
  "newPassword": "NewPassword123"
}
```

#### Logout (Protected)
```http
POST /api/auth/logout
Authorization: Bearer jwt_token_here
```

#### Delete Account (Protected)
```http
DELETE /api/auth/profile
Authorization: Bearer jwt_token_here
```

## Authentication

### JWT Token Usage

Include the JWT token in the Authorization header for protected routes:

```
Authorization: Bearer your_jwt_token_here
```

### Token Structure

The JWT token contains:
- User ID
- Email
- Role
- Expiration time

## Validation Rules

### Registration
- **Name**: Required, 2-50 characters
- **Email**: Required, valid email format, unique
- **Password**: Required, minimum 6 characters, must contain uppercase, lowercase, and number

### Login
- **Email**: Required, valid email format
- **Password**: Required

### Profile Update
- **Name**: Optional, 2-50 characters
- **Email**: Optional, valid email format, unique

### Password Change
- **Current Password**: Required
- **New Password**: Required, minimum 6 characters, must contain uppercase, lowercase, and number

## Error Responses

### Validation Error
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### Authentication Error
```json
{
  "message": "Not authorized, no token"
}
```

### Server Error
```json
{
  "message": "Server error during registration"
}
```

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Tokens**: Stateless authentication with configurable expiration
- **Input Validation**: Comprehensive validation for all inputs
- **Rate Limiting**: Prevents brute force attacks
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing enabled
- **Account Status**: Users can be deactivated

## Development

### Running Tests
```bash
npm test
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/auth_api |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_EXPIRE` | JWT expiration time | 24h |
| `NODE_ENV` | Environment mode | development |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC License 