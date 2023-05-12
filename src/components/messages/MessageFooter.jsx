import React from 'react';
import Nostr from '../../Nostr.ts';
import { NostrBandLink } from '../NostrBandLink.jsx';

export const MessageFooter = ({ tags }) => {
  return (
    <>
      {' '}
      {tags && tags.length > 0 && (
        <div className="card-footer">
          <p>Tags:</p>
          <table className="table">
            <thead></thead>
            <tbody>
              {tags.map((tag, index) => (
                <tr
                  key={index + 'tagUniqueIndex'}
                  style={{ wordBreak: 'break-word' }}
                >
                  {tag.map((item, index) => {
                    if (index === 1 && tag[0] === 'p') {
                      return (
                        <td key={index + 'itemUniqueIndex'}>
                          <NostrBandLink
                            postfix={Nostr.encodeAuthorPubKey(item)}
                            value={item}
                          />
                        </td>
                      );
                    }
                    if (index === 1 && tag[0] === 'e') {
                      return (
                        <td key={index + 'itemUniqueIndex'}>
                          <NostrBandLink
                            postfix={Nostr.encodeEventId(item)}
                            value={item}
                          />
                        </td>
                      );
                    }
                    return (
                      <td key={index + 'itemUniqueIndex'}>{item + 'dfd'}</td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
