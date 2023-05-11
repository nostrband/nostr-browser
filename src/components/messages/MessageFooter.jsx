import React from 'react';

export const MessageFooter = ({tags}) => {
    return (
        <> {tags && tags.length > 0 && (
            <div className='card-footer'>
                <p>Tags:</p>
                {tags.map((tag, index) =>
                    <p key={index}> {tag.map(item => item).join(',')}</p>
                )}
            </div>
        )}
        </>
    );
};