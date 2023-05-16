import { useEffect, useRef, useState } from 'react';
import 'websocket-polyfill';

import Nostr from '../Nostr';
import { changeRelayName } from '../utils/helpers';
import { authorsRelayUrl, cash, pubKeys } from '../utils/options';
import '../variables.scss';
import './Relay.scss';
import { Messages } from './messages/Messages.jsx';

export const Relay = ({ url, ind, changeLinkSub, filterVal, showProfiles }) => {
  const [messages, setMessages] = useState([]);
  const ubiStateRef = useRef();

  useEffect(() => {
    connectToRelay(changeRelayName(url), () => {});
    const sub = subscribeToRelay(changeRelayName(url), [JSON.parse(filterVal)]);
    changeLinkSub(sub, ind);

    if (messages.length > 0) {
      setMessages([]);
    }
  }, [filterVal]);

  useEffect(() => {
    ubiStateRef.current = messages;

    if (!Nostr.subscriptions.get(url).get(`${url} auth`)) {
      if (pubKeys[url] && pubKeys[url].length && showProfiles) {
        const urlForRequest = authorsRelayUrl.auth ? authorsRelayUrl.auth : url;
        const subscribeToKind = (relayUrl) => {
          const keys = pubKeys[url].splice(0, 100);
          const filter = [
            {
              kinds: [0],
              authors: [...keys],
            },
          ];
          return Nostr.getAuthors(relayUrl, filter, (data) =>
            saveDataAuthors(data),
          );
        };
        subscribeToKind(urlForRequest);
      }
    }
  }, [messages, showProfiles, url]);

  const addMessage = (data, url) => {
    setMessages([data, ...ubiStateRef.current]);
    if (!pubKeys[url]) {
      pubKeys[url] = [];
    }

    if (pubKeys[url].length >= 1000) {
      pubKeys[url].splice(0, 100);
    }

    if (
      data.kind !== 0 &&
      !cash.get(data.pubkey) &&
      !pubKeys[url].includes(data.pubkey)
    ) {
      pubKeys[url].push(data.pubkey);
    }
    if (data.kind === 0) {
      saveDataAuthors(data);
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
      if (pubkey) {
        cash.set(pubkey, content);
      }
    }
  };

  return (
    <div className="relay--container">
      <br />
      <div id="messages" className="relay--container__messages">
        {messages.map((message) => (
          <div className="messages" key={ind + message.id + ind + 'messageId'}>
            <Messages message={message} showProfiles={showProfiles} />
          </div>
        ))}
      </div>
    </div>
  );
};
