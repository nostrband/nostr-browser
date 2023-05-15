import React from 'react';
import {useForm} from 'react-hook-form';

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
        <form key={2} onSubmit={handleSubmitUpdateSettings(onSubmitForm)}>
            <div className="mb-4">
                <input className="form-control" type="text" placeholder="author relay url"
                       aria-label="RelayUrl" id="RelayUrl" {...registerUpdateSettings('authorRelayUrl', {})}/>
            </div>
            <button type="submit" className="btn btn-primary form-control">Submit</button>
        </form>
    );
}

export default UpdateFilterForm;
