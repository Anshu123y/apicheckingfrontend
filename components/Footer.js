import React from "react";

const Footer = () => {
  return (
    <div className=" bg-gray-300 shadow-lg sm:h-[80px] h:[170px] text-white flex items-center justify-evenly ">
      {/* constact us */}
      <div className=" hidden  sm:flex flex-col items-center justify-center  ">
        <div className="text-[#032d60]  font-semibold sm:text-[12px] text-[12px] flex gap-1 hover:underline">
          Contact Us
        </div>
      </div>
      <div className="   flex flex-col items-center justify-center  ">
        <div className="text-[#032d60]   font-semibold sm:text-[10px] text-[10px] flex gap-1  ">
          Made with &#x2764;&#xFE0F;
        </div>

        {/* Constact us for phone */}
        <div className="text-[#032d60]  font-semibold sm:text-[12px] text-[12px] flex gap-1 hover:underline sm:hidden ">
          Contact Us
        </div>
      </div>
    </div>
  );
};

export default Footer;
