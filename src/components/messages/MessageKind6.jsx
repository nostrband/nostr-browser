import React from 'react';
import './Messages.scss';

export const MessageKind6 = ({message}) => {

    const tag = message.tags.map((item) => item[0] === 'e' ? item[1] : '')[0]

    return (
        <div className="MessageKind1Div">
            {'Event ' + tag}
        </div>
    );
}