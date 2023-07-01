import React, { useState, useEffect } from 'react';
import {Child} from './Child';

function AddInput ({
  onopenFilterModal, 
  onpressClick
})  { 

    const [name, setName] = useState('');
    const [message,setMessage] = useState('')
    
  
    const handleSubmit = (e) => {
        e.preventDefault ();
        setMessage(`hi ${name}`)
        onopenFilterModal(name)
        onpressClick('new value')
        setName('')
    }
   
 return (
      <>
       <form onSubmit = {handleSubmit}>
        <input
          type="text"
          name = 'name'
          value={name}
          onChange = {(e) => setName (e.target.value)} />
          <button type = 'submit'>
           Submit
          </button>
        </form>
        <Child message = {message} />
      </>
    )
  }
export default AddInput;