import passport, { use } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user';
import { registerUser } from '../controllers/user.controller';
import { json } from 'express';

passport.use(new GoogleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await User.findOne({ googleId: profile.id });
        if (!user) {
            const req = {
                body: {
                    email: profile.emails[0].value,
                    username: profile.displayName,
                    // password: 'default_password',
                    fullname: profile.displayName,
                    googleId: profile.id
                }
            };
            const res = {
                status: (code) => ({
                    json: (data) => {
                        if (code === 200) {
                            user = data.user;
                        };
                    }
                }),
            };
            await registerUser(req, res, () => {});
            
        }
        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});