import React from 'react';
import {useForm} from 'react-hook-form';
import './Form.scss';

function UpdateFilterForm({setActive, onSubmit}) {
    const {
        handleSubmit: handleSubmitUpdateSettings,
        reset: resetUpdateSettings,
        register: registerUpdateSettings
    } = useForm();

    function onSubmitForm(data) {
        onSubmit(data);
        setActive();
        resetUpdateSettings();
    }

    return (
        <form key={3} onSubmit={handleSubmitUpdateSettings(onSubmitForm)}>
            <div className="mb-4">
                <label htmlFor="RelayUrl" className="col-form-label settings">Relay to fetch profiles:</label>
                <input className="form-control" type="text" placeholder="Same as current relay by default"
                       aria-label="RelayUrl" id="RelayUrl" {...registerUpdateSettings('authorRelayUrl', {})}/>
            </div>
            <button type="submit" className="btn btn-primary form-control">Submit</button>
        </form>
    );
}

export default UpdateFilterForm;
