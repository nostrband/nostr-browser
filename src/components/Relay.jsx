import {useEffect, useRef, useState} from 'react';
import {Modal} from './Modal';
import RelayForm from './RelayForm';
import {relayInit} from 'nostr-tools'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './Relay.scss';

import 'websocket-polyfill'

export const Relay = () => {
    const [messages, setMessages] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [filterInputValue, setFilterInputValue] = useState('');
    const [options, setOptions] = useState(['{"kinds": [0], "limit": 1}', '{"kinds": [30023]}', '{"kinds": [9735]}']);
    const [defaultOption, setDefaultOption] = useState('');
    let relay;
    let sub;

    const onPredefinedSelect = (data) => {
        setFilterValue(data.value);
        if (data.value && !options.includes(data.value)) {
            setOptions([...ubiStateRef.current2, data.value].sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase())));
            setDefaultOption('')
        }
        setDefaultOption(data.value);
        connectToRelay(data.value);
    }

    const ubiStateRef = useRef();

    useEffect(() => {
        ubiStateRef.current = messages;
    }, [messages]);

    useEffect(() => {
        ubiStateRef.current2 = options;
    }, [options]);

    const addMessage = (data) => {
        setMessages([data, ...ubiStateRef.current]);
    };

    const updateFilter = () => {
        setFilterValue(filterInputValue);
        setFilterInputValue('');
        setOptions([...ubiStateRef.current2, filterInputValue]);
        setDefaultOption(filterInputValue);
    };


    const connectToRelay = async (data) => {

        relay = relayInit('wss://' + data.url)

        relay.on('connect', () => {
            console.log(`connected to ${relay.url}`)
        })
        relay.on('error', () => {
            console.log(`failed to connect to ${relay.url}`)
        })

        await relay.connect();
    };

    const subscribeToRelay = async (data) => {

        sub = relay.sub(data)

        sub.on('event', event => {
            addMessage(event);
        })
    };

    const unSubscribeToRelay = async (data) => {
        sub.unsub()
    };


    return (
        <div style={{marginTop: 20}}>

            <h1>{filterValue}</h1>
            <br/>
            <label>
                Filter:
                <input type="text" value={filterInputValue} onChange={e => setFilterInputValue(e.target.value)}/>
                <Dropdown options={options} onChange={onPredefinedSelect} value={defaultOption}
                          placeholder="Select an option"/>
                <button onClick={updateFilter}> {' '}
                    update filter
                </button>
            </label>
            {/*{<div id="messages">{messages.map(message => (
                <div key={message.id}>{JSON.stringify(message)}</div>
            ))}</div>}*/}
        </div>
    );
};
