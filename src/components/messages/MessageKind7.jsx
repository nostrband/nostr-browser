import React from 'react';
import './Messages.scss';
import Nostr from '../../Nostr';
import {NostrBandLink} from '../NostrBandLink.jsx'

export const MessageKind7 = ({message}) => {

    const eventId = message.tags.map((item) => item[0] === 'e' ? item[1] : '')[0];

    return (
        <p className="card-text">
            {message.content} on <NostrBandLink postfix={Nostr.encodeEventId(eventId)} value={eventId}/>
        </p>
    );
}