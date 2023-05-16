import React from 'react';
import './Messages.scss';

export const MessageKind0 = ({message}) => {

    const getTableBodyAsReactElement = () => {
        const messageContent = JSON.parse(message.content);
        
        console.log (messageContent)
        return (
            <tbody>
            {Object.keys(messageContent).map((key) => {
                return (
                    
                    <tr key={key}>
                        <td>{key}</td>
                            <td>{messageContent[key]}</td>
                       {/*} if ({key} == picture) {
                             <td><img src={messageContent.picture} alt = '' /></td>
                        } else {
                            <td>{messageContent[key]}</td>
                        }*/}
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