import React from 'react';
import './Messages.scss';

export const MessageKindOther = ({message}) => {

    return (
        <p className="card-text">
            {JSON.stringify(message)}
        </p>
    );
}