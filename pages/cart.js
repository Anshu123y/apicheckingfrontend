import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "@/redux/cartSlice";
import PathBackButton from "@/components/PathBackButton";
import { useRouter } from "next/router";
import Head from "next/head";
import SignInUpLofinForm from "@/components/SignInUpLofinForm";
import { AuthContext } from "@/context/AuthContext";

const cart = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const dispatch = useDispatch();
  const { cartItems, totalQuantity, totalAmount } = useSelector(
    (state) => state.cart
  );

  // Function to load the Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      // Check if the script is already loaded
      if (
        document.querySelector(
          'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
        )
      ) {
        return resolve(true); // Already loaded
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Function to handle the Razorpay payment
  const handlePayment = async () => {
    // Load Razorpay script
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Failed to load Razorpay SDK. Please try again later.");
      return;
    }

    // Get order data from your API
    const data = await fetch("/api/razorpay", {
      method: "POST",
    }).then((res) => res.json());

    // Options for the Razorpay checkout modal
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Public Key from Razorpay dashboard
      amount: totalAmount, // Amount in paise
      currency: data.currency,
      name: "ShoNow",
      description: "Test Transaction",
      order_id: data.id, // The order ID received from Razorpay API
      handler: function (response) {
        alert("Payment successful!");
        console.log("Payment ID:", response.razorpay_payment_id);
        console.log("Order ID:", response.razorpay_order_id);
        console.log("Signature:", response.razorpay_signature);
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: "",
      },
      notes: {
        address: "",
      },
      theme: {
        color: "#F37254",
      },
    };

    // Open the Razorpay payment modal
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  /* If there is no Item In Cart */
  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-600 text-xl">
        🛒 No items in cart
      </div>
    );
  }
  const router = useRouter();

  return (
    <>
      <Head>
        <meta charSet="utf-8" />

        <title>{"ShopNow - Your Smart Shopping Destination."}</title>
        <meta
          name="description"
          content={
            "ShopNow is a modern e-commerce app built with Next.js, Tailwind CSS, Redux, and Context API for fast, seamless shopping with cart persistence and theming."
          }
        />
        <link rel="canonical" href="https://shop-now-chi.vercel.app/" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link rel="icon" type="image/png" sizes="32x32" href="headLogo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="headLogo.png" />
        <meta
          property="og:title"
          content={"ShopNow - Your Smart Shopping Destination."}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content={
            "ShopNow is a modern e-commerce app built with Next.js, Tailwind CSS, Redux, and Context API for fast, seamless shopping with cart persistence and theming."
          }
        />
        <meta name="robots" content="max-image-preview:large"></meta>
        <meta name="robots" content="NOODP" />
        <meta property="og:url" content="https://shop-now-chi.vercel.app/" />
        <meta property="og:image" content="headLogo.png" />

        <meta name="mobile-web-app-capable" content="yes" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
      </Head>
      <PathBackButton />
      <SignInUpLofinForm setOpen={setOpen} open={open} />
      <div className="max-w-4xl mx-auto p-4 h-screen">
        <h1 className=" font-bold mb-4">Your Cart</h1>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border p-3 rounded-lg shadow"
            >
              <div className="flex items-center space-x-4 md:w-2/3 w-4/5 ">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain"
                />
                <div className="w-full">
                  <div
                    onClick={() => router.push(`/products/${item.id}`)}
                    className="cursor-pointer"
                  >
                    <div className="font-normal text-[12px] line-clamp-2 lg:text-[14px] ">
                      {item.title}
                    </div>
                    <div className="text-sm  ">₹ {item.price}</div>
                  </div>

                  <div>
                    <div className="flex items-center md:space-x-3 space-x-1 mt-2 md:hidden cursor-pointer">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="bg-gray-400 md:px-2 px-1 rounded"
                      >
                        -
                      </button>
                      <span className="text-[12px] md:text-[14px]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="bg-gray-400 md:px-2 px-1 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:flex items-center md:space-x-3 space-x-1 hidden ">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="bg-gray-400 md:px-2 px-1 rounded cursor-pointer"
                >
                  -
                </button>
                <span className="text-[12px] md:text-[14px]">
                  {item.quantity}
                </span>
                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="bg-gray-400 md:px-2 px-1 rounded cursor-pointer"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <p className="font-medium text-[12px] md:text-[14px]">
                  ₹ {item.quantity * item.price}
                </p>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 text-sm mt-1 text-[12px] md:text-[14px] cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div></div>

        <div className="mt-10 border-t border-gray-500 pt-4 md:flex justify-around hidden">
         {Object?.keys(user)?.length>0?  <div
            onClick={() => handlePayment()}
            className="font-md cursor-pointer bg-blue-500 text-white p-2 rounded-md"
          >
            Checkout
          </div>:  <div
            onClick={() => setOpen(true)}
            className="font-md cursor-pointer bg-blue-500 text-white p-2 rounded-md"
          >
           Login to Checkout
          </div>}
          <div className=" font-md">Quantity: {totalQuantity}</div>
          <div className=" font-md">Total: ₹ {totalAmount}</div>
        </div>

        <div className="mt-10 border-t border-gray-500 pt-4 block md:hidden ">
          <div className=" font-md">Quantity: {totalQuantity}</div>
          <div className=" font-md">Total: ₹ {totalAmount}</div>
          {Object?.keys(user)?.length > 0 ? (
            <div
              onClick={() => handlePayment()}
              className="font-md cursor-pointer t bg-blue-500 text-white p-2 w-fit mt-2 rounded-md"
            >
              Checkout
            </div>
          ) : (
            <div
              onClick={() => setOpen(true)}
              className="font-md cursor-pointer t bg-blue-500 text-white p-2 w-fit mt-2 rounded-md"
            >
              Login to Checkout
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default cart;
