// src/components/Card.jsx

import React from 'react';
import { FaRegFileAlt } from 'react-icons/fa';
import { LuDownload } from 'react-icons/lu';
import { IoClose } from 'react-icons/io5';
import { motion } from 'framer-motion';

function Card({ data, reference, onDelete, onDownload }) {
  return (
    <motion.div
      drag dragConstraints={reference} whileDrag={{ scale: 1.1, zIndex: 100 }} dragElastic={0.1} dragTransition={{ bounceStiffness: 100, bounceDamping: 30 }}
      className="flex-shrink-0 relative w-60 h-72 rounded-[45px] bg-zinc-900/90 text-white px-8 py-10 overflow-hidden"
    >
      <FaRegFileAlt />
      <p className="text-sm leading-tight mt-5 font-semibold ">{data.desc}</p>
      <div className="footer absolute bottom-0 w-full left-0">
        <div className="flex items-center justify-between px-8 py-3 mb-3">
          <h5> {data.filesize} </h5>
          {/* If data.close is true, render the delete button */}
          {data.close ? (
            <span 
              onClick={() => onDelete(data.id)} // This calls the delete function with the card's unique ID
              className="w-7 h-7 bg-zinc-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-500 transition-colors"
            >
              <IoClose />
            </span>
          ) : (
            <span onClick={() => onDownload(data)} className="w-7 h-7 bg-zinc-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-500 transition-colors">
              <LuDownload size=".8em" color="#fff" />
            </span>
          )}
        </div>
        {data.tag.isOpen && (
          <div className={`tag w-full py-4 ${data.tag.tagColor === 'sky' ? 'bg-sky-600' : 'bg-green-600'} flex items-center justify-center`}>
            <h3 className="text-sm font-semibold">{data.tag.tagTitle}</h3>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Card;