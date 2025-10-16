// src/components/Foreground.jsx

import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid to generate unique IDs
import Card from './Card';
import AddCardModal from './AddCardModal'; // Import the new modal component
import { FaPlus, FaFileUpload, FaTasks } from 'react-icons/fa'; // Icons for our new button
import { motion, AnimatePresence } from 'framer-motion';

// Your initial data, now with unique IDs
const initialData = [
  {
    id: uuidv4(),
    desc: 'This is my Practice project of React.js in which I made cards',
    filesize: '.4mb',
    close: true,
    tag: { isOpen: false, tagTitle: 'Download Now', tagColor: 'green' },
  },
  {
    id: uuidv4(),
    desc: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
    filesize: '.9mb',
    close: false,
    tag: { isOpen: true, tagTitle: 'Download Now', tagColor: 'sky' },
  },
  {
    id: uuidv4(),
    desc: 'This is the background color of the card that will be displayed',
    filesize: '200kb',
    close: true,
    tag: { isOpen: true, tagTitle: 'Upload', tagColor: 'green' },
  },
];

function Foreground() {
  const ref = useRef(null);
  
  // State for managing all the document cards
  const [docs, setDocs] = useState(initialData);
  // State to control the visibility of the "Add Card" modal
  const [isModalOpen, setIsModalOpen] = useState(false);
   // State to control the floating action button (FAB) menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to add a new card to the state
  const handleAddCard = (newCardData) => {
    const newCard = {
      id: uuidv4(), // Assign a new unique ID
      ...newCardData,
    };
    setDocs([...docs, newCard]); // Add the new card to the existing array of docs
  };

  // Function to delete a card by its ID
  const handleDeleteCard = (id) => {
    setDocs(docs.filter((doc) => doc.id !== id));
  };
  
  // Function to simulate a file download
  const handleDownload = (doc) => {
    // In a real app, you would trigger a file download here.
    // For now, we'll just log it to the console.
    alert(`Simulating download for: "${doc.desc}" (${doc.filesize})`);
    console.log("Downloading:", doc);
  };

  return (
    <>
      <div ref={ref} className="fixed top-0 left-0 z-[3] w-full h-screen flex gap-10 flex-wrap p-5 ">
        {docs.map((item) => (
          <Card 
            key={item.id} // Add a unique key for React's rendering
            data={item} 
            reference={ref}
            onDelete={handleDeleteCard} // Pass the delete function
            onDownload={handleDownload} // Pass the download function
          />
        ))}
      </div>

      {/* Floating Action Button (FAB) Menu */}
      <div className="fixed bottom-10 right-10 z-[5]">
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="flex flex-col items-center gap-4 mb-4"
            >
              <button onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }} className="w-14 h-14 bg-sky-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-sky-600 transition-all">
                <FaFileUpload size={20} />
              </button>
              <button onClick={() => alert("To-Do list functionality can be added here!")} className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-all">
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
        >
          <FaPlus size={24} />
        </motion.button>
      </div>

      {/* Conditionally render the modal */}
      <AnimatePresence>
        {isModalOpen && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
           >
            <AddCardModal 
              onAdd={handleAddCard} 
              onClose={() => setIsModalOpen(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Foreground;