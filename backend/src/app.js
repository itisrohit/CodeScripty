import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import passport from 'passport';
import session from 'express-session';
import './config/passport.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200
}));

//Session Setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());


// Tests
app.get('/test', (req, res) => {
    res.send('Yes this api is working');
    console.log('👌 Working fine');
});


//routes import
import userRouter from './routes/user.routes.js';
import pistonRouter from './routes/piston.routes.js'; 
import fileRouter from './routes/file.routes.js';
import folderRouter from './routes/folder.routes.js';
import razorpayRouter from './routes/razorpay.routes.js';


//routes declaration
app.use('/api/v1/users', userRouter);
app.use('/api/v1/code-execution', pistonRouter)
app.use('/api/v1/files', fileRouter);
app.use('/api/v1/folders', folderRouter);
app.use('/api/v1/razorpay', razorpayRouter);



export { app };