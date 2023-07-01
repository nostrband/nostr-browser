import React from 'react';
import './MessageFooter.scss';
import Nostr from '../../Nostr.ts';
import moment from 'moment/moment.js';
import { NostrBandLink } from '../NostrBandLink.jsx';
import { getAuthorData } from '../../utils/helpers';

export const MessageHeader = ({ message, showProfiles }) => {
  const formatDate = (createdAt) => {
    return moment(createdAt * 1000).format('YYYY-MM-DD HH:mm:SS');
  };

  const { name, picture } = getAuthorData(message);

  return (
    <>
      {message && (
        <p className="card-header">
<<<<<<< HEAD
          Kind: {message.kind} CreatedAt: {formatDate(message.created_at)} (
          {message.created_at}) <br /> 
          ID: <NostrBandLink postfix = {Nostr.encodeEventId(message.id) } value = {message.id} /> <br />
          Author:
=======
          Kind: {message.kind} CreatedAt: {formatDate(message.created_at)} ({message.created_at}) <br />
          ID: <NostrBandLink postfix={Nostr.encodeEventId(message.id)} value={message.id}/>  <br />
          Author:&nbsp;
>>>>>>> 6eebf8e31a978bb2302a1e7a2f056abc6e4ff148
          {showProfiles ? (
            <>
              <img src={picture} alt="" width={30} className="me-2 ms-2" />
              <span>{name}</span>
            </>
          ) : (
            <NostrBandLink
              postfix={Nostr.encodeAuthorPubKey(message.pubkey)}
              value={message.pubkey}
            />
          )}
        </p>
      )}
    </>
  );
};
