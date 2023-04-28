import React from 'react';
import './Messages.scss';

export const MessageKind3 = ({ message }) => {
  const contactList = message.tags.map((item) =>
    item[0] === 'p' ? item[1] : null,
  );

  return (
    <>
      <h3 className="title">Contact list:</h3>
      <ol>
        {contactList.map((item, ind) => {
          return (
            <li className="listItem" key={item + ind}>
              {item} <hr />
            </li>
          );
        })}
      </ol>
    </>
  );
};
