import React from 'react';
import './MessageFooter.scss';
import Nostr from "../../Nostr.ts";
import moment from "moment/moment.js";
import {NostrBandLink} from "../NostrBandLink.jsx";

export const MessageHeader = ({message}) => {

    const formatDate = (createdAt) => {
        return moment(createdAt * 1000).format('YYYY-MM-DD HH:mm:SS')
    }
    const getMessageContent = () => {
        const getContent = JSON.parse(message.content)
        
        console.log (getContent)
        console.log (message.kind)
        return (
            <div>
            {Object.keys(getContent).map((key) => {
                return (
                    <div>
                    
                        {/*<div>{key}</div>*/}
                     
                        { key === 'picture' ?
                            <div className='header--avatar'><img className = 'header--avatar__img' style = {{width: '50px', height: '50px', borderRadius: '20px'}} src={getContent.picture} alt = '' /> {getContent.name} </div>
                        :
                            <div></div>
                        }
            

                </div>
                );
            })}
            </div>
        );
    
    }
        return (
            <> 
            { message && (  
                
            <p className="card-header">Kind: {message.kind} 
                CreatedAt: {formatDate(message.created_at)} ({message.created_at})
                Author: {message.kind === 0  ?
                getMessageContent() : <NostrBandLink postfix={Nostr.encodeAuthorPubKey(message.pubkey)} value={message.pubkey}/> }</p>
            
            )}
        
           {/* <div>
                {getMessageContent()}
            </div>*/}
            
            </>
        );

        
};