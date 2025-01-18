import crypto from 'crypto';
import { asyncHandler } from '../utils/asyncHandler.js';
import { createOrder } from '../utils/razorpay.js';
import Order from '../models/order.model.js';
import User from '../models/user.model.js';

// Create Razorpay Order
const createRazorpayOrder = asyncHandler(async (req, res) => {
    const { amount, currency } = req.body;

    if (!amount) {
        return res.status(400).json({ status: 'fail', message: 'Amount is required' });
    }

    const order = await createOrder(amount, currency);

    const newOrder = new Order({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        status: 'created',
        user: req.user._id,
    });

    await newOrder.save();

    res.status(200).json({ status: 'success', order });
});

// Verify Razorpay Payment and Grant Premium Access
const verifyRazorpayPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const order = await Order.findOne({ orderId: razorpay_order_id });

    if (!order) {
        return res.status(400).json({ status: 'fail', message: 'Order not found' });
    }

    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === razorpay_signature) {
        order.status = 'paid';
        await order.save();

        // Grant premium access to the user
        const user = await User.findById(order.user);
        if (user) {
            user.isPremium = true;
            await user.save();
        }

        res.status(200).json({ status: 'success', message: 'Payment verified and premium access granted' });
    } else {
        order.status = 'failed';
        await order.save();
        res.status(400).json({ status: 'fail', message: 'Payment verification failed' });
    }
});

// Grant Premium Access for Free
const grantPremiumAccess = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ status: 'fail', message: 'User ID is required' });
    }

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ status: 'fail', message: 'User not found' });
    }

    user.isPremium = true;
    await user.save();

    res.status(200).json({ status: 'success', message: 'Premium access granted' });
});

export { createRazorpayOrder, verifyRazorpayPayment, grantPremiumAccess };