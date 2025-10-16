// src/components/Background.jsx

import React from 'react';

// Receive the isModalOpen prop from App.jsx
function Background({ isModalOpen }) {
  return (
    <>
      {/* Add a transition and conditionally change opacity */}
      <div className={`fixed z-[2] w-full h-screen transition-opacity duration-300 ${isModalOpen ? 'opacity-20' : 'opacity-100'}`}>
        <div className='w-full py-10 flex justify-center text-zinc-600 font-semibold text-xl absolute top-[5%]'>Documents.</div>
        <h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[13vw] leading-none tracking-tighter font-semibold text-zinc-900'>Docs</h1>
      </div>
    </>
  );
}

export default Background;