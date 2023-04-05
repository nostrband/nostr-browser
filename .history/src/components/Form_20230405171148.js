import React from 'react';


function GetForm() {
    const [name, setName] = React.useState('');
    const [text, setText] = React.useState('');
   
    function handleSubmit(e) {
      e.preventDefault();
      console.log('name:', name);
      console.log('text:', text);
      console.log('send form')
    }
   
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}//this.props.name
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="text">Text</label>
          <textarea
            id="text"
            value={text}//this.props.text Потом при сабмите по клику передавать функцию с данными?
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        
        <button type="submit">Submit</button> 
        
      </form>
    );
  }

  export default GetForm;
  