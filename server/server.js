const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");

dotenv.config();

const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);

let users;

// Signup route
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    // Check required fields
    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required."
        });
    }

    try {
        // Check whether the username is already taken
        const existingUser = await users.findOne({
            username: username.trim()
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Username already exists."
            });
        }

        // Hash the password before storing it
        const passwordHash = await bcrypt.hash(password, 10);

        // Create the user
        await users.insertOne({
            username: username.trim(),
            password: passwordHash
        });

        return res.status(201).json({
            message: "User created successfully."
        });
    } catch (error) {
        console.error("Signup error:", error);

        return res.status(500).json({
            message: "Server error."
        });
    }
});

// Connect to MongoDB before starting Express
async function startServer() {
    try {
        await client.connect();

        const db = client.db("pa2");
        users = db.collection("users");

        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}

startServer();