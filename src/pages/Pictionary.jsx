import React from "react";
import HomeButton from "../components/HomeButton";

function Pictionary() {
  return (
    <div className="flex h-full justify-center items-center">
      <div className="relative h-44 w-20">
        <HomeButton />
        <h1 className="text-3xl w-60">
          This is not finished yet, I'm Sorry :-(
        </h1>
      </div>
    </div>
  );
}

export default Pictionary;
