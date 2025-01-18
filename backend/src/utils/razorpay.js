import Razorpay from 'razorpay';

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (amount, currency = 'INR') => {
    const options = {
        amount: amount * 100, // amount in the smallest currency unit
        currency,
    };
    try {
        const order = await razorpayInstance.orders.create(options);
        return order;
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        throw new Error('Failed to create Razorpay order');
    }
};

export { createOrder };