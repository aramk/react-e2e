import React from 'react';

export class ContactItem extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div className="ContactItem">
        <div>
          <strong>{item.name}</strong>
        </div>
        <div>{item.phone}</div>
        <div>
          {item.street}, {item.city}
        </div>
      </div>
    );
  }
}
