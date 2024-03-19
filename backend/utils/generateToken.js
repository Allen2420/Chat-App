import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({
        userId
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15d" // expires in 15 days
    });

    res.cookie("jwt", token, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // expires in 15 days
        httpOnly: true,
        sameSite:"strict",
        secure: process.env.SECURE_ENV !== "production"
    });
}

export default generateTokenAndSetCookie;