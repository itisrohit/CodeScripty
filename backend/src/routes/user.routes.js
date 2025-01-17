import { Router } from 'express';
import passport from 'passport';
import { registerUser, loginUser, logoutUser } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

// secure route
router.route('/logout').post(verifyJWT ,logoutUser);


// Google OAuth
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect(process.env.CLIENT_URL);
});

export default router;