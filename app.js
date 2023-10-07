const express = require("express");
const rateLimit = require('express-rate-limit');
const { connection } = require("./config/db");
const { userRouter } = require("./router/userRouter");
const { authenticate } = require("./middleware/authenticate");
const { taskRouter } = require("./router/taskRoute");
const app = express();
require("dotenv").config();
app.use(express.json());
// Rate limiting middleware configuration to restrict clients from making too many requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 100, // Allow 100 requests per IP within the specified window
  message: 'Too many requests from this IP, please try again later.', // Message displayed when rate limit is exceeded
});

// Apply rate limiting middleware globally to all routes
app.use(limiter);

/* Home page of this server */
app.get('/', (req, res) => {
    try {
      res.send('Home-Page');
    } catch (error) {
      // Handle internal server errors and send an error response
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
});

// Mount userRouter for handling user-related routes
app.use(userRouter);

// Apply authentication middleware to protect routes below this line
app.use(authenticate);

// Mount taskRouter for handling task-related routes
app.use(taskRouter);

/* Server connection setup */
const port = process.env.PORT || 3000; // Use 3000 as default port if not specified in .env file
app.listen(port, async () => {
    try {
        await connection; // Connect to the database
        console.log(`Server running on port ${port}`);
    } catch (error) {
        // Handle database connection errors and exit the process if necessary
        console.error("Error occurred while starting the server: ", error.message);
        process.exit(1); // Exit the process if there is an error during server startup
    }
});
