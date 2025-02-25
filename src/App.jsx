import React, { useEffect } from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import data from "@utils/data";
import LocomotiveScroll from "locomotive-scroll";
const App = () => {
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  return (
    <>
      <div className="relative w-full min-h-screen">
        {data[0].map((canvasItem, canvasIndex) => (
          <Canvas key={canvasIndex} details={canvasItem} />
        ))}
        <div className="">
          
        </div>
      </div>
    </>
  );
};

export default App;
