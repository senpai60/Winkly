import React from 'react';

function ButtonDefault({ targetLink, children }) {
  // This function will ONLY be called when the button is clicked
  const handleClick = () => {
    window.location.href = targetLink;
  };

  return (
    <button 
      onClick={handleClick}
      className='min-w-30 h-10 px-4 bg-[#121212] text-white rounded-[50px]'
    >
      {children}
    </button>
  );
}

export default ButtonDefault;