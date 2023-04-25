import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';
import './variables.scss';
import { Modal } from './components/Modal';
import GetForm from './components/Form';
import imgGlobal from './assets/chat.png';
import { Tabs } from './components/Tabs/Tabs';
import { Relay } from './components/Relay';
import Nostr from './Nostr';
import ScrolltoTop from './components/ScrolltoTop';
import { getRandomInt } from './utils/helpers';

function App() {
  const [filter, setFilter] = useState({ 0: '{ kinds: [1], limit: 1 }' });
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [linkSub, setLinkSub] = useState({});

  const changeActiveTab = (ind) => {
    setActive(ind);
  };

  const changeLinkSub = (sub, ind) => {
    linkSub[ind] = sub;
    setLinkSub(linkSub);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const isConnectedSuccess = (data) => {
    const elementIndex = getRandomInt();
    filter[elementIndex] = null;
    setFilter({ ...filter });

    data.relay = (
      <Relay
        ind={elementIndex}
        url={data.url}
        changeFilter={changeFilter}
        unsubscribe={unsubscribe}
        changeLinkSub={changeLinkSub}
        filter={filter}
        tabs={tabs}
      />
    );

    data.index = elementIndex;
    tabs.push(data);
    setTabs([...tabs]);
    changeActiveTab(elementIndex);
    changeLinkSub(null, elementIndex);
  };

  const connectToRelay = (data, callback) => {
    Nostr.addRelay(data, callback);
    Nostr.connectRelay(data);
  };

  const addTab = (data) => {
    if (Nostr.relays.has(data.url)) {
      isConnectedSuccess(data);
    } else {
      connectToRelay(data.url, (data) => isConnectedSuccess(data));
    }
  };

  const changeFilter = (newFilter, ind) => {
    filter[ind] = newFilter;
    setFilter({ ...filter });
  };

  const unsubscribe = (value) => {
    const item = tabs.find((item) => item.index === value);
    linkSub[value].unsub();
    Nostr.subscriptions.get(item.url).delete(JSON.stringify([filter[value]]));
  };

  const closeTab = (value) => {
    const index = tabs.findIndex((item) => item.index === value);

    if (filter[value]) {
      unsubscribe(value);
    }

    const keys = Object.keys(filter);
    const newFilterKeys = keys.filter((key) => +key !== value);
    const newFilters = {};

    newFilterKeys.forEach((key) => {
      newFilters[key] = filter[key];
    });

    if (value === active && index !== 0) {
      changeActiveTab(tabs[index - 1].index);
    }

    if (value === active && index === 0 && tabs.length > 1) {
      changeActiveTab(tabs[index + 1].index);
    }

    const changeTabs = tabs.filter((_, ind) => ind !== index);
    setTabs(changeTabs);
    setFilter({ ...newFilters });
  };

  const [tabs, setTabs] = useState([
    {
      url: 'relay.nostr.band',
      relay: (
        <Relay
          ind={0}
          url={'relay.nostr.band'}
          filter={filter}
          changeFilter={changeFilter}
          unsubscribe={unsubscribe}
          changeLinkSub={changeLinkSub}
        />
      ),
      index: 0,
    },
  ]);

  return (
    <div className="App">
      <button className="main--button" onClick={openModal}>
        <img className="app--image" src={imgGlobal} alt="" />
        Add relay
      </button>
      <div className="app--tabs">
        <Tabs
          filter={filter}
          changeFilter={changeFilter}
          active={active}
          changeActiveTab={changeActiveTab}
          closeTab={closeTab}
          unsubscribe={unsubscribe}
          changeLinkSub={changeLinkSub}
          tabs={tabs}
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
