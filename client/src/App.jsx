import React, { useLayoutEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

// --- GSAP Imports and Registration ---
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);



function App() {

  const main = useRef()
  useLayoutEffect(()=>{
    const ctx = gsap.context(()=>{
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2, // How much to smooth the scroll (1 is default)
        effects: true, // Look for data-speed and data-lag attributes
      })
    },main)
    return () => ctx.revert();
  },[])

  return (
    <div ref={main}>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
