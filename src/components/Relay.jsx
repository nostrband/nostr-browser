import 'websocket-polyfill';
import { useEffect, useRef, useState } from 'react';

import './Relay.scss';
import '../variables.scss';
import Nostr from '../Nostr';
import { Messages } from './messages/Messages.jsx';
import { changeRelayName } from '../utils/helpers';
import { cash, pubKeys } from '../utils/options';

export const Relay = ({ url, ind, changeLinkSub, filterVal, showProfiles }) => {
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

    if (pubKeys.length >= 5) {
      subscribeToKind('relay.nostr.band', [
        {
          kinds: [0],
          authors: [...pubKeys],
        },
      ]);
      pubKeys.length = 0;
    }
  }, [messages]);

  const addMessage = (data) => {
    setMessages([data, ...ubiStateRef.current]);

    if (
      data.kind !== 0 &&
      !cash.get(data.pubkey) &&
      !pubKeys.includes(data.pubkey)
    ) {
      pubKeys.push(data.pubkey);
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

  const saveDataAuthors = (data) => {
    const { pubkey, content } = data;
    const cashByPubkey = cash.get(pubkey);

    if (!cashByPubkey) {
      if (cash.size >= 1000) {
        const keys = [...cash.keys()];
        const keysForDelete = keys.splice(0, 20);

        keysForDelete.forEach((item) => {
          cash.delete(item);
        });
      }
      cash.set(pubkey, content);
    }
  };

  const subscribeToKind = (relayUrl, filter) => {
    return Nostr.getAuthors(relayUrl, filter, (data) => saveDataAuthors(data));
  };

  return (
    <div className="relay--container">
      <br />
      <div id="messages" className="relay--container__messages">
        {messages.map((message) => (
          <div className="messages" key={ind + message.id + ind}>
            <Messages message={message} showProfiles={showProfiles} />
          </div>
        ))}
      </div>
    </div>
  );
};
