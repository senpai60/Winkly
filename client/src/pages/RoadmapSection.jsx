import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCheckCircle, FaCircle } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

function RoadmapSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.roadmap-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        x: -50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const roadmapItems = [
    {
      phase: 'Q1 2025',
      title: 'Beta Launch',
      status: 'completed',
      items: [
        'Platform Development',
        'Smart Contract Deployment',
        'Beta Testing with 1000 Users',
        'NFT Marketplace Setup'
      ]
    },
    {
      phase: 'Q2 2025',
      title: 'Public Launch',
      status: 'in-progress',
      items: [
        'Official Platform Launch',
        'Mobile App Release (iOS & Android)',
        'Influencer Partnerships',
        'Community Building Events'
      ]
    },
    {
      phase: 'Q3 2025',
      title: 'Feature Expansion',
      status: 'upcoming',
      items: [
        'Video Date Features',
        'Group Dating Experiences',
        'Enhanced NFT Rewards',
        'Multi-chain Support'
      ]
    },
    {
      phase: 'Q4 2025',
      title: 'Global Scale',
      status: 'upcoming',
      items: [
        'International Expansion',
        'Advanced AI Matching',
        'Virtual Reality Dates',
        'Token Launch & Exchange Listings'
      ]
    }
  ];

  return (
    <div ref={sectionRef} className="w-full bg-zinc-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Roadmap
          </h2>
          <p className="text-zinc-400 text-lg">
            Building the future of dating, one milestone at a time
          </p>
        </div>

        <div className="relative">
          {/* Vertical line - hidden on mobile, visible on md+ */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 opacity-30"></div>

          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <div 
                key={index}
                className={`roadmap-item relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${
                  index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                }`}>
                  <div className={`bg-zinc-900 p-6 rounded-xl border ${
                    item.status === 'completed' ? 'border-green-500' :
                    item.status === 'in-progress' ? 'border-purple-500' :
                    'border-zinc-800'
                  } hover:border-purple-500 transition-colors duration-300`}>
                    <div className="flex items-center gap-2 mb-3 justify-between">
                      <span className="text-purple-400 font-semibold">{item.phase}</span>
                      {item.status === 'completed' ? (
                        <FaCheckCircle className="text-green-500" />
                      ) : item.status === 'in-progress' ? (
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                      ) : (
                        <FaCircle className="text-zinc-600" size={12} />
                      )}
                    </div>
                    <h3 className="text-white text-2xl font-bold mb-4">{item.title}</h3>
                    <ul className="space-y-2">
                      {item.items.map((subItem, subIndex) => (
                        <li key={subIndex} className="text-zinc-400 flex items-start gap-2">
                          <span className="text-purple-500 mt-1">•</span>
                          <span>{subItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="hidden md:flex w-2/12 justify-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    item.status === 'completed' ? 'bg-green-500' :
                    item.status === 'in-progress' ? 'bg-purple-500' :
                    'bg-zinc-800'
                  }`}>
                    {item.status === 'completed' ? (
                      <FaCheckCircle className="text-white" size={24} />
                    ) : item.status === 'in-progress' ? (
                      <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                    ) : (
                      <FaCircle className="text-zinc-600" size={16} />
                    )}
                  </div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoadmapSection;