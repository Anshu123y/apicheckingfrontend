import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  closeSidebar,
}) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0  bg-opacity-80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white border border-gray-300 p-6 shadow-xl transition-all">
              <Dialog.Title className="text-[16px] font-semibold text-center">
                {title}
              </Dialog.Title>
              <div className="mt-2 text-[14px] text-center ">{message}</div>
              {/* for Mobile */}

              <div className="mt-4 flex justify-center gap-2 md:hidden">
                <button
                  onClick={onClose}
                  className="rounded-md px-4 py-2 text-sm bg-gray-500 text-white "
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                    closeSidebar();
                  }}
                  className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white "
                >
                  Confirm
                </button>
              </div>
              {/* for desktop */}
              <div className="mt-4 md:flex justify-center gap-2 hidden">
                <button
                  onClick={onClose}
                  className="rounded-md px-4 py-2 text-sm bg-gray-500 text-white  cursor-pointer hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-800 cursor-pointer"
                >
                  Confirm
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ConfirmationModal;
