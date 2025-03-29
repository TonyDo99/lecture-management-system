# 🎓 Lecture Management Server

## 📋 Overview

The Lecture Management Server is a backend application that provides APIs for managing educational lectures and user authentication. It handles lecture creation, retrieval, updates, and deletion while managing user accounts and authentication flows. The server is built with Express.js and TypeScript, using MongoDB as the database.

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- pnpm (v6 or higher)
- MongoDB (v4 or higher) or Docker for containerized MongoDB

## 🚀 Installation & Setup

### Clone the repository

```bash
git clone <repository-url>
cd lecture/server
```

### Install dependencies

```bash
pnpm install
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
DB_URI=mongodb://localhost:27017/lecture-management

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# AWS Configuration
AWS_S3_BUCKET=s3_bucket_urn
AWS_S3_OBJECTS_FOLDER=s3_objects_folder
AWS_ACCESS_KEY_ID=aws_access_key_id
AWS_SECRET_ACCESS_KEY=aws_secret_access_key
JWT_SECRET=secret_token
```

## 📜 Available Scripts

```bash
# Start development server with hot-reload
pnpm dev

# Build the project for production
pnpm build

# Start the production server
pnpm start

# Run tests
pnpm test

# Lint code
pnpm lint

# Format code with Prettier
pnpm format
```

## 💻 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi/Zod
- **Testing**: Jest
- **Documentation**: Swagger/OpenAPI
- **Containerization**: Docker & Docker Compose

## 🌐 API Endpoints

### Health Check

- `GET /health` - Check server status

### User Routes

- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Authenticate a user
- `GET /api/user/profile` - Get user profile (authenticated)
- `PUT /api/user/profile` - Update user profile (authenticated)
- `DELETE /api/user/profile` - Delete user account (authenticated)

### Lecture Routes

- `GET /api/lecture` - Get all lectures
- `GET /api/lecture/:id` - Get a specific lecture
- `POST /api/lecture` - Create a new lecture (authenticated)
- `PUT /api/lecture/:id` - Update a lecture (authenticated)
- `DELETE /api/lecture/:id` - Delete a lecture (authenticated)

## 🐳 Docker Setup

### Using Docker Compose

The repository includes a `docker-compose.yml` file for easy MongoDB setup:

```bash
# Start MongoDB container
docker-compose up -d mongodb

# Stop MongoDB container
docker-compose down
```

### MongoDB Connection

When using the dockerized MongoDB, connect using:

```
DB_URI=mongodb://localhost:27017/lecture-management
```
