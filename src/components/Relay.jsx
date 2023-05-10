import Dropdown from 'react-dropdown';
import 'websocket-polyfill';
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';

import './Relay.scss';
import '../variables.scss';
import Nostr from '../Nostr';
import { Messages } from './messages/Messages.jsx';
import {options, optionsObj} from '../utils/options';

export const Relay = ({
  url,
  ind,
  changeFilter,
  filter,
  unsubscribe,
  changeLinkSub,
  filterVal
}) => {
  const [messages, setMessages] = useState([]);

  const ubiStateRef = useRef();

  useEffect(() => {
    if (ind === 0) {
      connectToRelay(url, () => {});
      const sub = subscribeToRelay(url, [JSON.parse(filterVal)]);
      changeLinkSub(sub, ind);
    }
    if(ind !== 0 && filterVal && filterVal !== ''){
      connectToRelay(url, () => {});
      const sub = subscribeToRelay(url, [JSON.parse(filterVal)]);
      changeLinkSub(sub, ind);
    }
    setMessages([])
  }, [filterVal]);

  useEffect(() => {
    ubiStateRef.current = messages;
  }, [messages]);

  const addMessage = (data) => {
    setMessages([data, ...ubiStateRef.current]);
  };

  const connectToRelay = (data, callback) => {
    Nostr.addRelay(data, callback);
    Nostr.connectRelay(data);
  };

  const subscribeToRelay = (relayUrl, filter) => {
    return Nostr.subscribe(relayUrl, filter, (data) => addMessage(data));
  };

  return (
    <div className="relay--container">
      <br />
      <div id="messages" className="relay--container__messages">
        {messages.map((message) => (
          <div className="messages" key={ind + message.id + ind}>
            <Messages message={message} />
          </div>
        ))}
      </div>
    </div>
  );
};
