import React, { useState } from 'react';
import './App.scss';
import './variables.scss';
// import { TabPage } from './components/TabPage';
import { Modal } from './components/Modal';
import GetForm from './components/Form';
import imgGlobal from './assets/global.png';
import imgRelay from './assets/chat.png';
import { Tabs } from './components/Tabs/Tabs';

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
      <div className='App--buttons'>
        <button
          className="main--button"
          onClick={openModal}
          style={{ marginBottom: 20 }}
        >
          <img className="app--image" src={imgGlobal} alt="" />
          Press me
        </button>
        <button className="main--button" style={{ marginBottom: 20 }}>
          <img className="app--image" src={imgRelay} alt="" />
          Relays
        </button>
      </div>

      {/* <TabPage data={tabs} /> */}
      <Tabs data={tabs} />
      <Modal activeModal={isOpen} setActive={closeModal}>
        <GetForm setActive={closeModal} onSubmit={addTab} />
      </Modal>
    </div>
  );
}

export default App;
