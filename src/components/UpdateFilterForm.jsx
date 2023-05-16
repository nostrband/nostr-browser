import React from 'react';
import {useForm} from 'react-hook-form';
import {options} from "../utils/options.js";
import './Form.scss';

function UpdateFilterForm({setActive, onSubmit, index}) {
    const {
        handleSubmit: handleSubmitUpdateFilter,
        reset: resetUpdateFilter,
        register: registerUpdateFilter
    } = useForm();

    function onSubmitForm(data) {
        onSubmit(data, index);
        setActive();
        resetUpdateFilter();
    }

    return (
        <form key={2} onSubmit={handleSubmitUpdateFilter(onSubmitForm)}>
            <div className="mb-4">
                <input className="form-control" type="text" placeholder="Filter"
                       aria-label="Filter" id="filterInput" {...registerUpdateFilter('filterInput', {})}/>
            </div>
            <div className="mb-4">
                <select id="filterSelect" {...registerUpdateFilter('filterSelect', {})} className="form-select"
                        aria-label="Filter">
                    <option value=''>Select</option>
                    {options.map((option) => {
                        return <option key={option} value={option}>{option}</option>
                    })}
                </select>
            </div>
            <button type="submit" className="btn btn-primary form-control">Submit</button>
        </form>
    );
}

export default UpdateFilterForm;
