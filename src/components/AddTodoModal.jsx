// src/components/AddTodoModal.jsx

import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

function AddTodoModal({ onAdd, onClose }) {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState(['']); // Start with one empty item input

  const handleItemChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, '']); // Add a new empty string to the items array
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('A title is required for the to-do list.');
      return;
    }
    // Filter out any empty to-do items before submitting
    const finalItems = items.filter(item => item.trim() !== '');
    
    onAdd({ title, items: finalItems });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[4] flex items-center justify-center">
      <div className="relative w-full max-w-md bg-zinc-800 rounded-lg p-8">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white">
          <IoClose size={24} />
        </button>
        <h2 className="text-2xl font-bold text-white mb-6">Create To-Do List</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-zinc-300 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-700 text-white rounded-md p-2 focus:ring-2 focus:ring-green-500 border-none outline-none"
              placeholder="e.g., Project Tasks"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Items</label>
            {items.map((item, index) => (
              <input
                key={index}
                type="text"
                value={item}
                onChange={(e) => handleItemChange(index, e.target.value)}
                className="w-full bg-zinc-700 text-white rounded-md p-2 mb-2 focus:ring-2 focus:ring-green-500 border-none outline-none"
                placeholder={`To-do item ${index + 1}`}
              />
            ))}
            <button
              type="button"
              onClick={handleAddItem}
              className="w-full text-sm text-green-400 hover:text-green-300 py-1"
            >
              + Add another item
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
          >
            Create List
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTodoModal;