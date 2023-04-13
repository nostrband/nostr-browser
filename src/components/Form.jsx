import React from 'react';
import { useForm } from 'react-hook-form';
import './Form.scss';
import '../variables.scss';

function GetForm({ setActive, onSubmit }) {
  const { register, handleSubmit, reset } = useForm();

  function onSubmitForm(data) {
    onSubmit(data);
    setActive();
    reset();
  }

  return (
    <div className='form--container'>
      
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div>
          <label htmlFor="name">Relay URL</label>
          <input
            id="url"
            type="text"
            
            {...register('url', { required: true, maxLength: 20 })}
          />
        </div>

        <button className = 'form--button' type="submit">Add relay</button>
      </form>
    </div>
  );
}

export default GetForm;
