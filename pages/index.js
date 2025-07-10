import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Products from './products'
import Head from "next/head";



export default function Home() {
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

     <div className="min-h-screen w-full flex flex-col">
    <Products/>
  </div>
    </>
   
  
  );
}
