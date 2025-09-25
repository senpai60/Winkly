import React from "react";
import { FaCheck } from "react-icons/fa";

function CardDyanamic({ project }) {
  if (!project) return null;
  return (
    <div className="w-full min-h-120 flex gap-30 py-2 mb-40">
      {/* Image */}
      <div className="image-card w-120 h-120 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={project.image}
          alt={project.heading}
        />
      </div>

      {/* Content */}
      <div className="content w-150">
        <h1 className="mb-4 text-5xl font-medium leading-13">
          {project.heading}
        </h1>
        <p className="mb-4 text-sm font-light">{project.para}</p>

        {/* List */}
        <div className="flex flex-col gap-3">
          {project.list.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center p-1
                bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
              >
                <FaCheck size={10} />
              </div>
              <div className="list-texts">{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardDyanamic;
