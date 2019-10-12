import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';

import './styles.css';
import { ContactList } from './ContactList.react';
import { ContactForm } from './ContactForm.react';

const contacts = require('./contacts.json');

class App extends React.Component {
  state = {
    formContact: {},
    contacts: JSON.parse(JSON.stringify(contacts)),
  };

  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={this.renderList} />
        <Route exact path="/tasks/create" component={this.renderCreateForm} />
      </BrowserRouter>
    )
  }

  renderList = ({history}) => {
    return (
      <>
        <h1>Contacts</h1>
        <ContactList items={this.state.contacts} onAddClick={() => this.onAddClick(history)} />
      </>
    );
  };

  renderCreateForm = () => {
    return (
      <>
        <h1>Create Contact</h1>
        <ContactForm contact={null} onSave={this.onCreate} />
      </>
    );
  };

  onCreate = (contact) => {
    debugger
  }

  onAddClick = (history) => {
    history.push('/tasks/create');
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
