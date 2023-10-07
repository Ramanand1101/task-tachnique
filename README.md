# Task Management API

This repository contains a simple Task Management API built using Node.js, Express, and MongoDB. The API allows users to manage tasks by providing endpoints for creating, retrieving, updating, and deleting tasks.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   ```

2. **Install Dependencies:**

   Navigate to the project directory and install the required packages using npm:

   ```bash
   cd task-management-api
   npm install
   ```

3. **Set Environment Variables:**

   Create a `.env` file in the project root and add the following environment variables:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/taskmanagement
   SECRET_KEY=mysecretkey
   ```

   Adjust the `PORT` and `MONGODB_URI` variables as needed.

4. **Start MongoDB:**

   Start your MongoDB server using the following command:

   ```bash
   mongod
   ```

5. **Run the API:**

   Start the API server using npm:

   ```bash
   npm start
   ```

   The API will be running at `http://localhost:3000`.

## Interacting with Endpoints

### User Endpoints

#### User Registration

- **Endpoint:** `POST /register`
- **Request Body:**

  ```json
  {
    "username": "exampleuser",
    "email": "user@example.com",
    "password": "password123"
  }
  ```

  Register a new user with the provided username, email, and password.

#### User Login

- **Endpoint:** `POST /login`
- **Request Body:**

  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

  Authenticate and receive a JSON Web Token (JWT) for accessing protected endpoints.

### Task Endpoints

#### Create a Task

- **Endpoint:** `POST /tasks`
- **Request Body:**

  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "status": "pending"
  }
  ```

  Create a new task with the provided title, description, and status (pending/completed).

#### Get All Tasks

- **Endpoint:** `GET /tasks`

  Retrieve a list of all tasks.

#### Get a Specific Task

- **Endpoint:** `GET /tasks/:id`

  Retrieve a specific task by its ID.

#### Update a Task

- **Endpoint:** `PUT /tasks/:id`
- **Request Body:**

  ```json
  {
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "status": "completed"
  }
  ```

  Update a specific task by its ID with the provided data.

#### Delete a Task

- **Endpoint:** `DELETE /tasks/:id`

  Delete a specific task by its ID.

## Rate Limiting

The API is rate-limited to prevent abuse. Clients are allowed a maximum of 100 requests per IP address every 15 minutes. If this limit is exceeded, a response with status code 429 (Too Many Requests) will be sent.

## Error Handling

The API handles errors gracefully and returns appropriate HTTP status codes and error messages in case of failures. The responses include clear error messages to assist developers in diagnosing issues.

Feel free to explore the API endpoints using tools like Postman or integrate them into your applications. If you have any questions or encounter issues, please don't hesitate to reach out. Happy coding!
