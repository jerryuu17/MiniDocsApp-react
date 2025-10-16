// src/components/AddCardModal.jsx

import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

function AddCardModal({ onAdd, onClose }) {
  // State to hold the form data for the new card
  const [desc, setDesc] = useState('');
  const [filesize, setFilesize] = useState('');
  const [tagTitle, setTagTitle] = useState('Download Now');
  const [tagColor, setTagColor] = useState('sky');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh on form submission
    if (!desc.trim() || !filesize.trim()) {
      alert('Description and file size are required.');
      return;
    }

    // Call the onAdd function passed from Foreground with the new card data
    onAdd({
      desc,
      filesize,
      close: true, // New cards should be closable
      tag: {
        isOpen: true,
        tagTitle,
        tagColor,
      },
    });

    onClose(); // Close the modal after adding the card
  };

  return (
    // Modal background overlay
    <div className="fixed inset-0 bg-black/70 z-[4] flex items-center justify-center">
      {/* Modal content */}
      <div className="relative w-full max-w-md bg-zinc-800 rounded-lg p-8">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white">
          <IoClose size={24} />
        </button>
        <h2 className="text-2xl font-bold text-white mb-6">Add New Document</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="desc" className="block text-sm font-medium text-zinc-300 mb-1">
              Description
            </label>
            <textarea
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full bg-zinc-700 text-white rounded-md p-2 focus:ring-2 focus:ring-sky-500 border-none outline-none"
              rows="3"
              placeholder="Enter document description..."
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="filesize" className="block text-sm font-medium text-zinc-300 mb-1">
              File Size
            </label>
            <input
              type="text"
              id="filesize"
              value={filesize}
              onChange={(e) => setFilesize(e.target.value)}
              className="w-full bg-zinc-700 text-white rounded-md p-2 focus:ring-2 focus:ring-sky-500 border-none outline-none"
              placeholder="e.g., .5mb, 200kb"
              required
            />
          </div>
           <div>
            <label htmlFor="tagTitle" className="block text-sm font-medium text-zinc-300 mb-1">
              Button Text
            </label>
            <input
              type="text"
              id="tagTitle"
              value={tagTitle}
              onChange={(e) => setTagTitle(e.target.value)}
              className="w-full bg-zinc-700 text-white rounded-md p-2 focus:ring-2 focus:ring-sky-500 border-none outline-none"
              placeholder="e.g., Download Now, Upload"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Button Color</label>
            <div className="flex items-center gap-x-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="tagColor"
                  value="sky"
                  checked={tagColor === 'sky'}
                  onChange={(e) => setTagColor(e.target.value)}
                  className="form-radio h-4 w-4 text-sky-600 bg-zinc-700 border-zinc-600 focus:ring-sky-500"
                />
                <span className="px-3 py-1 text-sm rounded-full bg-sky-600 text-white">Sky Blue</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="tagColor"
                  value="green"
                  checked={tagColor === 'green'}
                  onChange={(e) => setTagColor(e.target.value)}
                  className="form-radio h-4 w-4 text-green-600 bg-zinc-700 border-zinc-600 focus:ring-green-500"
                />
                <span className="px-3 py-1 text-sm rounded-full bg-green-600 text-white">Green</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
          >
            Create Card
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCardModal;