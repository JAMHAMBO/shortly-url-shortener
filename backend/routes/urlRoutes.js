const express = require("express");
const optionalAuthMiddleware = require("../middleware/optionalAuthMiddleware");
const crypto = require("crypto");
const Url = require("../models/Url");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", optionalAuthMiddleware, async (req, res) => {
    try {
        const { originalUrl } = req.body;

        const shortCode = crypto.randomBytes(4).toString("hex");

        const newUrl = new Url({
            originalUrl,
            shortCode,
            userId: req.userId
        });

        await newUrl.save();

        res.json({
            originalUrl: newUrl.originalUrl,
            shortCode: newUrl.shortCode
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/my-urls", authMiddleware, async (req, res) => {
    try {
        const urls = await Url.find({
            userId: req.userId
        }).sort({ createdAt: -1 });

        res.json(urls);

    }

    catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

// Delete a user's URL
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const deletedUrl = await Url.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });

        if (!deletedUrl) {
            return res.status(404).json({
                message: "URL not found"
            });
        }

        res.json({
            message: "URL deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


// Activate / Deactivate a user's URL
router.patch("/:id/toggle", authMiddleware, async (req, res) => {
    try {
        const url = await Url.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!url) {
            return res.status(404).json({
                message: "URL not found"
            });
        }

        url.active = !url.active;

        await url.save();

        res.json(url);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;