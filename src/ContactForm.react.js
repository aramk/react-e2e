import React from 'react';

const FIELDS = ['name', 'phone', 'street', 'city'];

export class ContactForm extends React.Component {
  state = {
    error: null,
  };

  render() {
    const contact = this.props.contact || {};
    return (
      <form
        className="ContactForm"
        onSubmit={this.onSave}
        ref={this.setFormRef}
      >
        {this.renderInput('name', 'Name', contact.name)}
        {this.renderInput('phone', 'Phone', contact.phone)}
        {this.renderInput('street', 'Street', contact.street)}
        {this.renderInput('city', 'City', contact.city)}
        {this.renderError()}
        <button type="submit">Save</button>
        <button type="button" onClick={this.onCancel}>Cancel</button>
      </form>
    );
  }

  setFormRef = form => {
    this.formElement = form;
  };

  renderInput = (name, label, value) => {
    return (
      <div className="ContactFormField">
        <label>{name}</label>
        <input name={name} type="text" defaultValue={value} />
      </div>
    );
  };

  renderError = () => {
    const {error} = this.state;
    if (!error) return null;

    return <div className="FormError">{error.toString()}</div>;
  };

  getInputValue = name => {
    const input = this.formElement
      ? this.formElement.querySelector(`[name="${name}"]`)
      : null;
    return input ? input.value : null;
  };

  onSave = event => {
    event.preventDefault();
    this.setState({error: null}, () => {
      const {onSave} = this.props;
      if (!onSave) {
        return;
      }
      try {
        const existing = this.props.contact;
        const contact = existing ? {...existing} : {};
        for (const field of FIELDS) {
          contact[field] = this.getInputValue(field);
          assertTextValue(field, contact[field]);
        }
        onSave(contact);
      } catch(err) {
        this.setState({error: err});
      }
    });
  };

  onCancel = event => {
    const {onCancel} = this.props;
    if (onCancel) onCancel();
  };
}

function assertTextValue(name, value) {
  if (value == null || value.length === 0) {
    throw new Error(`The "${name}" field can't be empty.`);
  }
}
