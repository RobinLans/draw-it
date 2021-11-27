import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import arrow from "../assets/down-arrow-hand-drawn-outline.png";
import { linkVariant } from "../animation/motion";

function Home() {
  const [sbHover, setSbHover] = useState(false);
  const [pHover, setPHover] = useState(false);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="absolute top-20 text text-9xl">DrawIt</h1>
      <div className="flex flex-col">
        <motion.div variants={linkVariant} whileHover="hover" className="my-6">
          <Link
            to="/sandbox"
            className="relative text text-8xl"
            onMouseEnter={() => {
              setSbHover(true);
            }}
            onMouseLeave={() => {
              setSbHover(false);
            }}
          >
            Sandbox
            {sbHover && (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ ease: "easeInOut", duration: 0.2 }}
                src={arrow}
                alt="arrow"
                className="absolute opacity-70 transform -rotate-90 w-14 top-8 -left-14"
              />
            )}
          </Link>
        </motion.div>
        <motion.div variants={linkVariant} whileHover="hover" className="my-6">
          <Link
            to="/pictionary"
            className="relative text text-8xl "
            onMouseEnter={() => {
              setPHover(true);
            }}
            onMouseLeave={() => {
              setPHover(false);
            }}
          >
            Pictionary
            {pHover && (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ ease: "easeInOut", duration: 0.2 }}
                src={arrow}
                alt="arrow"
                className="absolute opacity-70 transform -rotate-90 w-14 top-8 -left-14"
              />
            )}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
