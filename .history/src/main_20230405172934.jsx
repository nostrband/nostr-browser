import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import Form from './components/Form';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Form />
  </React.StrictMode>,
);
