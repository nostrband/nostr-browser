import React, { useEffect, useRef, forwardRef, useState } from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {options, optionsObj} from './utils/options';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './App.scss';
import './variables.scss';
import { Modal } from './components/Modal.jsx';
import GetForm from './components/Form.jsx';
import { Tabs } from './components/Tabs/Tabs';
import { Relay } from './components/Relay';
import Nostr from './Nostr';
import ScrolltoTop from './components/ScrolltoTop';
import { getRandomInt } from './utils/helpers';
import {FilterModal} from "./components/FilterModal.jsx";
import UpdateFilterForm from "./components/UpdateFilterForm.jsx";

function App() {
  const [filter, setFilter] = useState({ 0: '{"kinds": [1], "limit": 1}' });
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [active, setActive] = useState(0);
  const [linkSub, setLinkSub] = useState({});
  const [filterModelIndex, setFilterModelIndex] = useState(null);

  const updateFilter1 = (data, ind) => {
    const newFilter = data.filterSelect ? data.filterSelect : data.filterInput;
    if(JSON.parse(newFilter)){
      changeFilter(newFilter, ind)
    }
  };

  const openFilterModal = (index) => {
    setFilterModelIndex(index)
    setIsOpenFilter(true);
  }
  const closeFilterModal = () => setIsOpenFilter(false);

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
    const newFilter = data.filterSelect ? data.filterSelect : data.filterInput;
    filter[elementIndex] = newFilter;
    setFilter({ ...filter });

    data.relay = (
      <Relay
        ind={elementIndex}
        url={data.url}
        changeFilter={changeFilter}
        unsubscribe={unsubscribe}
        changeLinkSub={changeLinkSub}
        filter={filter}
        filterVal={newFilter}
      />
    );

    data.index = elementIndex;
    data.filter = newFilter;
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

  const getUnSubKey = (value) => {
    const filterUnSub = filter[value];
    const unSubKeyStr = `[${filterUnSub}]`.replace(/\s/g, '');
    return unSubKeyStr;
  };

  const unsubscribe = (value) => {
    console.log(value)
    const item = tabs.find((item) => item.index === value);
    linkSub[value].unsub();

    const unSubKey = getUnSubKey(value);
    Nostr.subscriptions.get(item.url).delete(unSubKey);
  };

  const closeTab = (value) => {
    console.log(value)
    const index = tabs.findIndex((item) => item.index === value);
    console.log(value)
    if (filter[value]) {
      console.log(filter[value])
      console.log("filter[value]")
      unsubscribe(value);
    }

    const keys = Object.keys(filter);
    console.log(keys)
    const newFilterKeys = keys.filter((key) => +key !== value);
    const newFilters = {};
    console.log(newFilterKeys)
    newFilterKeys.forEach((key) => {
      newFilters[key] = filter[key];
    });
    console.log(newFilters)
    if (value === active && index !== 0) {
      changeActiveTab(tabs[index - 1].index);
    }

    if (value === active && index === 0 && tabs.length > 1) {
      changeActiveTab(tabs[index + 1].index);
    }
    console.log(tabs)
    const changeTabs = tabs.filter((_, ind) => ind !== index);
    console.log(changeTabs)
    setTabs(changeTabs);
    setFilter({ ...newFilters });
  };

  const notify = (message) => {
    toast(message, {
      position: 'top-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const changeFilter = (newFilter, ind) => {

    const updatedTabs = tabs.map((item) => {

      if (item.index === ind) {

        item.filter = newFilter;
        item.relay = (
            <Relay
                ind={ind}
                url={item.url}
                changeFilter={changeFilter}
                unsubscribe={unsubscribe}
                changeLinkSub={changeLinkSub}
                filter={filter}
                filterVal={newFilter}
            />
        );

        if (
           newFilter.startsWith('{"kinds":[') ||
            (newFilter.startsWith('{"kinds": [') && newFilter.endsWith('}'))
        ) {

          if (filter[ind] !== null) {
            console.log("unsubscribe")
            unsubscribe(ind, item.url);
          }
        } else {
          notify('Wrong data!');
        }

        return item;
      }
      return item;
    });
    //setTabs(ubiStateRef.current)
    setTabs([...updatedTabs]);
    //setTabs([updatedTabs, ...]);
    filter[ind] = newFilter;
    setFilter({ ...filter });
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
          filterVal={options[3]}
        />
      ),
      index: 0,
      filter: options[3],
    },
  ]);

  const ubiStateRef = useRef();

  useEffect(() => {
    ubiStateRef.current = tabs;
  }, [tabs]);

  return (
    <div className="App">
      <div className="header-buttons">
        <button className="btn btn-primary main--button" onClick={openModal}>Add relay</button>
      </div>
        <Tabs
          active={active}
          changeActiveTab={changeActiveTab}
          closeTab={closeTab}
          unsubscribe={unsubscribe}
          changeLinkSub={changeLinkSub}
          tabs={tabs}
          openFilterModal={openFilterModal}
        />


        {isOpen ? <Modal activeModal={isOpen} setActive={closeModal}>
          <GetForm setActive={closeModal} onSubmit={addTab} />
        </Modal> : null

        }

        {isOpenFilter ? <FilterModal activeModal={isOpenFilter} setActive={closeFilterModal}>
          <UpdateFilterForm setActive={closeFilterModal} onSubmit={updateFilter1} index={filterModelIndex}/>
        </FilterModal> : null
        }

        <ToastContainer />
        <ScrolltoTop />
    </div>
  );
}

export default App;
