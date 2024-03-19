import jwt from 'jsonwebtoken';
import User from "../models/messageModel.js"

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({
                error: "Unauthorized - No Token Provided"
            });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        if (!decoded) {
            return res.status(401).json({
                error: "Unauthorized - Invalid Token"
            });
        }

        const user = await User.findById(decoded.userId).select('-password')

        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error.message);
         res.json({ error: error.message });
    }
}

export default protectRoute;