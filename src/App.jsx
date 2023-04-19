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
import ScrolltoTop from './components/ScrolltoTop';


function App() {
  const [tabs, setTabs] = useState([{ url: 'relay.nostr.band' }]);
  const [filter, setFilter] = useState([{ kinds: [1], limit: 1 }]);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(0);

  const changeActiveTab = (ind) => {
    setActive(ind);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const isConnectedSuccess = (data) => {
    setTabs([...tabs, data]);
    const index = active + 1;
    filter.push(null);
    setFilter(filter);
    changeActiveTab(index);
  };

  const connectToRelay = (data, callback) => {
    Nostr.addRelay(data, callback);
    Nostr.connectRelay(data);
  };

  const addTab = (data) => {
    if (Nostr.relays.has(data.url)) {
      isConnectedSuccess(data);
    }
    connectToRelay(data.url, (data) => isConnectedSuccess(data));
  };

  const addFilter = (value) => {
    if (filter[active]) {
      filter.splice(active, 1, JSON.parse(value));
    } else {
      filter.push(JSON.parse(value));
    }
    setFilter([...filter]);
  };

  const changeFilter = (value) => {
    filter.splice(active, 1, value);
    setFilter([...filter]);
  };

  return (
    <div className="App">
      <button className="main--button" onClick={openModal}>
        <img className="app--image" src={imgGlobal} alt="" />
        Add relay
      </button>
      <div className="app--tabs">
        <Tabs
          data={tabs}
          setFilter={addFilter}
          filter={filter}
          changeFilter={changeFilter}
          active={active}
          changeActiveTab={changeActiveTab}
        />
        <Modal activeModal={isOpen} setActive={closeModal}>
          <GetForm setActive={closeModal} onSubmit={addTab} />
        </Modal>
        <ToastContainer />
        <ScrolltoTop />
      </div>
      
    </div>
    

  );

}

export default App;
