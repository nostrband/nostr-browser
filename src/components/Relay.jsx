import { useEffect, useRef, useState } from 'react';
import Dropdown from 'react-dropdown';
//import 'react-dropdown/style.css';
import './Relay.scss';
import Nostr from '../Nostr';
import '../variables.scss';

import 'websocket-polyfill';

import { toast } from 'react-toastify';

export const Relay = ({ url, setFilter, ind, changeFilter }) => {
  const [messages, setMessages] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [filterInputValue, setFilterInputValue] = useState('');
  const [options, setOptions] = useState([
    '{"kinds": [0], "limit": 1}',
    '{"kinds": [30023], "limit": 1}',
    '{"kinds": [9735], "limit": 1}',
    '{"kinds": [1], "limit": 1}',
    '{"fff": [1]}',
  ]);

  const notify = (message) => {
    toast(message, {
      position: 'top-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };
  const [defaultOption, setDefaultOption] = useState('');

  const onPredefinedSelect = (data) => {
    setFilterInputValue('');
    if (data.value && !options.includes(data.value)) {
      setOptions(
        [...ubiStateRef.current2, data.value].sort((a, b) =>
          a.toUpperCase().localeCompare(b.toUpperCase()),
        ),
      );
      setDefaultOption('');
    }
    setDefaultOption(data.value);
  };

  const ubiStateRef = useRef();

  useEffect(() => {
    ubiStateRef.current = messages;
  }, [messages]);

  useEffect(() => {
    ubiStateRef.current2 = options;
  }, [options]);

  useEffect(() => {
    if (ind === 0) {
      connectToRelay(url);
      subscribeToRelay(url, [{ kinds: [1], limit: 1 }]);
    }
  });
  const addMessage = (data) => {
    setMessages([data, ...ubiStateRef.current]);
  };

  const updateInputFilter = (data) => {
    setFilterInputValue(data);
    setDefaultOption('');
  };

  const updateFilter = () => {
    const newFilter = defaultOption ? defaultOption : filterInputValue;

    if (filterValue === newFilter) {
      setFilterInputValue('');
      setDefaultOption('');
      return;
    }
    setMessages([]);

    setFilterValue(newFilter);
    setFilterInputValue('');
    if (!options.includes(newFilter)) {
      setOptions(
        [...ubiStateRef.current2, newFilter].sort((a, b) =>
          a.toUpperCase().localeCompare(b.toUpperCase()),
        ),
      );
    }
    setDefaultOption('');

    if (newFilter.startsWith('{') && newFilter.endsWith('}')) {
      subscribeToRelay(url, [JSON.parse(newFilter)]);
      setFilter(newFilter, ind);
    } else {
      notify('Wrong data!');
      changeFilter(null, ind);
    }
  };

  const connectToRelay = (data) => {
    Nostr.addRelay(data);
    Nostr.connectRelay(data);
  };

  const subscribeToRelay = (relayUrl, filter) => {
    Nostr.subscribe(relayUrl, filter, (data) => addMessage(data));
  };

  return (
    <div className="relay--container" style={{ marginTop: 20 }}>
      <br />
      <label className="relay--container__label">
        Filter:
        <input
          className="relay--container__input"
          type="text"
          value={filterInputValue}
          onChange={(e) => updateInputFilter(e.target.value)}
        />
        <Dropdown
          options={options}
          onChange={onPredefinedSelect}
          value={defaultOption}
          placeholder="Select an option"
        />
        <button className="relay--buttonFilter" onClick={updateFilter}>
          {' '}
          update filter
        </button>
      </label>
      {
        <div id="messages">
          {messages.map((message) => (
            <div key={message.id}>{JSON.stringify(message)}</div>
          ))}
        </div>
      }
    </div>
  );
};
