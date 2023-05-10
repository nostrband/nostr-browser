import React from 'react';
import './Messages.scss';

export const MessageKind1 = ({message}) => {

    return (
        <p className="card-text">
            {message.content}
        </p>
    );
}