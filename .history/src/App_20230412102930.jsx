import React, { useState } from 'react';
import './App.scss';
import { TabPage } from './components/TabPage';
import { Modal } from './components/Modal';
import GetForm from './components/Form';
import imgGlobal from './global.png';
import imgRelay from './chat.png';

function App() {
  const [tabs, setTabs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const addTab = (data) => {
    setTabs([...tabs, data]);
  };

  return (
    <div className="App" style={{ marginTop: 20 }}>
      
      <button className = 'main--button' onClick={openModal} style={{ marginBottom: 20 }}>
        <img className = 'app--image' src = {imgGlobal} alt = '' />
        Press me
      </button>
      <button className = 'main--button' style={{ marginBottom: 20 }}>
        <img className = 'app--image' src = {imgRelay} alt = '' />
        Relays
      </button>

      <TabPage data={tabs} />
      <Modal activeModal={isOpen} setActive={closeModal}>
        <GetForm setActive={closeModal} onSubmit={addTab} />
      </Modal>
    </div>
  );
}

export default App;
