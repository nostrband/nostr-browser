import {useEffect, useRef, useState} from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './Relay.scss';
import Nostr from '../Nostr';

import 'websocket-polyfill';

export const Relay = () => {
    const [messages, setMessages] = useState([]);

    const [filterValue, setFilterValue] = useState('');
    const [filterInputValue, setFilterInputValue] = useState('');
    const [options, setOptions] = useState([
        '{"kinds": [0], "limit": 1}',
        '{"kinds": [30023], "limit": 1}',
        '{"kinds": [9735], "limit": 1}',
        '{"kinds": [1], "limit": 1}',
    ]);

    const [defaultOption, setDefaultOption] = useState('');

    const onPredefinedSelect = (data) => {
        setFilterInputValue('');
        if (data.value && !options.includes(data.value)) {
            setOptions(
                [...ubiStateRef.current2, data.value].sort((a, b) =>
                    a.toUpperCase().localeCompare(b.toUpperCase()),
                ),
            );
            setDefaultOption('');
        }
        setDefaultOption(data.value);
    };

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

    const updateInputFilter = (data) => {
        setFilterInputValue(data);
        setDefaultOption('');
    };

    const updateFilter = () => {
        const newFilter = defaultOption ? defaultOption : filterInputValue;

        if (filterValue === newFilter) {
            setFilterInputValue('');
            setDefaultOption('');
            return;
        }
        setMessages([]);

        setFilterValue(newFilter);
        setFilterInputValue('');
        if (!options.includes(newFilter)) {
            setOptions(
                [...ubiStateRef.current2, newFilter].sort((a, b) =>
                    a.toUpperCase().localeCompare(b.toUpperCase()),
                ),
            );
        }
        setDefaultOption('');
        connectToRelay('relay.nostr.band');
        subscribeToRelay('relay.nostr.band', [JSON.parse(newFilter)]);
    };

    const connectToRelay = (data) => {
        Nostr.addRelay(data);
        Nostr.connectRelay(data);
    };

    const subscribeToRelay = (relayUrl, filter, filter2) => {
        Nostr.subscribe(relayUrl, filter, (data) => addMessage(data));
    };

    return (
        <div style={{marginTop: 20}}>
            <h1>{filterValue}</h1>
            <br/>
            <label>
                Filter:
                <input
                    type="text"
                    value={filterInputValue}
                    onChange={(e) => updateInputFilter(e.target.value)}
                />
                <Dropdown
                    options={options}
                    onChange={onPredefinedSelect}
                    value={defaultOption}
                    placeholder="Select an option"
                />
                <button onClick={updateFilter}> update filter</button>
            </label>
            {
                <div id="messages">
                    {messages.map((message) => (
                        <div key={message.id}>{JSON.stringify(message)}</div>
                    ))}
                </div>
            }
        </div>
    );
};
