import React from 'react';
import './MessageFooter.scss';

export const MessageKind0Header = ({message}) => {
    
        const getContent = JSON.parse(message.content)

        
        console.log (getContent)
        return (
            <div>
            {Object.keys(getContent).map((key) => {
                return (
                    <div>
                    
                        <div>{key}</div>
                     
                        { key === 'picture' ?
                            <div><img style = {{width: '50px', height: '50px'}} src={getContent.picture} alt = '' /></div>
                        :
                            <div>{getContent[key]}</div>
                        }

                    </div>
                );
            })}
            </div>
        );  
    
};