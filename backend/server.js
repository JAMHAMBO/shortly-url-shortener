const express = require('express');
const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const urlRoutes = require("./routes/urlRoutes");
const Url = require("./models/Url");

app.use(express.json());
app.use(cors());
app.use("/api/urls", urlRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });

app.use(express.static(path.join(__dirname, "../dist")));

app.get("/api/test-auth", authMiddleware, (req, res) => {
    res.json({
        message: "Authentication successful",
        userId: req.userId
    });
});

app.get("/:shortCode", async (req, res) => {
    try {
        const url = await Url.findOne({
            shortCode: req.params.shortCode
        });

        if (!url) {
            return res.status(404).send("Short URL not found");
        }

        if (!url.active) {
            return res.status(403).send("This short URL is inactive");
        }

        url.clicks += 1;

        await url.save();

        res.redirect(url.originalUrl);

    } catch (error) {
        console.error(error);

        res.status(500).send("Server error");
    }
});

app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../dist", "index.html"));
});
