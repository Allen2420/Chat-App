import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';

    export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (!password || password !== confirmPassword) {
            return res.status(400).json({
                error: "Passwords do not match"
            });
        }
        
        const user = await User.findOne({ username }); // Set timeout to 30 seconds

        if (user) {
            return res.status(400).json({
                error: "Username already taken"
            });
        }

        // HASH PASSWORD HERE

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: null
        });
        if(newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();

        res.status(200).json({
            _id: newUser,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: null
        })
        } else {
            res.status(404).json({ error: "Invalid username" });
        }


    } catch (error) {
        console.log('Error in signup controller', error.message);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect) {
            return res.status(400).json({
                error: "Invalid username or password"
            });
        }

        generateTokenAndSetCookie(user._id, res)
        
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: null
        })
        
    } catch (error) {
        console.log("Error in login controller", error.message);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie('jwt',"", {maxAge:0});
        return res.status(200).json({
            message: "Successfully logged out"
        })
    } catch (error) {
        console.log("Error in logout controller", error.message);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
};

// export default User
