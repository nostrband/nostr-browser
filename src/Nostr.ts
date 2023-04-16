import { Relay, relayInit, Sub } from 'nostr-tools';
import { toast } from 'react-toastify';

const DEFAULT_RELAYS = [];
const URL_PREFIX = 'wss://';

let defaultRelays = new Map<string, Relay>(
  DEFAULT_RELAYS.map((url) => [url, relayInit(URL_PREFIX + url)]),
);

const Nostr = {
  relays: defaultRelays,
  subscriptions: new Map<string, Map<string, Sub>>(),
  connected: false,

  notify(message: string) {
    toast(message, {
      position: 'top-left',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  },

  addRelay(url: string) {
    let relay = this.relays.get(url);

    if (relay) {
      return relay;
    }
    relay = relayInit(URL_PREFIX + url);

    relay.on('notice', (notice) => {
      if (notice.includes('rejected: ')) {
        this.notify(`${notice}`);
      }
      console.log('notice from ', relay.url, notice);
    });

    relay.on('connect', () => {
      console.log(`connected to ${relay.url}`);
    });

    relay.on('error', () => {
      this.notify(`Can't connected to relay with ${url}!`);
      console.log(`failed to connect to ${relay.url}`);
    });

    this.relays.set(url, relay);
  },

  subscribe(url: string, filter: [], callback) {
    const relay = this.relays.get(url);

    if (!relay) return;

    const filterMap = this.subscriptions.get(url);
    if (!filterMap)
      return this.addNewSubscription(relay, url, filter, callback);

    let sub = filterMap.get(this.toString(filter));
    if (!sub) return this.addNewSubscription(relay, url, filter, callback);

    return sub;
  },

  addNewSubscription(relay: Relay, url: string, filter: [], callback) {
    const sub = relay.sub(filter);
    sub.on('event', (event) => {
      callback(event);
    });

    if (this.subscriptions.get(url)) {
      this.subscriptions.get(url).set(this.toString(filter), sub);
    } else {
      let subs = new Map<string, Sub>();
      subs.set(this.toString(filter), sub);
      this.subscriptions.set(url, subs);
    }

    return sub;
  },

  connectRelay: function (url: string) {
    let relay = this.relays.get(url);
    if (!relay) return;
    try {
      if (relay.status === 3) {
        relay.connect();
      }
    } catch (e) {
      console.log(e);
    }
  },

  toString(obj: any) {
    return JSON.stringify(obj);
  },
};

export default Nostr;
