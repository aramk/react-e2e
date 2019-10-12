import React from 'react';

export class ContactForm extends React.Component {
  render() {
    const contact = this.props.contact || {};
    return (
      <form className="ContactForm" onSubmit={this.onSave} ref={this.setFormRef}>
        {this.renderInput('name', 'Name', contact.name)}
        {this.renderInput('phone', 'Phone', contact.phone)}
        {this.renderInput('street', 'Street', contact.street)}
        {this.renderInput('city', 'City', contact.city)}
        <button type="submit">Save</button>
      </form>
    );
  }

  setFormRef = (form) => {
    this.formElement = form;
  };

  renderInput = (name, label, value) => {
    return (
      <div className="ContactFormField">
        <label>{name}</label>
        <input name={name} type="text" value={value} />
      </div>
    );
  };

  getInputValue = (name) => {
    const input = this.formElement ? this.formElement.querySelector(`[name="${name}"]`) : null;
    return input ? input.value : null;
  }

  onSave = (event) => {
    event.preventDefault();
    const {onSave} = this.props;
    if (onSave) onSave({
      name: this.getInputValue('name'),
      phone: this.getInputValue('phone'),
      street: this.getInputValue('street'),
      city: this.getInputValue('city'),
    });
  };
}
