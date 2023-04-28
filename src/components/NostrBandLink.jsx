import React from 'react';
import './NostrBandLink.scss';

export const NostrBandLink = ({postfix, value}) => {

    return (
        <a className="NostrBandLink" href={"https://nostr.band/" + postfix} target="_blank">
            {value}
        </a>
    );
}