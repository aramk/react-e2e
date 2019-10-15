import React from 'react';

export class ContactItem extends React.Component {
  render() {
    const {item} = this.props;
    return (
      <div className="ContactItem">
        <p>
          <strong>{item.name}</strong>
        </p>
        <p>{item.phone}</p>
        <p>
          {item.street}, {item.city}
        </p>
        <button
          className="ContactItemEdit"
          key="edit"
          onClick={this.onEditClick}
        >
          Edit
        </button>
        <button
          className="ContactItemDelete"
          key="delete"
          onClick={this.onDeleteClick}
        >
          Delete
        </button>
      </div>
    );
  }

  onEditClick = () => {
    const {onEditClick} = this.props;
    if (onEditClick) onEditClick(this.props.item);
  };

  onDeleteClick = () => {
    const {onDeleteClick} = this.props;
    if (onDeleteClick) onDeleteClick(this.props.item);
  };
}
