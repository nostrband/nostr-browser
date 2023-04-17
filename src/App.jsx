import React, { useState } from 'react';
import './App.scss';
import './variables.scss';
import { Modal } from './components/Modal';
import GetForm from './components/Form';
import imgGlobal from './assets/chat.png';
import { Tabs } from './components/Tabs/Tabs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nostr from './Nostr';

function App() {
  const [tabs, setTabs] = useState([{ url: 'relay.nostr.band' }]);
  const [filter, setFilter] = useState([{ kinds: [1], limit: 1 }]);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const connectToRelay = (data) => {
    Nostr.addRelay(data);
    Nostr.connectRelay(data);
  };

  const addTab = (data) => {
    connectToRelay(data.url);
    setTabs([...tabs, data]);
  };

  const addFilter = (value, ind) => {
    if (filter[ind]) {
      filter.splice(ind, 1, JSON.parse(value));
    } else {
      filter.push(JSON.parse(value));
    }
    setFilter([...filter]);
  };

  const changeFilter = (value, ind) => {
    filter.splice(ind, 1, value);
    setFilter([...filter]);
  };

  return (
    <div className="App" style={{ marginTop: 20 }}>
      <div className="App--buttons">
        <button
          className="main--button"
          onClick={openModal}
          style={{ marginBottom: 20 }}
        >
          <img className="app--image" src={imgGlobal} alt="" />
          Press me
        </button>
      </div>
      <div className='app--tabs'>
      <Tabs
        data={tabs}
        setFilter={addFilter}
        filter={filter}
        changeFilter={changeFilter}
      />
      <Modal activeModal={isOpen} setActive={closeModal}>
        <GetForm setActive={closeModal} onSubmit={addTab} />
      </Modal>
      <ToastContainer />
      </div>
    </div>
  );
}

export default App;
