import React, { useState } from "react";
import CardDyanamic from "../components/CardDyanamic";
import ButtonSelected from "../components/ButtonSelected";

const projects = {
  "Smart Discovery": {
    heading: "Smarter Way to Find Connections",
    para: "Instead of endless swipes, our discovery system learns from your preferences and introduces you to profiles that truly match your vibe.",
    list: [
      "AI-assisted profile suggestions",
      "Less noise, more meaningful matches",
      "Interactive and engaging first impressions",
    ],
    image: "/images/smart-discovery.png",
  },

  "NFT Dating Pass": {
    heading: "Access Unique Experiences with NFTs",
    para: "The NFT Pass isn’t just digital art—it unlocks private conversations, week-long bonding, and exclusive activities with your match.",
    list: [
      "Exclusive NFT-based passes",
      "Limited edition experiences",
      "True digital ownership",
    ],
    image: "/images/nft-pass.png",
  },

  "Immersive Week": {
    heading: "Transform Dates into Adventures",
    para: "No boring texting. Enjoy curated activities, virtual hangouts, and gamified interactions that make each day of your week memorable.",
    list: [
      "Curated fun activities",
      "Private chat & video zones",
      "Daily surprises & challenges",
    ],
    image: "/images/immersive-week.jpg",
  },

  "Trust & Transparency": {
    heading: "Fair Ratings, Real Rewards",
    para: "Your experience is in your hands. Both users leave honest feedback, and high-rated interactions boost the value of your NFTs.",
    list: [
      "Transparent double-rating system",
      "Incentives for genuine connections",
      "NFT growth tied to user trust",
    ],
    image: "/images/trust-transparency.jpg",
  },

  "Safety First": {
    heading: "Your Security is Our Priority",
    para: "Every step is designed with safety in mind—from encrypted chats to refunding unused NFTs, ensuring trust and comfort at all times.",
    list: [
      "Secure blockchain transactions",
      "NFT protection & refund system",
      "Verified and safe community",
    ],
    image: "/images/safety-first.jpg",
  },
};

function ServicesDisplay() {
  const [selected, setSelected] = useState("Smart Discovery");
  return (
    <div className="page-2 px-40 bg-zinc-950">
      {/* Headings */}
      <PageHeadings
        para="Redefining Digital Dating with Innovation"
        heading={"Our Core Services"}
      />

      {/* Button Dyanamic */}
      <div className="three-btn-section mb-20 w-full min-h-20 gap-20 flex justify-center items-center">
        {Object.keys(projects).map((key) => (
          <ButtonSelected
            key={key}
            btnName={key}
            isActive={selected === key}
            onClick={() => setSelected(key)}
          />
        ))}
      </div>

      <CardDyanamic project={projects[selected]} />
    </div>
  );
}

export default ServicesDisplay;
