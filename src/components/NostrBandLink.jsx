import React from 'react';
import './NostrBandLink.scss';

export const NostrBandLink = ({ postfix, value }) => {
  return (
    <a
      className="card-link"
      href={'https://nostr.band/' + postfix}
      target="_blank"
      rel="noreferrer"
    >
      {value}
    </a>
  ); 
};
