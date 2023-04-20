import React from 'react';
import './Messages.scss';

export const MessageKind1 = ({message}) => {

    return (
        <div className="MessageKind1Div">
            {message.content}
        </div>
    );
}