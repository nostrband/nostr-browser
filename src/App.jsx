import React, {useEffect, useRef, useState} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {defaultGetAuthorsRelayUrl, options} from './utils/options';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.scss';
import './variables.scss';
import {AddTabModal} from './components/AddTabModal.jsx';
import AddTabForm from './components/AddTabForm.jsx';
import {Tabs} from './components/Tabs/Tabs';
import Nostr from './Nostr';
import ScrolltoTop from './components/ScrolltoTop';
import {changeRelayName, getRandomInt} from './utils/helpers';
import {FilterModal} from './components/FilterModal.jsx';
import UpdateFilterForm from './components/UpdateFilterForm.jsx';
import {SettingsModal} from "./components/SettingsModal";
import SettingsForm from "./components/SettingsForm";

const LIGHT = 'light';
const DARK = 'dark';
const WRONG_DATA = 'Wrong data!';

function App() {
    const [isOpenAddTabModal, setIsOpenAddTabModal] = useState(false);
    const [isOpenFilterModal, setIsOpenFilterModal] = useState(false);
    const [isOpenSettingModal, setIsOpenSettingModal] = useState(false);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [linkSub, setLinkSub] = useState({});
    const [filterModelIndex, setFilterModelIndex] = useState(null);
    const [showProfiles, setShowProfiles] = useState(false);
    const [theme, setTheme] = useState(LIGHT);
    const [tabs, setTabs] = useState([{url: defaultGetAuthorsRelayUrl, index: 0, filter: options[3]}]);
    const [getAuthorsRelayUrl, setGetAuthorsRelayUrl] = useState(defaultGetAuthorsRelayUrl);
    const ubiStateRef = useRef();

    useEffect(() => {
        ubiStateRef.current = tabs;
    }, [tabs]);

    const openAddTabModal = () => setIsOpenAddTabModal(true);
    const closeAddTabModal = () => setIsOpenAddTabModal(false);
    
    const onopenFilterModal = (index) => {
        console.log('he denis', index)
    };

    const openFilterModal = (index) => {
        setFilterModelIndex(index);
        setIsOpenFilterModal(true);
    };

    const closeFilterModal = () => {
        setIsOpenFilterModal(false);
    }

    const openSettingModal = () => setIsOpenSettingModal(true);
    const closeSettingModal = () => setIsOpenSettingModal(false);

    const changeActiveTab = (ind) => {
        setActiveTabIndex(ind);
    };

    const changeLinkSub = (sub, ind) => {
        linkSub[ind] = sub;
        setLinkSub(linkSub);
    };

    const toggleShowProfile = () => {
        setShowProfiles(!showProfiles);
    }

    const toggleTheme = () => {
        const newTheme = theme === LIGHT ? DARK : LIGHT;
        setTheme(newTheme);
        document.body.setAttribute('data-bs-theme', newTheme);
    };

    const updateFilter = (data, ind) => {
        const newFilter = data.filterSelect ? data.filterSelect : data.filterInput;
        if (JSON.parse(newFilter)) {
            changeFilter(newFilter, ind);
        } else {
            notify(WRONG_DATA);
        }
    };

    const updateSettings = (data) => {
        if (data.authorRelayUrl && data.authorRelayUrl !== '') {
            if (!Nostr.relays.has(data.url)) {
                connectToRelay(data.authorRelayUrl, () => setGetAuthorsRelayUrl(changeRelayName(data.authorRelayUrl)));
            }
        }
    };

    const isConnectedSuccess = (data) => {
        const elementIndex = getRandomInt();
        const newFilter = data.filterSelect ? data.filterSelect : data.filterInput;
        if (JSON.parse(newFilter)) {
            data.index = elementIndex;
            data.filter = newFilter;
            tabs.push(data);
            setTabs([...tabs]);
            changeActiveTab(elementIndex);
            changeLinkSub(null, elementIndex);
        } else {
            notify(WRONG_DATA);
        }
    };

    const connectToRelay = (data, callback) => {
        Nostr.addRelay(changeRelayName(data), callback);
        Nostr.connectRelay(changeRelayName(data));
    };

    const addTab = (data) => {
        data.url = changeRelayName(data.url);
        if (Nostr.relays.has(data.url)) {
            isConnectedSuccess(data);
        } else {
            connectToRelay(data.url, () => isConnectedSuccess(data));
        }
    };

    const closeTab = (value) => {
        const index = tabs.findIndex((item) => item.index === value);
        unsubscribe(value);

        if (value === activeTabIndex && index !== 0) {
            changeActiveTab(tabs[index - 1].index);
        }

        if (value === activeTabIndex && index === 0 && tabs.length > 1) {
            changeActiveTab(tabs[index + 1].index);
        }

        const changeTabs = tabs.filter((_, ind) => ind !== index);
        setTabs(changeTabs);
    };

    const unsubscribe = (value) => {
        const item = tabs.find((item) => item.index === value);
        linkSub[value].unsub();

        const relay = changeRelayName(item.url);
        Nostr.subscriptions.get(relay).delete(item.filter);
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
            theme: LIGHT,
        });
    };

    const changeFilter = (newFilter, ind) => {
        const updatedTabs = tabs.map((item) => {
            if (item.index === ind) {
                let oldFilter = item.filter;
                item.filter = newFilter;
                if (
                    newFilter.startsWith('{"kinds":[') ||
                    (newFilter.startsWith('{"kinds": [') && newFilter.endsWith('}'))
                ) {
                    if (oldFilter !== newFilter) {
                        unsubscribe(ind, item.url);
                    }
                } else {
                    notify(WRONG_DATA);
                }

                return item;
            }
            return item;
        });

        setTabs([...updatedTabs]);
    };

    return (
        <div className="App">
            <div className="header-buttons custom-container  d-flex justify-content-between">
                <button className="btn btn-primary main--button" onClick={openAddTabModal}>
                    Add relay
                </button>
                
                <button
                    className={theme === DARK ? 'btn btn-dark changeMode--button' : 'btn btn-light changeMode--button'  }
                    onClick={toggleTheme}
                >
                    {theme === DARK ? (
                        <i className="bi bi-moon"/>
                    ) : (
                        <i className="bi bi-brightness-high"/>
                    )}
                </button>
                <button className="btn btn-primary settings--button" onClick={openSettingModal}>
                    <i className="bi bi-gear"></i>
                </button>
                <div className="form-check showProfile--checkbox">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                           onClick={toggleShowProfile}></input>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Show profiles
                    </label>
                </div>
            </div>
            <Tabs
                active={activeTabIndex}
                changeActiveTab={changeActiveTab}
                closeTab={closeTab}
                changeLinkSub={changeLinkSub}
                tabs={tabs}
                openFilterModal={openFilterModal}
                showProfiles={showProfiles}
                getAuthorsRelayUrl={getAuthorsRelayUrl}
                onopenFilterModal = {onopenFilterModal}
            />

            {isOpenAddTabModal ? (
                <AddTabModal activeModal={isOpenAddTabModal} setActive={closeAddTabModal}>
                    <AddTabForm setActive={closeAddTabModal} onSubmit={addTab}/>
                </AddTabModal>
            ) : null}

            {isOpenFilterModal ? (
                <FilterModal activeModal={isOpenFilterModal} setActive={closeFilterModal}>
                    <UpdateFilterForm setActive={closeFilterModal} onSubmit={updateFilter} index={filterModelIndex}/>
                </FilterModal>
            ) : null}

            {isOpenSettingModal ? (
                <SettingsModal activeModal={isOpenSettingModal} setActive={closeSettingModal}>
                    <SettingsForm setActive={closeSettingModal} onSubmit={updateSettings}/>
                </SettingsModal>
            ) : null}

            <ToastContainer/>
            <ScrolltoTop/>
            
        </div>
    );
}

export default App;
 