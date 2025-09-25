import React from "react";
import ButtonDefault from "../components/ButtonDefault";
import About from "./About";
import ServicesDisplay from "./ServicesDisplay";
import MyPage from "./MyPage";

function Home() {
  return (
    <>
      {/* 1. REMOVED the custom 'main-px' class. */}
      <div
        className='w-full min-h-screen flex items-center bg-dark-th 
        bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url("/images/home-bg.jpg")] 
        bg-right bg-cover'
      >
        {/* 2. ADDED the standard container div here. */}
        <div className="home w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 3. Your content wrapper is now full-width on mobile and 2/3 on large screens. */}
          {/* I changed the problematic 'w-20' to 'w-full'. */}
          <div className="py-20 lg:w-2/3 w-full">
            <h1 className="text-white text-5xl md:text-7xl mb-10 font-bold">
              Swipe, Match, Date… and Earn!
            </h1>
            <p className="text-white text-lg mb-10 lg:w-5/6">
              Experience the first-ever dating app where connection meets reward.
              Buy a date NFT, enjoy a week-long virtual experience, and get
              rewarded based on your interaction. Love, fun, and rewards—all in
              one place.
            </p>
            <ButtonDefault targetLink={"/register"}>Get Started</ButtonDefault>
          </div>
        </div>
      </div>
      
      {/* The fixed About component will now also work correctly! */}
      <About />

      {/* Services Display */}
      
    </>
  );
}

export default Home;