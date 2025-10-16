// src/components/TodoCard.jsx

import React from 'react';
import { FaTasks, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

function TodoCard({ data, reference, onDelete }) {
  return (
    <motion.div
      drag dragConstraints={reference} whileDrag={{ scale: 1.1, zIndex: 100 }} dragElastic={0.1} dragTransition={{ bounceStiffness: 100, bounceDamping: 30 }}
      className="flex-shrink-0 relative w-60 h-72 rounded-[45px] bg-zinc-900/90 text-white px-8 py-10 overflow-hidden flex flex-col"
    >
      <div className='flex items-center justify-between'>
        <FaTasks />
        {/* The onClick handler calls the onDelete function passed from Foreground */}
        <span 
          onClick={() => onDelete(data.id)} 
          className='w-7 h-7 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-500 transition-colors'
        >
          <FaTrash size=".8em" />
        </span>
      </div>
      <h3 className="text-lg font-bold mt-4 mb-2">{data.title}</h3>
      <ul className="list-disc list-inside space-y-2 overflow-y-auto pr-2 text-sm">
        {data.items.map((item, index) => (
          <li key={index}>
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default TodoCard;