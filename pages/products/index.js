import GlobalSearch from "@/components/GlobalSearch";
import Loader from "@/components/Loader";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";


const index = () => {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300); // 300ms debounce time

    return () => clearTimeout(timer); // Clear timeout on unmount or query change
  }, [query]);

  //to call api as soon as page loads
  useEffect(() => {
    ProductListFunc();
  }, []);
  // fetch api data
  const ProductListFunc = () => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((result) => setProductsList(result))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };
  // filter logic for universal search with debounce logic
  const filteredData = useMemo(() => {
    if (!debouncedQuery) return productsList;

    return productsList.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    );
  }, [debouncedQuery, productsList]);
const router = useRouter()
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
      <div className="p-6">
        <div className="w-full">
          <GlobalSearch
            filteredData={filteredData}
            setQuery={setQuery}
            query={query}
          />
        </div>

       {loading ? <Loader/>: <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {filteredData.map((product) => (
            <div
               onClick={() => router.push(`/products/${product.id}`)}
              key={product.id}
              className="border border-gray-200 rounded-lg shadow-xl p-4 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-24 object-contain w-full mb-4"
              />
              <div className="font-semibold text-md  mb-2">{product.title}</div>
              <div className=" mb-2 text-[18px]">
              ₹ {product.price}
              </div>
              <div className="text-[12px] text-gray-500 line-clamp-2 ">
                {product.description}
              </div>
            </div>
          ))}
        </div>}
      </div>
    </>
  );
};

export default index;
