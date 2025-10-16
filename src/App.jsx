import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';

// --- SVG Icons (to remove external dependencies) ---
const FileIcon = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"></path></svg>;
const DownloadIcon = () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="0.8em" width="0.8em" xmlns="http://www.w3.org/2000/svg"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>;
const CloseIcon = () => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M289.94 256l95.05-95.05a24 24 0 00-33.94-33.94L256 222.06l-95.05-95.05a24 24 0 00-33.94 33.94L222.06 256l-95.05 95.05a24 24 0 1033.94 33.94L256 289.94l95.05 95.05a24 24 0 0033.94-33.94z"></path></svg>;
const TasksIcon = (props) => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M16 128a16 16 0 0116-16h448a16 16 0 0116 16v32a16 16 0 01-16 16H32a16 16 0 01-16-16v-32zm480 128a16 16 0 00-16-16H32a16 16 0 00-16 16v32a16 16 0 0016 16h448a16 16 0 0016-16v-32zm0 160a16 16 0 00-16-16H32a16 16 0 00-16 16v32a16 16 0 0016 16h448a16 16 0 0016-16v-32z"></path></svg>;
const TrashIcon = (props) => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="0.8em" width="0.8em" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M432 32H312l-9.4-18.7A24 24 0 00281.1 0H166.8a23.72 23.72 0 00-21.4 13.3L136 32H16A16 16 0 000 48v32a16 16 0 0016 16h416a16 16 0 0016-16V48a16 16 0 00-16-16zM53.2 467a48 48 0 0047.9 45h245.8a48 48 0 0047.9-45L416 128H32z"></path></svg>;
const PlusIcon = (props) => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>;
const FileUploadIcon = (props) => <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v-32h-32c-17.7 0-32-14.3-32-32V192h32c17.7 0 32-14.3 32-32V96h64v64c0 17.7 14.3 32 32 32h32v96c0 17.7 14.3 32 32 32h-32v32h136c13.3 0 24 10.7 24 24z"></path></svg>;


// --- Component: Background ---
function Background({ isModalOpen }) {
  return (
    <div className={`fixed z-[2] w-full h-screen transition-opacity duration-300 ${isModalOpen ? 'opacity-20' : 'opacity-100'}`}>
      <div className='absolute top-[5%] w-full py-10 flex justify-center text-zinc-600 font-semibold text-xl'>Documents.</div>
      <h1 className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[13vw] leading-none tracking-tighter font-semibold text-zinc-900'>Docs</h1>
    </div>
  );
}

