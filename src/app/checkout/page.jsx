'use client'
import React, { useState,useEffect } from 'react';
import { useWixClient } from "@/hooks/useWixClient";
import { useCartStore } from '@/hooks/useCartStore';
import { checkout } from "@wix/ecom";

const Page = () => {
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const wixClient = useWixClient();

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expirationDate: '',
    cvv: '',
  });

  const handleShippingChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const { cart, isLoading, removeItem,getCart } = useCartStore();

  useEffect(()=>{
    getCart(wixClient)
  },[getCart,wixClient])


  useEffect(() => {
    // Load Razorpay script dynamically
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay script loaded successfully');
    };
    document.body.appendChild(script);
  }, []);


  const handlePurchase = async (e) => {
    e.preventDefault();
//    const order={
//     channelInfo:{
//       type:'WEB'
//     },
 
// billingInfo:{
//   address:{
//     addressLine1:shippingDetails.address,
//     city:shippingDetails.city,
//     country:'IN',
//     postalCode:shippingDetails.zipCode,
//   },
//   contactDetails:{
//     firstName:shippingDetails.fullName,
//   }
// },
// buyerInfo:{
//   email:shippingDetails.email
// },
// priceSummary:{
//   subtotal:{
//     amount:cart.subtotal.amount
//   },
// },
// lineItems: cart.lineItems.map((item) => ({
//   id: item._id || '', // Must be valid GUID or empty
//   quantity: item.quantity,
//   itemType: {
//     preset: item.digitalFile ? 'DIGITAL' : 'PHYSICAL', // Adjust based on item type
//   },
//   price:{
//     amount:item.price.amount
//   },
//   productName:{
//     original:item.productName.original
//   },
//   quantity:item.quantity
// })),
//    }
//     console.log("nohara",order)
//     try {
//       // Send order data to the API route
//       const response = await fetch('/api/order', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(order),
//       });

//       if (!response.ok) {
//           throw new Error('Failed to create order');
//       }

//       const createdOrder = await response.json();
//       console.log('Order Created:', createdOrder);

//       // Continue with payment processing (the rest of your payment handling code)

//   } catch (error) {
//       console.error('Error creating order:', error);
//   }
    try {
      // Fetch order ID from the backend
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: cart.subtotal.amount }), 
      });
      const { id: orderId } = await response.json();
      // Razorpay payment options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: cart.subtotal.amount * 100, 
        currency: 'INR',
        name: 'Your Store Name',
        description: 'Purchase Description',
        order_id: orderId,
        handler: function (response) {
          alert('Payment Successful!');
          // Redirect to success page
          window.location.href = `${window.location.origin}/success?orderId=${orderId}`;
        },
        prefill: {
          name: shippingDetails.fullName,
          email: shippingDetails.email,
          contact: shippingDetails.mobileNumber,
        },
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.log(err);
    }
  };
  const [paymentMethod, setPaymentMethod] = useState(''); 

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value); // Update payment method state
  };

  return (
    <div className="container mx-auto p-4 mt-56 sm:mt-56">
     
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 whitespace-nowrap">Personal Information</h1>
      <form className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
          <input className="border border-gray-300 p-2 rounded-lg w-full" type="text" id="name" placeholder="Your Name" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <input className="border border-gray-300 p-2 rounded-lg w-full" type="email" id="email" placeholder="Your Email" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="address">Mobile Number</label>
          <input className="border border-gray-300 p-2 rounded-lg w-full" type="text" id="address" placeholder="Your Mobile Number" required />
        </div>
     
      </form>
    <div className="bg-gray-100 py-10 w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Checkout</h2>

        <div className="flex flex-col md:grid-cols-2 gap-8 w-full ">

          {/* Shipping Form */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md sm:w-full w-[75vw]">
            <h3 className="text-2xl font-semibold mb-4">Shipping Details</h3>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={shippingDetails.fullName}
                  onChange={handleShippingChange}
                  className="w-full p-2 mt-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={shippingDetails.email}
                  onChange={handleShippingChange}
                  className="w-full p-2 mt-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={shippingDetails.address}
                  onChange={handleShippingChange}
                  className="w-full p-2 mt-2 border rounded-md"
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4 w-full">
                <div className='w-full'>
                  <label className="block text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingDetails.city}
                    onChange={handleShippingChange}
                    className="w-full p-2 mt-2 border rounded-md"
                    required
                  />
                </div>
                <div className='w-full'>
                  <label className="block text-gray-700">State</label>
                  <input
                    type="text"
                    name="state"
                    value={shippingDetails.state}
                    onChange={handleShippingChange}
                    className="w-full p-2 mt-2 border rounded-md"
                    required
                  />
                </div>
                <div className='w-full'>
                  <label className="block text-gray-700">Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingDetails.zipCode}
                    onChange={handleShippingChange}
                    className="w-full p-2 mt-2 border rounded-md"
                    required
                  />
                </div>
                <div className="mb-4 w-[50vw] sm:w-full">
  <label className="block text-gray-700">Payment Method</label>
  <select
    className="w-full p-2 mt-2 border rounded-md text-gray-500"
    defaultValue=""
    required
    onChange={handlePaymentMethodChange}
  >
    <option value="" disabled>
      Choose Payment Method
    </option>
    <option value="cash">Cash On Delivery</option>
    <option value="upi">UPI</option>
    <option value="card">Credit/Debit Card</option>
  </select>
</div>
              </div>
            </form>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg mt-4"
                onClick={handlePurchase}
              >
                Complete Purchase
              </button>
          </div>

          {/* Payment Details */}
          {paymentMethod === 'card' && (
                    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
                      <h3 className="text-2xl font-semibold mb-4">Payment Details</h3>
                      <div className="mb-4">
                        <label className="block text-gray-700">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={paymentDetails.cardNumber}
                          onChange={handlePaymentChange}
                          className="w-full p-2 mt-2 border rounded-md"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700">Card Holder Name</label>
                        <input
                          type="text"
                          name="cardHolder"
                          value={paymentDetails.cardHolder}
                          onChange={handlePaymentChange}
                          className="w-full p-2 mt-2 border rounded-md"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-gray-700">Expiration Date</label>
                          <input
                            type="text"
                            name="expirationDate"
                            placeholder="MM/YY"
                            value={paymentDetails.expirationDate}
                            onChange={handlePaymentChange}
                            className="w-full p-2 mt-2 border rounded-md"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700">CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            value={paymentDetails.cvv}
                            onChange={handlePaymentChange}
                            className="w-full p-2 mt-2 border rounded-md"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {paymentMethod === 'upi' && (
                    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
                      <h3 className="text-2xl font-semibold mb-4">UPI Details</h3>
                      <div className="mb-4">
                        <label className="block text-gray-700">Enter your UPI ID</label>
                        <input
                          type="text"
                          name="upiId"
                          value={paymentDetails.upiId}
                          onChange={handlePaymentChange}
                          className="w-full p-2 mt-2 border rounded-md"
                          required
                        />
                      </div>
                    </div>
                  )}
        </div>

        {/* Order Summary */}
        {/* <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
          <div className="flex justify-between items-center mb-2">
            <span>Product 1</span>
            <span>$50.00</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span>Product 2</span>
            <span>$30.00</span>
          </div>
          <div className="flex justify-between items-center font-semibold mb-2">
            <span>Total</span>
            <span>$80.00</span>
          </div>
        </div> */}
      </div>
    </div>
    </div>
    </div>
  );
};

export default Page;
