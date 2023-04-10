import React from 'react';
import { useForm } from 'react-hook-form';
import './Form.scss';

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
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            
            {...register('name', { required: true, maxLength: 20 })}
          />
        </div>
        <div>
          <label>Text</label>
          <textarea
            id="text"
            {...register('text', { required: true, maxLength: 20 })}
          />
        </div>
        <button className = 'form--button' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default GetForm;
