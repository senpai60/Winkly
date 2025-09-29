import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { FaCheck } from "react-icons/fa";
import ButtonDefault from "./ButtonDefault";

function CardDyanamic({ project }) {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // The animation targets remain the same and will work with the new structure
      gsap.from("#image-card, #content", {
        opacity: 0,
        y: "+=30",
        stagger: 0.2, // Slightly reduced stagger for a smoother effect
        duration: 0.8, // Slightly faster duration
        ease: "power3.out",
      });
    }, comp);
    return () => ctx.revert();
  }, [project]); // Dependency array is correct

  if (!project) return null;

  return (
    <div
      ref={comp}
      // Stacks vertically on mobile, horizontally on medium screens and up
      className="w-full flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20 text-white"
    >
      {/* Image */}
      {/* Takes full width on mobile, and a fraction of the width on larger screens */}
      <div id="image-card" className="image-card w-full md:w-5/12 lg:w-1/2 aspect-video md:h-120 rounded-lg overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={project.image}
          alt={project.heading}
        />
      </div>

      {/* Content */}
      <div id="content" className="content w-full md:w-7/12 lg:w-1/2">
        {/* Responsive font sizes */}
        <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
          {project.heading}
        </h1>
        <p className="mb-6 text-base lg:text-lg font-light">{project.para}</p>

        {/* List */}
        <div className="flex flex-col gap-3 mb-10">
          {project.list.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center p-1
                 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white flex-shrink-0"
              >
                <FaCheck size={10} />
              </div>
              <div className="list-texts text-base">{item}</div>
            </div>
          ))}
        </div>
        <div className="action-button">
          <ButtonDefault>Know More!</ButtonDefault>
        </div>
      </div>
    </div>
  );
}

export default CardDyanamic;