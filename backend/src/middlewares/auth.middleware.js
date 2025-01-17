import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken?._id).select("-password, -otp, -otpExpiry, -refreshToken");
        if (!user) {
            return res.status(401).json({ status: 'fail', message: 'Invalid Access Token' });
        }
    
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ status: 'fail', message: 'Invalid Access Token' });
        
    }
});

export { verifyJWT };