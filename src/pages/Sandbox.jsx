import React, { useState, useRef, useEffect } from "react";
import trashCan from "../assets/trash-can-hand-drawn-symbol.png";
import download from "../assets/download.png";

import { AnimatePresence } from "framer-motion";
import SizeSelect from "../components/SizeSelect";

import HomeButton from "../components/HomeButton";

function Sandbox() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const colorRef = useRef(null);

  const [painting, setPainting] = useState(false);
  const [color, setColor] = useState("#000000");
  const [showSelect, setShowSelect] = useState(false);
  const [brushSize, setBrushSize] = useState(5);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (windowWidth < 1536) {
      canvas.height = 480;
      canvas.width = 720;
    } else {
      canvas.height = 720;
      canvas.width = 1080;
    }

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctxRef.current = ctx;
  }, [windowWidth]);

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
    setColor(e.target.value);
  }

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.strokeStyle = color;
  }, [color, setColor]);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineWidth = brushSize;
  }, [brushSize, setBrushSize]);

  function clearCanvas() {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  function handleShowSelectShowing() {
    setShowSelect(!showSelect);
  }

  function handleDownload() {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    canvas.toBlob(function (blob) {
      if (!blob) {
        return;
      }
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.download =
        "this-is-a-very-nice-pictture-that-i-drew-and-i-want-to-save-it-so-that-i-can-show-it-to-my-father-and-make-him-proud-of-my-achievments.png";
      link.href = url;
      link.click();

      URL.revokeObjectURL(url);
    });
  }

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="canvasContainer">
        <canvas
          className=" rounded-3xl"
          ref={canvasRef}
          onMouseDown={startPosition}
          onMouseUp={finishedPosition}
          onMouseLeave={finishedPosition}
          onMouseMove={draw}
        ></canvas>
        <HomeButton />

        <div className="btnsDiv">
          <div className="flex flex-col">
            <button className="colorNTrashBtn">
              <div className="colorDiv">
                <input
                  type="color"
                  className="colorInput"
                  ref={colorRef}
                  onChange={handleColorChange}
                />
              </div>
            </button>
            <button
              className="canvasBtns mb-2"
              onClick={handleShowSelectShowing}
            >
              <p className="w-14 text-5xl text-center">{brushSize}</p>
            </button>
            <button className="colorNTrashBtn" onClick={clearCanvas}>
              <img src={trashCan} alt="trashCan" className="h-10" />
            </button>
          </div>
          <button
            className="canvasBtns flex justify-center items-center"
            onClick={handleDownload}
          >
            <img
              src={download}
              alt="download"
              className="h-10 transform rotate-180"
            />
          </button>
        </div>

        {showSelect && (
          <AnimatePresence>
            <SizeSelect
              setBrushSize={setBrushSize}
              setShowSelect={setShowSelect}
            ></SizeSelect>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export default Sandbox;
