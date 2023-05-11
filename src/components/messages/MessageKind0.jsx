import React from 'react';
import './Messages.scss';

export const MessageKind0 = ({message}) => {

    const getTableBodyAsReactElement = () => {
        const messageContent = JSON.parse(message.content);
        return (
            <tbody>
            {Object.keys(messageContent).map((key) => {
                return (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{messageContent[key]}</td>
                    </tr>
                );
            })}
            </tbody>
        );
    }
    return (
        <div  className="card-text">
            <table className="table table-hover">
                {getTableBodyAsReactElement()}
            </table>
        </div>
    );
}