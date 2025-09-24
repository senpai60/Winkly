import React from "react";
import ButtonDefault from "./ButtonDefault";

function Navbar() {
  return (
    <nav className="w-full h-25 py-4 main-px fixed">
      <div className="nav-containor w-full h-full text-[#121212] bg-[#f6f6f6] rounded-[50px] flex justify-between items-center px-10">
        <h1 className="font-bold">WINKLY</h1>
        <div className="navlinks flex items-center justify-center gap-2">
          {/* - Base styles: h-10, px-4, rounded-[50px], etc. are always applied.
            - Hover styles: hover:bg-dark-th and hover:text-white are applied only on mouse hover.
            - Transition: transition-colors makes the color change smooth.
          */}
          <a className="font-sm h-10 min-w-10 px-4 rounded-[50px] flex items-center transition-colors hover:bg-[#121212] hover:text-white" href="/">Home</a>
          <a className="font-sm h-10 min-w-10 px-4 rounded-[50px] flex items-center transition-colors hover:bg-[#121212] hover:text-white" href="">About</a>
          <a className="font-sm h-10 min-w-10 px-4 rounded-[50px] flex items-center transition-colors hover:bg-[#121212] hover:text-white" href="">How It Works</a>
          <a className="font-sm h-10 min-w-10 px-4 rounded-[50px] flex items-center transition-colors hover:bg-[#121212] hover:text-white" href="">Explore</a>
        </div>
        <div className="btn-nav">
            <ButtonDefault/>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;