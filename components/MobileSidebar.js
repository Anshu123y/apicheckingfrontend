import { useContext, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "@/context/AuthContext";
import ConfirmationModal from "./ConfirmationModel";
import SignInUpLofinForm from "./SignInUpLofinForm";

export default function MobileSidebar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [open, setOpen] = useState(false);
  const { LogoutFunc, user } = useContext(AuthContext);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  return (
    <div className="md:hidden">
      <ConfirmationModal
        isOpen={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
        onConfirm={LogoutFunc}
        closeSidebar={closeSidebar}
        title="Log out"
        message="Are you sure you want to logout."
      />
      <SignInUpLofinForm setOpen={setOpen} open={open} />

      <button onClick={toggleSidebar} className="p-2">
        <Bars3Icon className="w-6 h-6 " />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0    bg-opacity-50 z-40"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-2/3 shadow-lg z-50 ${
          props.theme == "Light"
            ? "bg-white text-black"
            : "bg-gray-600 text-white"
        } transform  transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className={`flex items-center justify-between text-white p-4 border-b  border-white ${
            props.theme == "Light" ? "bg-[#FF6D00]" : "bg-black"
          }`}
        >
          <div>
            <div className="text-lg font-semibold">
              {Object?.keys(user)?.length>0 ? user.name : "User"}
            </div>
            <div className="text-[12px] font-semibold">
              {Object?.keys(user)?.length>0 ? user.email : ""}
            </div>
          </div>

          <button onClick={toggleSidebar}>
            <XMarkIcon className="w-6 h-6 text-white" />
          </button>
        </div>
        <nav className="flex flex-col p-4 gap-4">
          <a href="/" className="">
            Home
          </a>

          <a href="/cart" className="">
            Cart
          </a>
          {Object?.keys(user)?.length>0 ? (
            <div onClick={() => setOpenConfirmModal(true)} className=" ">
              Log Out
            </div>
          ) : (
            <div onClick={() => setOpen(true)} className=" ">
              Login
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
