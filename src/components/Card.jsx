// src/components/Card.jsx

import React from 'react';
import { FaRegFileAlt } from 'react-icons/fa';
import { LuDownload } from 'react-icons/lu';
import { IoClose } from 'react-icons/io5';
import { motion } from 'framer-motion';

// The component now accepts onDelete and onDownload functions as props
function Card({ data, reference, onDelete, onDownload }) {
  return (
    <motion.div
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.1, zIndex: 100 }} // Bring card to front while dragging
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 100, bounceDamping: 30 }}
      className="flex-shrink-0 relative w-60 h-72 rounded-[45px] bg-zinc-900/90 text-white px-8 py-10 overflow-hidden"
    >
      <FaRegFileAlt />
      <p className="text-sm leading-tight mt-5 font-semibold ">{data.desc}</p>
      <div className="footer absolute bottom-0 w-full left-0">
        <div className="flex items-center justify-between px-8 py-3 mb-3">
          <h5> {data.filesize} </h5>
          
          {/* Use a conditional (ternary) operator to decide which icon to show */}
          {data.close ? (
            // If data.close is true, show the close icon with an onClick handler
            <span 
              onClick={() => onDelete(data.id)} // Call onDelete with the card's ID
              className="w-7 h-7 bg-zinc-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-500 transition-colors"
            >
              <IoClose />
            </span>
          ) : (
            // Otherwise, show the download icon with its onClick handler
            <span
              onClick={() => onDownload(data)} // Call onDownload with the card's data
              className="w-7 h-7 bg-zinc-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-500 transition-colors"
            >
              <LuDownload size=".8em" color="#fff" />
            </span>
          )}
        </div>

        {/* This part remains the same */}
        {data.tag.isOpen && (
          <div
            className={`tag w-full py-4 ${
              data.tag.tagColor === 'sky' ? 'bg-sky-600' : 'bg-green-600'
            } flex items-center justify-center`}
          >
            <h3 className="text-sm font-semibold">{data.tag.tagTitle}</h3>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Card;