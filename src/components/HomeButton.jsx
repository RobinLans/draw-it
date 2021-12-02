import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import homeIcon from "../assets/house-hand-drawn-construction.png";

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

function HomeButton() {
  const [hoverHome, setHoverHome] = useState(false);
  const navigate = useNavigate();

  function goHome() {
    navigate("/", { replace: true });
  }
  return (
    <button
      className="  absolute -top-20 2xl:-top-24 flex items-center"
      onClick={goHome}
      onMouseEnter={() => {
        setHoverHome(true);
      }}
      onMouseLeave={() => {
        setHoverHome(false);
      }}
    >
      <img src={homeIcon} alt="home" className="h-16 2xl:h-20 opacity-70 " />
      <AnimatePresence>
        {hoverHome && (
          <motion.h1
            className="text-4xl 2xl:text-5xl text"
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
  );
}

export default HomeButton;
