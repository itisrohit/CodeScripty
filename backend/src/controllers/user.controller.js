import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';


const generateAccessandRefreshToken = async(userId) => {
    try{
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: true });
        return { accessToken, refreshToken };
    } catch (error) {
        console.log(error);
        throw new Error('Error generating tokens or saving user');
    }
};


// Register User Handler
const registerUser = asyncHandler(async (req, res, next) => {
    const { username, email, password, fullname} = req.body;
    
    if ([username, email, password, fullname].some((field) => !field || field.trim() === '')) {
        return res.status(400).json({ status: 'fail', message: 'All fields are required' });
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    
    if (existedUser) {
        return res.status(400).json({ status: 'fail', message: 'User already exists' });
    } else {
        const newUser = await User.create({ 
            username: username.toLowerCase(), 
            email, 
            password, 
            fullname,
        });
        
        // Generate and set refresh token
        const refreshToken = newUser.generateRefreshToken();
        await newUser.save();
        
        const tokens = await generateAccessandRefreshToken(newUser._id);
        res.status(201).json({ status: 'success', message: 'User created successfully', newUser, ...tokens });
        req.userId = newUser._id;
        return next();
    }
});




// Login Handler
const loginUser = asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    if (!(username || email) ) {
        return res.status(400).json({ status: 'fail', message: 'Email or Username is required' });
    }

    const userDoc = await User.findOne({ $or: [{ email }, { username }] });
    if (!userDoc || !(await userDoc.isPasswordCorrect(password))) {
        return res.status(400).json({ status: 'fail', message: 'Invalid credentials' });
    }

    const isPasswordCorrect = await userDoc.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        return res.status(400).json({ status: 'fail', message: 'Invalid credentials' });
    }

    const { accessToken, refreshToken } = await generateAccessandRefreshToken(userDoc._id);
    const loggedInUser = await User.findById(userDoc._id).select('-password -refreshToken');

    const options = {
        httpOnly: true,
        secure: true,
    };
    
    return res.status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json({
        status: 'success',
        message: 'Logged in successfully',
        data: {
            user: loggedInUser,
            accessToken,
            refreshToken
        }
    });
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, 
        { 
            $set: { refreshToken: '' } 
        },
        { new: true, runValidators: true }
    );
    const options = {
        httpOnly : true,
        secure: true,
    }
    return res.status(200).clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json({ status: 'success', message: 'Logged out successfully' });
});


export { registerUser, loginUser, logoutUser };