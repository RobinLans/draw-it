import React, { useState, useRef, useEffect } from "react";
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
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const colorRef = useRef(null);
  const navigate = useNavigate();
  const [hoverHome, setHoverHome] = useState(false);
  const [painting, setPainting] = useState(false);
  const [color, setColor] = useState("#000000");
  // const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = 720;
    canvas.width = 1080;

    const ctx = canvas.getContext("2d");
    ctx.linceCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctxRef.current = ctx;
  }, []);

  function startPosition({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setPainting(true);
  }

  function finishedPosition() {
    ctxRef.current.closePath();
    setPainting(false);
  }

  function draw({ nativeEvent }) {
    if (!painting) return;
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  }

  function handleColorChange(e) {
    console.log(e.target.value);
    setColor(e.target.value);
  }

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.strokeStyle = color;
  }, [color, setColor]);

  function goHome() {
    navigate("/", { replace: true });
  }

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="relative bg-white w-canvas h-canvas rounded-3xl shadow-lg">
        <canvas
          className=" rounded-3xl"
          ref={canvasRef}
          onMouseDown={startPosition}
          onMouseUp={finishedPosition}
          onMouseLeave={finishedPosition}
          onMouseMove={draw}
        ></canvas>
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
                  ref={colorRef}
                  onChange={handleColorChange}
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
