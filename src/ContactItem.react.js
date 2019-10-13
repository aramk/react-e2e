import React from 'react';

export class ContactItem extends React.Component {
  render() {
    const {item} = this.props;
    return (
      <div className="ContactItem" onClick={this.onClick}>
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

  onClick = () => {
    const {onClick} = this.props;
    if (onClick) onClick(this.props.item);
  };
}
