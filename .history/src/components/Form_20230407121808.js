//import {useState} from 'react';
import React, { useState} from 'react'
//import { useForm } from 'react-hook-form'

function GetForm({ setActive, onSubmit }) {
  //const { reset } = useForm()
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit([{ name, text }]);
    setActive();    
  }
  const resetForm = (e) => {
    setName("")
    setText("")
  }
 
  return (
    <div >
        <form onSubmit={handleSubmit}>
          <div >
            <label>Name</label>
            <input
              type="text"
              name = 'name'
              value={name} //this.props.name
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div >
            <label>Text</label>
            <input
              type="text"
              name="text"
              value={text} //this.props.text Потом при сабмите по клику передавать функцию с данными?
              onChange={(e) => setText(e.target.value)}
            />
          </div>
         
          <div >
            <button type="submit" >
              Submit
            </button>
            <button
              type="button"
              onClick={() =>
                resetForm({
                  name: '',
                  text: '',
                })
              }
            >
              Reset
            </button>
          </div>
        </form>
     
    </div>
  )
}
  
export default GetForm;