import { Router } from 'express';
import passport from 'passport';
import { registerUser, loginUser, logoutUser } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
const router = Router();

// Public routes
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);


// secure route
router.route('/logout').post(verifyJWT ,logoutUser);


// Google OAuth
router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    try {
        const { accessToken, refreshToken } = req.authInfo;
        const user = req.user;

        // Set cookies
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

        // Log success message
        console.log('Auto-login successful');
        // Send response to frontend
        // res.status(200).json({
        //     status: 'success',
        //     user,
        //     message: 'Auto-login successful',
        //     accessToken,
        //     refreshToken
        // });

        // Redirect to the desired page
        res.redirect(process.env.CLIENT_URL);
    } catch (error) {
        console.error('Error during Google OAuth callback:', error);
        res.redirect('/login');
    }
});
export default router;