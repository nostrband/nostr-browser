import React, { useState } from 'react';
import './App.css';
import { TabPage } from './components/TabPage';
import { Modal } from './components/Modal';
import GetForm from './components/Form';

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
      <button onClick={openModal} style={{ marginBottom: 20 }}>
        Press me
      </button>
      <TabPage data={tabs} />
      <Modal activeModal={isOpen} setActive={closeModal}>
        <GetForm setActive={closeModal} onSubmit={addTab} />
      </Modal>
    </div>
  );
}

export default App;
