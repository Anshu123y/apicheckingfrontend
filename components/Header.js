import { useContext, useState } from "react";
import { ThemeColor } from "@/context/ThemeContext";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";
import MobileSidebar from "./MobileSidebar";
import SignInUpLofinForm from "./SignInUpLofinForm";
import ConfirmationModal from "./ConfirmationModel";

const Header = (props) => {
  const [userOpen, setUserOpen] = useState(false);
  const [signupLoginopen, setSignupLoginopen] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const { theme, ToggleFunc } = useContext(ThemeColor);
  const { LogoutFunc, user, } =
    useContext(AuthContext);

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
      {" "}
      <SignInUpLofinForm setOpen={setSignupLoginopen} open={signupLoginopen} />
      <ConfirmationModal
        isOpen={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
        onConfirm={LogoutFunc}
        closeSidebar={()=>setIsOpen(false)}
        title="Log out"
        message="Are you sure you want to logout."
          />
      {/* Logo section */}
      <div className="flex justify-start gap-8">
        <div className="flex justify-start items-start gap-6">
          <div
            onClick={() => router.push("/")}
            className="text-white mt-3  font-semibold sm:text-[14px] text-[12px] md:flex gap-1 cursor-pointer hidden"
          >
            <img
              className="h-[100px] w-[100px] object-contain -mt-2 "
              src="/logo.png"
            />
          </div>
          <div className="text-white mt-3  font-semibold sm:text-[14px] text-[12px] flex gap-1 cursor-pointer md:hidden">
            <MobileSidebar theme={theme} />
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
            className="w-9 h-9 mt-10"
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
        <div className="flex flex-col items-center pl-3 mt-10 pr-1 md:pr-0">
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
        <div className="md:flex flex-col items-center mt-2 hidden">
          <div
            onMouseEnter={() => setUserOpen(true)}
            onMouseLeave={() => setUserOpen(false)}
            className="relative inline-block  "
          >
            <img className="w-10 h-10 mt-5 cursor-pointer" src="/user.png" />
            {userOpen && (
              <div className="relative">
                <div className="absolute right-1  w-fit  bg-gray-100 border border-gray-200 rounded-md shadow-lg z-50 p-3 text-sm">
                  {Object?.keys(user)?.length>0  ? (
                    <div>
                    <div className="w-full text-left font-medium text-gray-800 ">
                      {user.name}
                      </div>
                      <div className="w-full text-left font-medium text-gray-800 ">
                      {user.email}
                      </div>
                      <div onClick={()=>setOpenConfirmModal(true)} className="w-full text-left font-medium text-gray-800 hover:text-blue-600 cursor-pointer">
                      Log Out
                    </div>
                    </div>
                  
                  ) : (
                    <button onClick={()=>setSignupLoginopen(true)} className="w-full text-left font-medium text-gray-800 hover:text-blue-600 cursor-pointer">
                      Login
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
