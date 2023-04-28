import React from 'react';
import './MessageFooter.scss';
import Nostr from "../../Nostr.ts";
import moment from "moment/moment.js";
import {NostrBandLink} from "../NostrBandLink.jsx";

export const MessageHeader = ({message}) => {

    const formatDate = (createdAt) => {
        return moment(createdAt * 1000).format('YYYY-MM-DD HH:mm:SS')
    }

    return (
        <> {message && (
            <div><p
                className="messageHeader">Kind: {message.kind} CreatedAt: {formatDate(message.created_at)} ({message.created_at})
                Author: <NostrBandLink postfix={Nostr.encodeAuthorPubKey(message.pubkey)} value={message.pubkey}/></p>
            </div>
        )}
        </>
    );
};