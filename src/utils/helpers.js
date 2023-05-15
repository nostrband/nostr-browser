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
    return changeRelay;
  }

  changeRelay = relay;

  return changeRelay;
}
