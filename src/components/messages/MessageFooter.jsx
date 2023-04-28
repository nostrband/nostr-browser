import React from 'react';
import './MessageFooter.scss';

export const MessageFooter = ({ message }) => {
  
    return (
        <p className = 'message--footer'>
                Tags:<br /> 
                {message.tags.map((item) =>
                <div> {`${item.index + <hr /> }`} key = {item.index}
                  {item.tags}</div>
                )}

        </p>
    
    );
};