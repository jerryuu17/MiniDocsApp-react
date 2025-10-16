import React, { useRef, useState } from 'react';
import Card from './Card';
import TodoCard from './TodoCard';
import { FaPlus, FaFileUpload, FaTasks } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function Foreground({ cards, onDeleteCard, onDownloadCard, openDocModal, openTodoModal }) {
  const ref = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* This is the draggable area for the cards */}
      <div ref={ref} className="fixed top-0 left-0 z-[3] w-full h-screen flex gap-10 flex-wrap p-5">
        {cards.map((item) => (
          item.type === 'doc' ? (
            <Card
              key={item.id}
              data={item}
              reference={ref}
              onDelete={onDeleteCard}
              onDownload={onDownloadCard}
            />
          ) : (
            <TodoCard
              key={item.id}
              data={item}
              reference={ref}
              onDelete={onDeleteCard}
            />
          )
        ))}
      </div>

      {/* Floating Action Button Menu */}
      <div className="fixed bottom-10 right-10 z-[5]">
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="flex flex-col items-center gap-4 mb-4"
            >
              <button
                onClick={() => { openDocModal(); setIsMenuOpen(false); }}
                className="w-14 h-14 bg-sky-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-sky-600 transition-all"
                aria-label="Add Document"
              >
                <FaFileUpload size={20} />
              </button>
              <button
                onClick={() => { openTodoModal(); setIsMenuOpen(false); }}
                className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-all"
                aria-label="Add To-Do List"
              >
                <FaTasks size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-blue-700"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isMenuOpen ? 45 : 0 }}
          aria-label="Toggle Menu"
        >
          <FaPlus size={24} />
        </motion.button>
      </div>
    </>
  );
}

export default Foreground;
