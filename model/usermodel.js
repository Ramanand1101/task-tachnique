const mongoose = require("mongoose");

// Define the user schema with username, email, and password fields
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Unique username is required
  email: { type: String, required: true, unique: true },    // Unique email is required
  password: { type: String, required: true }                 // Password is required
});

// Create a user model using the defined schema
const UserModel = mongoose.model("User", userSchema);

// Export the user model to be used in other parts of the application
module.exports = { UserModel };
