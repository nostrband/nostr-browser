import React, { useState } from 'react';
import './App.scss';
import './variables.scss';
import { Modal } from './components/Modal';
import GetForm from './components/Form';
import imgGlobal from './assets/chat.png';
import { Tabs } from './components/Tabs/Tabs';
import { Relay } from './components/Relay';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nostr from './Nostr';
import ScrolltoTop from './components/ScrolltoTop';

function App() {

  const [filter, setFilter] = useState([{ kinds: [1], limit: 1 }]);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [linkSub, setLinkSub] = useState([]);

  const changeActiveTab = (ind) => {
    setActive(ind);
  };

  const addFirstLinkSub = () => {
    linkSub.push(null);
    setLinkSub(linkSub);
  };

  const changeLinkSub = (sub, ind) => {
    linkSub.splice(ind, 1, sub);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const isConnectedSuccess = (data) => {
      console.log(1111)
      console.log(data)
      console.log(22222)
    const eee = tabs.length;

      data.relay = <Relay ind={eee}
                          url={'relay.nostr.band'}
                          setFilter={addFilter}
                          changeFilter={changeFilter}
                          unsubscribe={unsubscribe}
                          changeLinkSub={changeLinkSub}/>

      console.log(333)
      console.log(data)
      console.log(444)
    data.index = eee;

    setTabs([...tabs, data]);
    const index = active + 1;
    filter.push(null);
    addFirstLinkSub();
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

  const unsubscribe = (value) => {
      /*console.log(999899, value)
    linkSub[value].unsub();
    const newLink = linkSub.filter((_, ind) => ind !== value);
    setLinkSub(newLink);
    Nostr.subscriptions
      .get(tabs[value].url)
      .delete(JSON.stringify([filter[value]]));*/
  };

  const closeTab = (value) => {
    if (filter[value]) {
      unsubscribe(value);
    }
    console.log(value, "   ", 989898989898998)
    const changeTabs = tabs.filter((_, ind) => ind !== value);
    const changeFilters = filter.filter((_, ind) => ind !== value);
    if (value <= active) {
      changeActiveTab(active - 1);
    }
    console.log(changeTabs, "   ", 4565656565656)

    setTabs(changeTabs);
    setFilter(changeFilters);
  };

  const [tabs, setTabs] = useState([{
        url: 'relay.nostr.band', relay: <Relay
            ind={0}
            url={'relay.nostr.band'}
            setFilter={addFilter}
            filter={filter}
            changeFilter={changeFilter}
            unsubscribe={unsubscribe}
            changeLinkSub={changeLinkSub}/>,
    index: 0
    }]);

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
          closeTab={closeTab}
          unsubscribe={unsubscribe}
          changeLinkSub={changeLinkSub}
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
