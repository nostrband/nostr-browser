import Dropdown from 'react-dropdown';
import 'websocket-polyfill';
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment'

import './Relay.scss';
import '../variables.scss';
import Nostr from '../Nostr';
import { Messages } from './messages/Messages.jsx';
import { options } from '../utils/options';
import {NostrBandLink} from "./NostrBandLink.jsx";

export const Relay = ({
  url,
  ind,
  changeFilter,
  filter,
  unsubscribe,
  changeLinkSub,
}) => {
  const [messages, setMessages] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [filterInputValue, setFilterInputValue] = useState('');

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

  const [defaultOption, setDefaultOption] = useState('');

  const onPredefinedSelect = (data) => {
    setFilterInputValue('');
    if (data.value && !options.includes(data.value)) {
      options
        .push(data.value)
        .sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase()));
      setDefaultOption('');
    }
    setDefaultOption(data.value);
  };

  const ubiStateRef = useRef();

  useEffect(() => {
    ubiStateRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (ind === 0) {
      connectToRelay(url, () => {});
      const sub = subscribeToRelay(url, [{ kinds: [1], limit: 1 }]);
      changeLinkSub(sub, ind);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      options.push(newFilter);
      options.sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase()));
    }

    setDefaultOption('');

    if (
      newFilter.startsWith('{"kinds":[') ||
      (newFilter.startsWith('{"kinds": [') && newFilter.endsWith('}'))
    ) {
      if (filter[ind] !== null) {
        unsubscribe(ind, url);
      }

      changeFilter(newFilter, ind);
      const sub = subscribeToRelay(url, [JSON.parse(newFilter)]);
      changeLinkSub(sub, ind);
    } else {
      notify('Wrong data!');
      changeFilter(null, ind);
    }
  };

  const connectToRelay = (data, callback) => {
    Nostr.addRelay(data, callback);
    Nostr.connectRelay(data);
  };

  const subscribeToRelay = (relayUrl, filter) => {
    return Nostr.subscribe(relayUrl, filter, (data) => addMessage(data));
  };

  const formatDate = (createdAt) =>{
    return moment(createdAt * 1000).format('YYYY-MM-DD HH:mm:SS')
  }

  return (
    <div className="relay--container">
      <br />
      <div id="messages" className="relay--container__messages">
        {messages.map((message) => (
          <div className="messages" key={ind + message.id + ind}>
            <p className="messageHeader">Kind: {message.kind} CreatedAt: {formatDate(message.created_at)} ({message.created_at})
              Author: <NostrBandLink postfix={Nostr.encodeAuthorPubKey(message.pubkey)} value={message.pubkey}/></p>
            <Messages message={message} />
          </div>
        ))}
      </div>
      <div className="relay--container__filter">
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
      </div>
    </div>
  );
};
