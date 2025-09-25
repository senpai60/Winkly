import React from "react";

function ButtonSelected({ className, btnName, isActive, ...prop }) {
  return (
    <button
      className={`
        min-w-30 h-10 rounded p-2 cursor-pointer
        text-zinc-100
        active:scale-95
        transition-all duration-300
        ${
          isActive // --- Styles when SELECTED ---
            ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-transparent" // --- Styles when NOT selected ---
            : "bg-transparent border border-purple-500 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:border-transparent"
        }
        ${className}
      `}
      // Add the onClick handler and spread other props
      {...prop}
    >
      {btnName}
    </button>
  );
}

export default ButtonSelected;