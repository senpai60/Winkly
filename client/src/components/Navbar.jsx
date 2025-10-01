import React, { useState, useEffect, useRef } from "react";
import ButtonDefault from "./ButtonDefault";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Close the menu if the user clicks outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navRef]);


  return (
    <nav className="w-full py-4 fixed top-0 left-0 z-50 md:px-[60px]">
      <div className="w-full px-4 lg:px-20">
        {/* The ref is attached to the container to detect outside clicks */}
        <div ref={navRef} className="nav-container relative w-full text-[#121212] bg-[#d1d1d1] rounded-[50px] flex justify-between items-center px-6 py-3 shadow-md">
          
          {/* Brand Name */}
          <h1 className="font-bold text-lg cursor-pointer">WINKLY</h1>

          {/* Desktop Navigation Links */}
          <div className="navlinks hidden md:flex items-center justify-center gap-2">
            {/* <a className="text-sm h-10 min-w-10 px-4 rounded-[50px] flex items-center transition-colors duration-300 hover:bg-[#121212] hover:text-white" href="/">Home</a>
            <a className="text-sm h-10 min-w-10 px-4 rounded-[50px] flex items-center transition-colors duration-300 hover:bg-[#121212] hover:text-white" href="#about">About</a>
            <a className="text-sm h-10 min-w-10 px-4 rounded-[50px] flex items-center transition-colors duration-300 hover:bg-[#121212] hover:text-white" href="#how-it-works">How It Works</a> */}
            <a className="text-sm h-10 min-w-10 px-4 rounded-[50px] flex items-center transition-colors duration-300 hover:bg-[#121212] hover:text-white" href="https://winkly-app.vercel.app/">OpenApp</a>
          </div>
          <ButtonDefault targetLink={"https://winkly-app.vercel.app/"}>OpenApp</ButtonDefault>

          {/* Hamburger Menu Icon - only visible on mobile/tablet */}
          <div className="hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none p-2" aria-label="Toggle Menu">
              {/* Animated Hamburger/Close Icon */}
              <div className="space-y-1.5">
                  <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu Dropdown with Transition */}
          <div className={`absolute top-[120%] left-0 w-full md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              <div className="bg-[#f6f6f6] rounded-2xl shadow-lg m-2">
                <div className="flex flex-col items-center p-4 gap-2">
                    <a onClick={() => setIsMenuOpen(false)} className="w-full text-center font-sm py-3 rounded-[50px] transition-colors duration-300 hover:bg-gray-200" href="/">Home</a>
                    <a onClick={() => setIsMenuOpen(false)} className="w-full text-center font-sm py-3 rounded-[50px] transition-colors duration-300 hover:bg-gray-200" href="#about">About</a>
                    <a onClick={() => setIsMenuOpen(false)} className="w-full text-center font-sm py-3 rounded-[50px] transition-colors duration-300 hover:bg-gray-200" href="#how-it-works">How It Works</a>
                    <a onClick={() => setIsMenuOpen(false)} className="w-full text-center font-sm py-3 rounded-[50px] transition-colors duration-300 hover:bg-gray-200" href="#explore">Explore</a>
                </div>
              </div>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
