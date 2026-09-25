const jwt = require("jsonwebtoken");
const User = require("../models/User");

const optionalAuthMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // No token → anonymous user
        if (!authHeader) {
            req.userId = null;
            return next();
        }

        const [scheme, token] = authHeader.split(" ");

        if (scheme !== "Bearer" || !token) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.userId).select("tokenVersion");

        if (!user || decoded.tokenVersion !== user.tokenVersion) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        req.userId = user._id;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = optionalAuthMiddleware;
