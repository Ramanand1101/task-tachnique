const mongoose = require("mongoose");
require("dotenv").config();

const database = process.env.MONGO_URI; // Ensure the correct environment variable name

try {
    mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true });
    const dbConnection = mongoose.connection;

    dbConnection.once("open", () => {
        console.log("Connected to the database");
    });

    dbConnection.on("error", (error) => {
        console.error("Error connecting to the database: ", error.message);
    });
} catch (error) {
    console.error("Error connecting to the database: ", error.message);
}

module.exports = mongoose.connection;