// --- Component: Document Card ---
function Card({ data, reference, onDelete, onDownload }) {
  return (
    <motion.div
      drag dragConstraints={reference} whileDrag={{ scale: 1.1, zIndex: 100 }} dragElastic={0.1} dragTransition={{ bounceStiffness: 100, bounceDamping: 30 }}
      className="flex-shrink-0 relative w-60 h-72 rounded-[45px] bg-zinc-900/90 text-white px-8 py-10 overflow-hidden"
    >
      <FileIcon />
      <p className="text-sm leading-tight mt-5 font-semibold">{data.desc}</p>
      <div className="footer absolute bottom-0 w-full left-0">
        <div className="flex items-center justify-between px-8 py-3 mb-3">
          <h5>{data.filesize}</h5>
          {data.close ? (
            <span onClick={() => onDelete(data.id)} className="w-7 h-7 bg-zinc-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-500 transition-colors">
              <CloseIcon />
            </span>
          ) : (
            <span onClick={() => onDownload(data)} className="w-7 h-7 bg-zinc-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-500 transition-colors">
              <DownloadIcon />
            </span>
          )}
        </div>
        {data.tag.isOpen && (
          <div onClick={() => onDownload(data)} className={`tag w-full py-4 ${data.tag.tagColor === 'sky' ? 'bg-sky-600' : 'bg-green-600'} flex items-center justify-center cursor-pointer`}>
            <h3 className="text-sm font-semibold">{data.tag.tagTitle}</h3>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// --- Component: To-Do Card ---
function TodoCard({ data, reference, onDelete }) {
  return (
    <motion.div
      drag dragConstraints={reference} whileDrag={{ scale: 1.1, zIndex: 100 }} dragElastic={0.1} dragTransition={{ bounceStiffness: 100, bounceDamping: 30 }}
      className="flex-shrink-0 relative w-60 h-72 rounded-[45px] bg-zinc-900/90 text-white px-8 py-10 overflow-hidden flex flex-col"
    >
      <div className='flex items-center justify-between'>
        <TasksIcon />
        <span onClick={() => onDelete(data.id)} className='w-7 h-7 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-500 transition-colors'>
          <TrashIcon />
        </span>
      </div>
      <h3 className="text-lg font-bold mt-4 mb-2">{data.title}</h3>
      <ul className="list-disc list-inside space-y-2 overflow-y-auto pr-2 text-sm">
        {data.items.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </motion.div>
  );
}

// --- Component: Foreground (UI Layer) ---
function Foreground({ cards, onDeleteCard, onDownloadCard, openDocModal, openTodoModal }) {
  const ref = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div ref={ref} className="fixed top-0 left-0 z-[3] w-full h-screen flex gap-10 flex-wrap p-5 pointer-events-none">
        {cards.map((item) => (
          <div key={item.id} className="pointer-events-auto">
            {item.type === 'doc' ? (
              <Card data={item} reference={ref} onDelete={onDeleteCard} onDownload={onDownloadCard} />
            ) : (
              <TodoCard data={item} reference={ref} onDelete={onDeleteCard} />
            )}
          </div>
        ))}
      </div>
      <div className="fixed bottom-10 right-10 z-[5]">
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="flex flex-col items-center gap-4 mb-4">
              <button onClick={() => { openDocModal(); setIsMenuOpen(false); }} className="w-14 h-14 bg-sky-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-sky-600 transition-all" aria-label="Add Document"><FileUploadIcon size={20} /></button>
              <button onClick={() => { openTodoModal(); setIsMenuOpen(false); }} className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-all" aria-label="Add To-Do List"><TasksIcon size={20} /></button>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-blue-700" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} animate={{ rotate: isMenuOpen ? 45 : 0 }} aria-label="Toggle Menu"><PlusIcon size={24} /></motion.button>
      </div>
    </>
  );
}

// --- Component: Add Document Modal (UPDATED with File Upload) ---
function AddCardModal({ onAdd, onClose }) {
  const [desc, setDesc] = useState('');
  const [filesize, setFilesize] = useState('');
  const [tagTitle, setTagTitle] = useState('Download Now');
  const [tagColor, setTagColor] = useState('sky');
  const [isClosable, setIsClosable] = useState(true);
  const [file, setFile] = useState(null); // State to hold the uploaded file

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        setFile(selectedFile);
        // Automatically populate description and filesize from file properties
        setDesc(selectedFile.name);
        const sizeInMB = (selectedFile.size / (1024*1024)).toFixed(2);
        setFilesize(`${sizeInMB} MB`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc.trim()) return alert('Description is required.');
    if (!file) return alert('Please upload a file.');

    onAdd({ desc, filesize, close: isClosable, tag: { isOpen: true, tagTitle, tagColor }, file: file });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} className="relative w-full max-w-md bg-zinc-800 rounded-lg p-8 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white" aria-label="Close"><CloseIcon size={24} /></button>
        <h2 className="text-2xl font-bold text-white mb-6">Add New Document</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="file-upload" className="block text-sm font-medium text-zinc-300 mb-1">Upload File</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-zinc-600 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    <FileUploadIcon className="mx-auto h-12 w-12 text-zinc-500" />
                    <div className="flex text-sm text-zinc-400">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-zinc-700 rounded-md font-medium text-sky-400 hover:text-sky-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-zinc-800 focus-within:ring-sky-500 px-2">
                            <span>Select a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    {file ? (
                        <p className="text-xs text-zinc-500">{file.name}</p>
                    ) : (
                        <p className="text-xs text-zinc-500">PDF, DOCX, JPG, PNG, etc.</p>
                    )}
                </div>
            </div>
          </div>
          <div>
            <label htmlFor="desc" className="block text-sm font-medium text-zinc-300 mb-1">Description</label>
            <input id="desc" type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full bg-zinc-700 text-white rounded-md p-2 focus:ring-2 focus:ring-sky-500 border-none outline-none" placeholder="File name or description..." required/>
          </div>
           <div className="flex items-center">
            <input type="checkbox" id="closable" checked={isClosable} onChange={(e) => setIsClosable(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500" />
            <label htmlFor="closable" className="ml-2 block text-sm text-zinc-300">Show delete (X) button on card</label>
          </div>
          <button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200">Create Card</button>
        </form>
      </motion.div>
    </div>
  );
}

// --- Component: Add To-Do Modal ---
function AddTodoModal({ onAdd, onClose }) {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState(['']);

  const handleItemChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };
  const handleAddItem = () => setItems([...items, '']);
  const handleRemoveItem = (index) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('A title is required.');
    const finalItems = items.filter(item => item.trim() !== '');
    if (finalItems.length === 0) return alert('Please add at least one item.');
    onAdd({ title, items: finalItems });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} className="relative w-full max-w-md bg-zinc-800 rounded-lg p-8 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white" aria-label="Close"><CloseIcon size={24} /></button>
        <h2 className="text-2xl font-bold text-white mb-6">Create To-Do List</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-zinc-300 mb-1">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-zinc-700 text-white rounded-md p-2 focus:ring-2 focus:ring-green-500 border-none outline-none" placeholder="e.g., Project Tasks" required/>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Items</label>
            <div className="max-h-48 overflow-y-auto pr-2">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                        <input type="text" value={item} onChange={(e) => handleItemChange(index, e.target.value)} className="flex-grow bg-zinc-700 text-white rounded-md p-2 focus:ring-2 focus:ring-green-500 border-none outline-none" placeholder={`To-do item ${index + 1}`}/>
                        {items.length > 1 && (<button type="button" onClick={() => handleRemoveItem(index)} className="p-2 text-red-400 hover:text-red-300"><CloseIcon /></button>)}
                    </div>
                ))}
            </div>
            <button type="button" onClick={handleAddItem} className="w-full text-sm text-green-400 hover:text-green-300 py-1 mt-2">+ Add another item</button>
          </div>
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200">Create List</button>
        </form>
      </motion.div>
    </div>
  );
}

