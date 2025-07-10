import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/cartSlice";
import PathBackButton from "@/components/PathBackButton";
import Loader from "@/components/Loader";
import Head from "next/head";

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const isInCart = cart?.find((item) => item.id === Number(id));

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

  if (loading) return <Loader/>;
  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        
        <title>
          {
            "ShopNow - Your Smart Shopping Destination."
          }
        </title>
        <meta
          name="description"
          content={
            "ShopNow is a modern e-commerce app built with Next.js, Tailwind CSS, Redux, and Context API for fast, seamless shopping with cart persistence and theming."
          }
        />
        <link rel="canonical" href="https://shop-now-chi.vercel.app/" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="headLogo.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="headLogo.png"
        />
        <meta
          property="og:title"
          content={
            "ShopNow - Your Smart Shopping Destination."
          }
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
        <meta
          property="og:image"
          content="headLogo.png"
        />
     
       
        <meta name="mobile-web-app-capable" content="yes" />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
      
      </Head>
      <PathBackButton />
      <div className="p-8 max-w-3xl mx-auto">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[300px] object-contain mb-6"
        />
        <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
        <p className="text-lg  mb-2">₹{product.price}</p>
        <p className=" mb-6">{product.description}</p>

        {isInCart ? (
          <div className="flex items-center gap-4">
            <button
              onClick={handleRemoveFromCart}
              className="bg-red-800 text-white px-4 py-2 rounded-lg cursor-pointer"
            >
              Remove
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Add
          </button>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
