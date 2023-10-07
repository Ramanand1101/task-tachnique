const jwt=require("jsonwebtoken")
require("dotenv").config()
const authenticate = (req, res, next) => {
const token = req.headers.authorization;
    try {
      // Check if the Authorization header is present
      if (token) {
        // Verify the JWT token using the secret key from the environment variables
        jwt.verify(token, process.env.secretkey, (err, decoded) => {
          if (decoded) {
            // If the token is valid, add the user ID to the request body and proceed to the next middleware
            req.body.user = decoded.userId;
            next();
          } else {
            // If the token is invalid, send a 401 Unauthorized response
            return res.status(401).send({ message: "Invalid Token", error: err.message });
          }
        });
      } else {
        // If the Authorization header is missing, send a 503 Service Unavailable response
        return res.status(503).send({ error: "Please Login First" });
      }
    } catch (error) {
      // If an error occurs during authentication, send a 502 Bad Gateway response
      return res.status(502).send({ error: `Error in Authenticating: ${error.message}` });
    }
  };
  
  // Export the authenticate middleware for use in other parts of the application
  module.exports = { authenticate };