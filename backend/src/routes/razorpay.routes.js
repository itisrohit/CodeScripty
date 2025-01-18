import { Router } from 'express';
import { createRazorpayOrder, verifyRazorpayPayment, grantPremiumAccess } from '../controllers/razorpay.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/create-order', verifyJWT, createRazorpayOrder);
router.post('/verify-payment', verifyJWT, verifyRazorpayPayment);
router.post('/grant-premium', verifyJWT, grantPremiumAccess);

export default router;