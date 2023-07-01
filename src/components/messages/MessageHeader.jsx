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
  console.log (message.pubkey)
  const { name, picture } = getAuthorData(message);

  return ( 
    <>
      {message && (
        <p className="card-header">
          Kind: {message.kind} CreatedAt: {formatDate(message.created_at)} (
          {message.created_at}) <br /> 
          ID: <NostrBandLink postfix = {Nostr.encodeEventId(message.id) } value = {message.id} /> <br />
          Author:
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