// --- Main App Component ---
const initialData = [
  { id: uuidv4(), type: 'doc', desc: 'Welcome! This card has no file, so download is disabled.', filesize: '.4mb', close: true, tag: { isOpen: true, tagTitle: 'No File', tagColor: 'green' }, file: null },
  { id: uuidv4(), type: 'todo', title: 'My First To-Do', items: ['Drag me!', 'Create a new card', 'Delete this list'], },
];

function App() {
  const [cards, setCards] = useState(initialData);
  const [activeModal, setActiveModal] = useState('none');

  const handleAddDoc = (newDocData) => setCards(prev => [...prev, { id: uuidv4(), type: 'doc', ...newDocData }]);
  const handleAddTodo = (newTodoData) => setCards(prev => [...prev, { id: uuidv4(), type: 'todo', ...newTodoData }]);
  const handleDeleteCard = (id) => setCards(prev => prev.filter(card => card.id !== id));
  
  // UPDATED Download Handler
  const handleDownload = (doc) => {
    // Check if there is a file to download
    if (doc.file && doc.file instanceof File) {
        const url = URL.createObjectURL(doc.file);
        const a = document.createElement("a");
        a.href = url;
        a.download = doc.file.name; // Use the original file name for download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } else {
        // Handle cases where there is no file (e.g., manually created cards)
        alert("There is no file associated with this card to download.");
    }
  };

  return (
    <div className='relative w-full h-screen bg-zinc-800 overflow-hidden'>
      <Background isModalOpen={activeModal !== 'none'} />
      <Foreground cards={cards} onDeleteCard={handleDeleteCard} onDownloadCard={handleDownload} openDocModal={() => setActiveModal('doc')} openTodoModal={() => setActiveModal('todo')} />
      <AnimatePresence>
        {activeModal === 'doc' && <AddCardModal onAdd={handleAddDoc} onClose={() => setActiveModal('none')} />}
        {activeModal === 'todo' && <AddTodoModal onAdd={handleAddTodo} onClose={() => setActiveModal('none')} />}
      </AnimatePresence>
    </div>
  );
}

export default App;

