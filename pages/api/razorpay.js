
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Your Razorpay key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Your Razorpay key secret
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    const { amount } = req.body;
  
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: 'Invalid amount' });
    }
  
    const options = {
      amount, // use dynamic amount
      currency: 'INR',
      receipt: `order_rcptid_${Date.now()}`,
      payment_capture: 1,
    };
  
    try {
      const response = await razorpay.orders.create(options);
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Razorpay order creation failed' });
    }
  }
  