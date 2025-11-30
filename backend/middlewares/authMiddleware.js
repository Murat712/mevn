import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "authorization header is missing!" })
    }

    const tokenPath = authHeader.split(' ');

    if (tokenPath.length !== 2 || tokenPath[0] !== "Bearer") {
        return res.status(401).json({ message: "Invalid auth header format" })
    }

    const token = tokenPath[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decodedToken);

        req.user = await User.findById(decodedToken.userID);

        next();
    } catch (error) {

    }
}

export default { authenticateUser }