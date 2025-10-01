import React from "react";
import ButtonDefault from "../components/ButtonDefault";
import About from "./About";
import ServicesDisplay from "./ServicesDisplay";
import StatsSection from "./StatsSection";
import TestimonialsSection from "./TestimonialsSection";
import RoadmapSection from "./RoadmapSection";
import FAQSection from "./FAQSection";
import CTASection from "./CTASection";
import Footer from "../components/Footer";

function Home() {
  const mainAppLink = "https://winkly-app.vercel.app/"
  return (
    <>
      {/* Hero Section */}
      <div
        className='w-full min-h-screen flex items-center bg-dark-th 
        bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url("/images/home-bg.jpg")] 
        bg-right bg-cover'
      >
        <div className="home w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <ButtonDefault targetLink={mainAppLink}>Get Started</ButtonDefault>
          </div>
        </div>
      </div>
      
      {/* About Section - How it works */}
      <About />

      {/* Services Display Section */}
      <ServicesDisplay/>

      {/* Stats Section */}
      <StatsSection />

      {/* Roadmap Section */}
      <RoadmapSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Call to Action Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;