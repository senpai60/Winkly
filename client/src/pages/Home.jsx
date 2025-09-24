import React from "react";
import ButtonDefault from "../components/ButtonDefault";

function Home() {
  return (
    <div
      className='main-px w-full h-screen bg-dark-th 
    bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url("/images/home-bg.jpg")] 
    bg-right bg-cover'
    >
      <div className="home w-full h-full relative">
        <div className="py-50 w-2/3">
          <h1 className="text-white text-7xl mb-10">Swipe, Match, Date… and Earn!</h1>
          <p className="text-white mb-10 w-5/6">
            Experience the first-ever dating app where connection meets reward.
            Buy a date NFT, enjoy a week-long virtual experience, and get
            rewarded based on your interaction. Love, fun, and rewards—all in
            one place.
          </p>
          <ButtonDefault targetLink={'/register'} >Get Started</ButtonDefault>
        </div>
      </div>
    </div>
  );
}

export default Home;
