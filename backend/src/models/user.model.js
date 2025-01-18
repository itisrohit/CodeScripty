import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        // index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        // index: true,
    },
    password: {
        type: String,
        // required: [true, 'Password is required'],
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    refreshToken: {
        type: String,
        default: ''
    },
    isPremium: {
        type: Boolean,
        default: false,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    githubId: {
        type: String,
        unique: true,
        sparse: true
    }
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    if (this.isModified('otp')) {
        this.otp = bcrypt.hash(this.otp, 10);
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.isOtpCorrect = async function(otp) {
    return await bcrypt.compare(otp, this.otp);
};

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
};


// Method to generate refresh token
userSchema.methods.generateRefreshToken = function() {
    const refreshToken = jwt.sign({ 
        id: this._id 
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY});
    this.refreshToken = refreshToken;
    return refreshToken;
};

export const User = mongoose.model('User', userSchema);
export default User;