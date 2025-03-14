import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from 'google-auth-library';
import fetch from 'node-fetch';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers['authorization']?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
        }

        let decodedToken;
        try {
            // Attempt to verify the token with Google
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            decodedToken = ticket.getPayload();
        } catch (googleError) {
            // If Google verification fails, try to verify it as a custom token
            try {
                decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            } catch (jwtError) {
                // If custom token verification fails, try to verify it as a GitHub token
                try {
                    const response = await fetch('https://api.github.com/user', {
                        headers: {
                            Authorization: `token ${token}`,
                        },
                    });
                    if (!response.ok) {
                        throw new Error('GitHub token verification failed');
                    }
                    decodedToken = await response.json();
                } catch (githubError) {
                    return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
                }
            }
        }

        const user = await User.findById(decodedToken?.sub || decodedToken?._id || decodedToken?.id).select("-password -refreshToken");
        if (!user) {
            return res.status(401).json({ status: 'fail', message: 'Invalid Access Token' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    }
});
 
export { verifyJWT };