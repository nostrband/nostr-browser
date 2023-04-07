import React from 'react';
import { useForm } from 'react-hook-form';

function RelayForm({ setActive, onSubmit }) {
    const { register, handleSubmit, reset } = useForm();

    function onSubmitForm(data) {
        onSubmit(data);
        setActive();
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <div>
                <label htmlFor="enter url">enterUrl</label>
                <input
                    id="url"
                    type="text"
                    {...register('url', { required: true, maxLength: 20 })}
                />
            </div>
            <button type="submit">Connect</button>
        </form>
    );
}

export default RelayForm;
