import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import './styles.css';
import {ContactList} from './ContactList.react';
import {ContactForm} from './ContactForm.react';

const contacts = require('./contacts.json');

class App extends React.Component {
  state = {
    formContact: {},
    contacts: JSON.parse(JSON.stringify(contacts)).map(item => {
      item.id = getNextId();
      return item;
    }),
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const {error} = this.state;
    if (prevState.error !== error && error) {
      setTimeout(() => {
        this.setState({error: null});
      }, 5000);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={this.renderList} />
          <Route exact path="/tasks" component={this.renderList} />
          <Route exact path="/tasks/create" component={this.renderCreateForm} />
          <Route exact path="/tasks/:id/edit" component={this.renderEditForm} />
          <Route component={this.render404} />
        </Switch>
      </BrowserRouter>
    );
  }

  render404() {
    return this.renderError('Resource not found!');
  }

  renderList = ({history}) => {
    return (
      <>
        <h1>Contacts</h1>
        {this.renderErrorState()}
        <ContactList
          items={this.state.contacts}
          onAddClick={() => this.onAddClick(history)}
          onItemClick={item => this.onItemClick(item, history)}
        />
      </>
    );
  };

  renderCreateForm = ({history}) => {
    return (
      <>
        <h1>Create Contact</h1>
        <ContactForm contact={null} onSave={contact => this.onCreate(contact, history)} onCancel={() => this.routeHome(history)} />
      </>
    );
  };
  
  renderEditForm = ({history, match}) => {
    const id = match.params.id;
    const contact = this.state.contacts.find(contact => contact.id === id);
    if (!contact) {
      this.setState(createMissingContactErrorState(id));
      this.routeHome(history);
      return null;
    }
    return (
      <>
        <h1>Edit Contact</h1>
        <ContactForm contact={contact} onSave={contact => this.onEdit(contact, history)} onCancel={() => this.routeHome(history)} />
      </>
    );
  };

  renderError = (err) => {
    return <p>{err.toString()}</p>;
  }

  renderErrorState = () => {
    const {error} = this.state;
    return error ? this.renderError(error.toString()) : null;
  }

  onCreate = (contact, history) => {
    const newContact = {
      ...contact,
      id: getNextId(),
    };
    this.setState(prevState => {
      return {
        ...prevState,
        contacts: [...prevState.contacts, newContact],
      };
    }, () => {
      this.routeHome(history);
    });
  };

  routeHome = history => {
    history.push('/');
  }

  onAddClick = history => {
    history.push('/tasks/create');
  };

  onItemClick = (item, history) => {
    history.push(`/tasks/${item.id}/edit`);
  };

  onEdit = (contact, history) => {
    this.setState(prevState => {
      const index = prevState.contacts.findIndex(c => c.id === contact.id);
      if (index === -1) {
        return createMissingContactErrorState(contact.id);
      }
      const contacts = prevState.contacts.slice();
      contacts[index] = {...contact};
      return {
        ...prevState,
        contacts,
      };
    }, () => {
      this.routeHome(history);
    });
  }
}

function createMissingContactErrorState(id) {
  return {
    error: new Error(`Couldn't find contact with ID "${id}"`),
  };
}

let nextId = 0;
function getNextId() {
  return (nextId++).toString();
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
