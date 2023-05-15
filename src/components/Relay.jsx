import 'websocket-polyfill';
import { useEffect, useRef, useState } from 'react';

import './Relay.scss';
import '../variables.scss';
import Nostr from '../Nostr';
import { Messages } from './messages/Messages.jsx';
import { changeRelayName } from '../utils/helpers';
import { cash, pubKeys } from '../utils/options';

export const Relay = ({
  url,
  ind,
  changeLinkSub,
  filterVal,
  showProfiles
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

    if (!pubKeys[url]) {
      pubKeys[url] = [];
    }

    if (pubKeys[url].length >= 5) {
      subscribeToKind(changeRelayName(url), [
        {
          kinds: [0],
          authors: [...pubKeys[url]],
        },
      ]);
      pubKeys[url].length = 0;
    }
  }, [messages]);

  const addMessage = (data, relayUrl) => {
    setMessages([data, ...ubiStateRef.current]);
    const cashData = cash.get(relayUrl);

    if (cashData) {
      if (
        data.kind !== 0 &&
        !cash.get(relayUrl).get(data.pubkey) &&
        !pubKeys[relayUrl].includes(data.pubkey)
      ) {
        pubKeys[relayUrl].push(data.pubkey);
      }
    } else {
      if (data.kind !== 0 && !pubKeys[relayUrl].includes(data.pubkey)) {
        pubKeys[relayUrl].push(data.pubkey);
      }
    }
  };

  const connectToRelay = (data, callback) => {
    Nostr.addRelay(changeRelayName(data), callback);
    Nostr.connectRelay(changeRelayName(data));
  };

  const subscribeToRelay = (relayUrl, filter) => {
    return Nostr.subscribe(changeRelayName(relayUrl), filter, (data) =>
      addMessage(data, changeRelayName(relayUrl)),
    );
  };

  const saveDataAuthors = (data, relayUrl) => {
    const cashByUrl = cash.get(relayUrl);

    if (cashByUrl) {
      if (cashByUrl.size >= 1000) {
        cashByUrl.clear();
      }
      cashByUrl.set(data.pubkey, data.content);
    } else {
      let authorData = new Map();
      authorData.set(data.pubkey, data.content);
      cash.set(relayUrl, authorData);
    }
  };

  const subscribeToKind = (relayUrl, filter) => {
    const url = changeRelayName(relayUrl);
    return Nostr.getAuthors(url, filter, (data) => saveDataAuthors(data, url));
  };

  return (
    <div className="relay--container">
      <br />
      <div id="messages" className="relay--container__messages">
        {messages.map((message) => (
          <div className="messages" key={ind + message.id + ind}>
            <Messages message={message} showProfiles={showProfiles}/>
          </div>
        ))}
      </div>
    </div>
  );
};
