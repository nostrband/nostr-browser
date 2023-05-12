import 'websocket-polyfill';
import { useEffect, useRef, useState } from 'react';

import './Relay.scss';
import '../variables.scss';
import Nostr from '../Nostr';
import { Messages } from './messages/Messages.jsx';
import { changeRelayName } from '../utils/helpers';

export const Relay = ({
  url,
  ind,
  changeFilter,
  filter,
  unsubscribe,
  changeLinkSub,
  filterVal,
}) => {
  const [messages, setMessages] = useState([]);

  const ubiStateRef = useRef();

  useEffect(() => {
    if (ind === 0) {
      connectToRelay(changeRelayName(url), () => {});
      const sub = subscribeToRelay(changeRelayName(url), [
        JSON.parse(filterVal),
      ]);
      changeLinkSub(sub, ind);
    }
    if (ind !== 0 && filterVal && filterVal !== '') {
      connectToRelay(changeRelayName(url), () => {});
      const sub = subscribeToRelay(changeRelayName(url), [
        JSON.parse(filterVal),
      ]);
      changeLinkSub(sub, ind);
    }
    setMessages([]);
  }, [filterVal]);

  useEffect(() => {
    ubiStateRef.current = messages;
  }, [messages]);

  const addMessage = (data) => {
    setMessages([data, ...ubiStateRef.current]);
  };

  const connectToRelay = (data, callback) => {
    Nostr.addRelay(changeRelayName(data), callback);
    Nostr.connectRelay(changeRelayName(data));
  };

  const subscribeToRelay = (relayUrl, filter) => {
    return Nostr.subscribe(changeRelayName(relayUrl), filter, (data) =>
      addMessage(data),
    );
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
