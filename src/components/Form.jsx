import React from 'react';
import {useForm} from 'react-hook-form';
import {options} from "../utils/options.js";

function GetForm({setActive, onSubmit}) {
    const {handleSubmit, reset, register} = useForm();

    function onSubmitForm(data) {
        onSubmit(data);
        setActive();
        reset();
    }

    return (
        <form key={1} onSubmit={handleSubmit(onSubmitForm)}>
            <div className=" mb-4">
                <input className="form-control" type="text" placeholder="Relay url"
                       id="url"
                       {...register('url', {required: true, maxLength: 30})}/>
            </div>
            <div className="mb-4">
                <input className="form-control" type="text" placeholder="Filter"
                       aria-label="Filter" id="filterInput" {...register('filterInput', {})}/>
            </div>
            <div className="mb-4">
                <select id="filterSelect" {...register('filterSelect', {})} className="form-select"
                        aria-label="Filter">
                    <option value=''>Select</option>
                    {options.map((option) => {
                        return <option key={option} value={option}>{option}</option>
                    })}
                </select>
            </div>
            <button type="submit" className="btn btn-primary form-control">
                Add relay
            </button>
        </form>
    );
}

export default GetForm;
