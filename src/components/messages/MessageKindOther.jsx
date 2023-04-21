import React from 'react';
import './Messages.scss';

export const MessageKindOther = ({message}) => {

    return (
        <div className="MessageKind1Div">
            {JSON.stringify(message)}
        </div>
    );
}