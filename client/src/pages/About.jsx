import React from 'react';
import CardAbout from '../components/CardAbout.jsx';
import { cardsData } from '../../data/aboutCardData.js';

function About() {
  return (
    // 1. REMOVED px-40 from the outer div. It only handles background and height now.
    <div className="w-full py-20 bg-black">
      
      {/* 2. ADDED a new inner container for content. */}
      {/* This centers the content and adds safe, responsive padding. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Your card section now sits inside the safe container */}
        <div className="about-card-section w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardsData.map((card, index) => (
            <CardAbout
              key={index}
              icon={card.icon}
              heading={card.heading}
              para={card.para}
              link={card.link}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default About;