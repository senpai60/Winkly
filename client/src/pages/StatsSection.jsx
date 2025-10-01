import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function StatsSection() {
  const sectionRef = useRef(null);
  const [counts, setCounts] = useState({
    users: 0,
    matches: 0,
    nfts: 0,
    rewards: 0
  });

  useEffect(() => {
    const section = sectionRef.current;
    
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(counts, {
            users: 50000,
            matches: 150000,
            nfts: 25000,
            rewards: 1000000,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function() {
              setCounts({
                users: Math.floor(this.targets()[0].users),
                matches: Math.floor(this.targets()[0].matches),
                nfts: Math.floor(this.targets()[0].nfts),
                rewards: Math.floor(this.targets()[0].rewards)
              });
            }
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <div ref={sectionRef} className="w-full bg-gradient-to-b from-zinc-950 to-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Growing Fast, Trusted Worldwide
          </h2>
          <p className="text-zinc-400 text-lg">
            Join thousands who are already finding love and earning rewards
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
              {formatNumber(counts.users)}+
            </div>
            <p className="text-zinc-400 text-sm md:text-base">Active Users</p>
          </div>

          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
              {formatNumber(counts.matches)}+
            </div>
            <p className="text-zinc-400 text-sm md:text-base">Matches Made</p>
          </div>

          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
              {formatNumber(counts.nfts)}+
            </div>
            <p className="text-zinc-400 text-sm md:text-base">NFTs Minted</p>
          </div>

          <div className="text-center">
            <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
              ${formatNumber(counts.rewards)}
            </div>
            <p className="text-zinc-400 text-sm md:text-base">Rewards Earned</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsSection;