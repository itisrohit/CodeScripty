import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/user.model.js';


// Google Strategy
passport.use(new GoogleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // console.log('profile: ', profile);
        // console.log('accessToken: ', accessToken);
        // console.log('refreshToken: ', refreshToken);
        
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            user = new User({
                email: profile.emails[0].value,  
                username: profile.displayName, 
                fullname: profile.displayName,  
                googleId: profile.id,                               
            });
            await user.save();
        }
        done(null, user, { accessToken, refreshToken });
    } catch (error) {
        done(error, null);
    }
    
}));




// GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: ['user:email'] // Request user's email
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Fetch the user's email if not provided in the profile
        let email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        if (!email) {
            const emails = await fetch(`https://api.github.com/user/emails`, {
                headers: {
                    'Authorization': `token ${accessToken}`,
                    'User-Agent': 'CodeScripty'
                }
            }).then(res => res.json());
            email = emails.find(email => email.primary).email;
        }

        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
            user = new User({
                email,
                username: profile.username,
                fullname: profile.displayName || profile.username,
                githubId: profile.id,
            });
            await user.save();
        }
        await user.save();
        done(null, user, { accessToken, refreshToken });
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