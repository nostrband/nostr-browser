import {useState, useEffect, useRef} from 'react';
import {Modal} from './Modal';
import RelayForm from './RelayForm';
import {relayInit} from 'nostr-tools'

import 'websocket-polyfill'

export const Relay = () => {
    const [messages, setMessages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const ubiStateRef = useRef();

    useEffect(() => {
        ubiStateRef.current = messages;
    }, [messages]);

    const addMessage = (data) => {
        console.log(222222)
        console.log(data)
        console.log(messages)

        setMessages([data, ...ubiStateRef.current]);
        console.log(messages)
    };


    const connectToRelay = async (data) => {
        const relay = relayInit('wss://' + data.url)

        relay.on('connect', () => {
            console.log(`connected to ${relay.url}`)
        })
        relay.on('error', () => {
            console.log(`failed to connect to ${relay.url}`)
        })

        await relay.connect();

        let sub = relay.sub(["REQ", "", {"kinds": [1], "limit": 1}])

        sub.on('event', event => {
            console.log(event)
            addMessage(event);
        })
    };

    return (
        <div style={{marginTop: 20}}>

            <div id="messages">{messages.map(message => (
                <div key={message.id}>{JSON.stringify(message)}</div>
            ))}</div>

            <button className = 'relay--button' onClick={openModal} style={{marginBottom: 20}}>
                {' '}
                addRelay
            </button>
            <Modal activeModal={isOpen} setActive={closeModal}>
                <RelayForm setActive={closeModal} onSubmit={connectToRelay}/>
            </Modal>
        </div>
    );
};
