import Razorpay from 'razorpay';

// Initialize Razorpay with your API Key and Secret
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Make sure to set this in your .env file
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Make sure to set this in your .env file
});

// Function to handle API requests
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('id'); // Fetch the order ID from query params

  if (!orderId) {
    return new Response(JSON.stringify({ error: 'Order ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Fetch the order details using the Razorpay API
    const order = await razorpay.orders.fetch(orderId);
    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    return new Response(JSON.stringify({ error: 'Error fetching order' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
