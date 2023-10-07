
---

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
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/taskmanagement
   SECRET_KEY=mysecretkey
   ```

   Adjust the `PORT` and `MONGODB_URI` variables as needed.

4. **Start MongoDB:**

   Start your MongoDB server using the following command:

   ```bash
   mongodb
   ```

5. **Run the API:**

   Start the API server using npm:

   ```bash
   npm start
   ```

   The API will be running at `http://localhost:3001`.

## Interacting with Endpoints

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

## Authentication Middleware

### Authenticating Protected Endpoints

To authenticate protected endpoints, you need to include a JWT token in the Authorization header of your requests. Follow these steps to authenticate:

1. **Obtain a JWT Token**

   Make a POST request to the `/login` endpoint with valid credentials to obtain a JWT token:

   - **Endpoint:** `POST /login`
   - **Request Body:**

     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```

     If the credentials are correct, you will receive a JSON response containing the JWT token:

     ```json
     {
       "token": "your-jwt-token"
     }
     ```

2. **Authenticate Protected Endpoints**

   Include the obtained JWT token in the Authorization header of your requests to access protected endpoints:

   - **Endpoint:** Any protected endpoint (e.g., `/tasks`, `/tasks/:id`)
   - **Request Headers:**

     ```
     Authorization: jwt-token
     ```

     Replace `your-jwt-token` with the token obtained in the previous step.

   If the token is valid, the protected endpoint will respond with the appropriate data. If the token is invalid or expired, you will receive a 401 Unauthorized response.

## Error Handling

The API handles errors gracefully and returns appropriate HTTP status codes and error messages in case of failures. The responses include clear error messages to assist developers in diagnosing issues.

Feel free to explore the API endpoints using tools like Postman or integrate them into your applications. If you have any questions or encounter issues, please don't hesitate to reach out. Happy coding!

--- 

Please replace `<repository-url>` with the actual URL of your repository. If you have any specific instructions or additional details you want to include in the README, feel free to modify the content accordingly.
