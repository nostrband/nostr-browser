import React from 'react';
import './Messages.scss';
import Nostr from '../../Nostr';
import {NostrBandLink} from "../NostrBandLink.jsx";

export const MessageKind6 = ({message}) => {

    const eventId = message.tags.map((item) => item[0] === 'e' ? item[1] : '')[0];

    return (
        <div className="MessageKind1Div">
            Event <NostrBandLink postfix={Nostr.encodeEventId(eventId)} value={eventId}/>
        </div>
    );
}