import { useEffect, useRef, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './Relay.scss';
import Nostr from '../Nostr';

import 'websocket-polyfill';

export const Relay = ({ changeMessages, ind, tabsData }) => {
  const [messages, setMessages] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [filterInputValue, setFilterInputValue] = useState('');
  const [options, setOptions] = useState([
    '{"kinds": [0], "limit": 1}',
    '{"kinds": [30023]}',
    '{"kinds": [9735]}',
  ]);

  const [defaultOption, setDefaultOption] = useState('');

  const onPredefinedSelect = (data) => {
    setFilterValue(data.value);
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

  const addMessage = (data) => {
    setMessages([data, ...ubiStateRef.current]);
    changeMessages(ind, [data, ...ubiStateRef.current]);
  };

  const updateFilter = () => {
    setFilterValue(filterInputValue);
    setFilterInputValue('');
    setOptions([...ubiStateRef.current2, filterInputValue]);
    setDefaultOption(filterInputValue);
    connectToRelay('relay.nostr.band');
    subscribeToRelay('relay.nostr.band', [{ kinds: [1] }]);
  };
  const connectToRelay = (data) => {
    Nostr.addRelay(data);
    Nostr.connectRelay(data);
  };

  const subscribeToRelay = (relayUrl, filter) => {
    Nostr.subscribe(relayUrl, filter, (data) => addMessage(data));
  };

  return (
    <div  className = 'relay--container' style={{ marginTop: 20 }}>
      <h1>{filterValue}</h1>
      <br />
      <label>
        Filter:
        <input className='relay--container__input'
          type="text"
          value={filterInputValue}
          onChange={(e) => setFilterInputValue(e.target.value)}
        />
        <Dropdown
          options = {options}
          onChange={onPredefinedSelect}
          value={defaultOption}
          placeholder ="Select an option"
        />
        <button className = 'relay--buttonFilter' onClick={updateFilter}>update filter</button>
      </label>
      {
        <div id="messages">
          {tabsData[ind] &&
            tabsData[ind].map((message) => (
              <div key={message.id}>{JSON.stringify(message)}</div>
            ))}
        </div>
      }
    </div>
  );
};
