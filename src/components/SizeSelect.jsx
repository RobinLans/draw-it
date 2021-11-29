import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const selectorVariants = {
  hidden: { scale: 0, originX: -1, opacity: 0 },
  visible: { scale: 1, originX: 0, opacity: 1 },
};

function SizeSelect(props) {
  const [brushSizes, setBrushSizes] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  ]);

  function handleSizeClick(size) {
    props.setBrushSize(size);
    props.setShowSelect(false);
  }

  return (
    <AnimatePresence>
      <motion.div
        className="absolute bg-white top-6 left-4 rounded-lg border-2 border-gray-100 shadow-xl  w-24 h-44 overflow-auto"
        variants={selectorVariants}
        initial="hidden"
        animate="visible"
        transition={{
          ease: "easeInOut",
          duration: 0.5,
        }}
        exit="hidden"
      >
        {brushSizes?.map((size) => {
          return (
            <div
              className="w-full h-10 border-b-2 border-gray-100  flex justify-center hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                handleSizeClick(size);
              }}
            >
              <p className="text-2xl font-bold">{size}</p>
            </div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}

export default SizeSelect;
