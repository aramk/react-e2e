import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';
import { ContactList } from './ContactList.react';

const contacts = require('./contacts.json');

function App() {
  return (
    <div className="App">
      <h1>Contacts</h1>
      <ContactList items={contacts} />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
