import React from "react";
import ButtonDefault from "./ButtonDefault";

function Navbar() {
  return (
    <nav className="w-full py-4 fixed top-0 left-0 z-10">
      <div className="w-full px-4 md:px-[80px] lg:px-[180px]">
        
        {/* I've added py-3 here to add vertical padding and removed h-full */}
        <div className="nav-containor w-full text-[#121212] bg-[#f6f6f6] rounded-[50px] flex justify-between items-center px-6 sm:px-10 **py-3**">
          
          <h1 className="font-bold">WINKLY</h1>
          <div className="navlinks flex items-center justify-center gap-2">
            <a className="font-sm h-10 min-w-10 px-4 rounded-[50px] flex items-center transition-colors hover:bg-[#121212] hover:text-white" href="/">Home</a>
            <a className="font-sm h-10 min-w-10 px-4 rounded-[50px] flex items-center transition-colors hover:bg-[#121212] hover:text-white" href="">About</a>
            <a className="font-sm h-10 min-w-10 px-4 rounded-[50px] flex items-center transition-colors hover:bg-[#121212] hover:text-white" href="">How It Works</a>
            <a className="font-sm h-10 min-w-10 px-4 rounded-[50px] flex items-center transition-colors hover:bg-[#121212] hover:text-white" href="">Explore</a>
          </div>
          <div className="btn-nav">
              <ButtonDefault targetLink={"/winkly"}>Open App</ButtonDefault>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;