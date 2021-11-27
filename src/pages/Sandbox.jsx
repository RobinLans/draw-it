import React, { useState } from "react";
import trashCan from "../assets/trash-can-hand-drawn-symbol.png";
import download from "../assets/download.png";
import homeIcon from "../assets/house-hand-drawn-construction.png";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const homeVariant = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  visible: {
    opacity: 0.9,
    x: 0,
  },
};

function Sandbox() {
  const navigate = useNavigate();
  const [hoverHome, setHoverHome] = useState(false);

  function goHome() {
    navigate("/", { replace: true });
  }

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="relative bg-white w-canvas h-canvas rounded-3xl shadow-lg">
        <button
          className="  absolute -top-24 flex items-center"
          onClick={goHome}
          onMouseEnter={() => {
            setHoverHome(true);
          }}
          onMouseLeave={() => {
            setHoverHome(false);
          }}
        >
          <img src={homeIcon} alt="home" className="h-20 opacity-70 " />
          <AnimatePresence>
            {hoverHome && (
              <motion.h1
                className="text-5xl text"
                variants={homeVariant}
                initial="hidden"
                animate="visible"
                transition={{
                  ease: "easeInOut",
                  type: "spring",
                  duration: 0.2,
                }}
                exit="hidden"
              >
                Home
              </motion.h1>
            )}
          </AnimatePresence>
        </button>
        <div className="absolute top-0 -left-20 flex flex-col justify-between h-full">
          <div className="flex flex-col">
            <button className="canvasBtns mb-2 flex justify-center items-center">
              {/* <div className="bg-red-600 w-8 h-8 rounded-lg"></div> */}
              <div className="relative w-10 h-10 overflow-hidden rounded-full cursor-pointer ">
                <input
                  type="color"
                  className="w-32 h-32 bg-transparent border-none cursor-pointer outline-none absolute -left-20 -top-20"
                />
              </div>
            </button>
            <button className="canvasBtns mb-2 ">
              <p className=" w-14  text-5xl text-center ">3</p>
            </button>
            <button className="canvasBtns mb-2 flex justify-center items-center">
              <img src={trashCan} alt="trashCan" className="h-10" />
            </button>
          </div>
          <button className="canvasBtns flex justify-center items-center">
            {" "}
            <img
              src={download}
              alt="download"
              className="h-10 transform rotate-180"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sandbox;
