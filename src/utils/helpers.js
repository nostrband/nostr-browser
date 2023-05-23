import { cash } from './options';

export function getRandomInt() {
  return Math.floor(Math.random() * 1000);
}

export function changeRelayName(relay) {
  let changeRelay;

  if (relay.startsWith('wss://')) {
    changeRelay = relay.slice(6, relay.length);
    return changeRelay;
  }

  if (relay.startsWith('ws://')) {
    changeRelay = relay.slice(5, relay.length);
    return;
  }

  changeRelay = relay;

  return changeRelay;
}

export const getAuthorData = (message) => {
  const data = cash.get(message.pubkey);
  

  if (data) {
    const { name, display_name, picture } = JSON.parse(data);
    return { name: name || display_name, picture };
  }

  return {
    name: 'loading...',
    picture:
      'https://abrakadabra.fun/uploads/posts/2021-12/1640528610_2-abrakadabra-fun-p-serii-chelovek-na-avu-2.jpg',
  };
};
