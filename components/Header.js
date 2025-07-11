import { useContext, useState } from "react";
import { ThemeColor } from "@/context/ThemeContext";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, ToggleFunc } = useContext(ThemeColor);

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const router = useRouter();

  return (
    <div
      className={
        theme === "Light"
          ? "   bg-[#FF6D00] to-headerColor relative  h-[100px] text-white flex  justify-between  "
          : "   bg-black  h-[100px] text-white flex  justify-between relative "
      }
    >
      {/* Logo section */}
      <div className="flex justify-start gap-8">
        <div className="flex justify-start items-start gap-6">
          <div
            onClick={() => router.push("/")}
            className="text-white mt-3  font-semibold sm:text-[14px] text-[12px] flex gap-1 cursor-pointer "
          >
            <img
              className="h-[100px] w-[100px] object-contain -mt-2 "
              src="/logo.png"
            />
          </div>
        </div>
      </div>

      <div className="flex  items-center pl-3 gap-4">
        {/* Cart section */}
        <div
          onClick={() => router.push("/cart")}
          className="relative flex justify-start items-start gap-6 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-10 h-10 mt-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.837l.383 1.43m0 0L6.75 12.75m-1.644-7.483h13.488a.75.75 0 01.732.927l-1.5 6a.75.75 0 01-.732.573H7.152m0 0l-.347 1.394a1.5 1.5 0 001.458 1.856h10.239m-11.697 0a1.125 1.125 0 110 2.25m11.25-2.25a1.125 1.125 0 110 2.25"
            />
          </svg>

          {/* Quantity Badge */}

          <span className="absolute top-8 left-8  text-white text-md font-bold px-0.5 py-0.5 rounded-full">
            {totalQuantity}
          </span>
        </div>

        {/* Dual theme section */}
        <div className="flex flex-col items-center pl-3 mt-12">
          <div
            className={`relative w-12 h-6 rounded-full border transition-all duration-500 ease-in-out ${
              theme === "Light"
                ? "bg-white border-gray-300"
                : "bg-white border-gray-300"
            }`}
          >
            <div
              onClick={ToggleFunc}
              className={`absolute top-0.5 h-5 w-5 rounded-full cursor-pointer transition-all duration-500 ease-in-out
        ${
          theme === "Light"
            ? "translate-x-1 bg-black"
            : "translate-x-6 bg-[#FF6D00]"
        }`}
            ></div>
          </div>
        </div>
        {/* User Information section */}
        <div className="flex flex-col items-center mt-2">
          <div
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="relative inline-block"
          >
            <div className="flex justify-center items-center   cursor-pointer mt-3 font-semibold text-[12px] ">
              <button className="text-center pr-1">User Name</button>
            </div>
          </div>
          <div className="text-white font-semibold text-[14px] pr-1 mt-2">
            <div
              onClick={() => setOpen(true)}
              className="w-8 h-8 cursor-pointer"
            >
              <img src="/power-off.png" />
              {/*  <p className="text-[14px]">Logout</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
