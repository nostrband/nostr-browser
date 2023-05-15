import React from 'react';
import './MessageFooter.scss';
import Nostr from "../../Nostr.ts";
import moment from "moment/moment.js";
import {NostrBandLink} from "../NostrBandLink.jsx";

export const MessageHeader = ({message, showProfiles}) => {

    const formatDate = (createdAt) => {
        return moment(createdAt * 1000).format('YYYY-MM-DD HH:mm:SS')
    }

    return (
        <> {message && (
            <p className="card-header">Kind: {message.kind} CreatedAt: {formatDate(message.created_at)} ({message.created_at})
                Author: {showProfiles ? 'showProfile' :
                    <NostrBandLink postfix={Nostr.encodeAuthorPubKey(message.pubkey)} value={message.pubkey}/>}</p>
        )}
        </>
    );
};