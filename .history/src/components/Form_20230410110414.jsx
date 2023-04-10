import React from 'react';
import { useForm } from 'react-hook-form';

function GetForm({ setActive, onSubmit }) {
  const { register, handleSubmit, reset } = useForm();

  function onSubmitForm(data) {
    onSubmit(data);
    setActive();
    reset();
  }

  return (
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
        <label htmlFor="text">Text</label>
        <textarea
          id="text"
          {...register('text', { required: true, maxLength: 20 })}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default GetForm;
