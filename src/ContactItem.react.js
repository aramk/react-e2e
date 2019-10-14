import React from 'react';

export class ContactItem extends React.Component {
  render() {
    const {item} = this.props;
    return (
      <div className="ContactItem">
        <div>
          <strong>{item.name}</strong>
        </div>
        <div>{item.phone}</div>
        <div>
          {item.street}, {item.city}
        </div>
        <button className="ContactItemEdit" key="edit" onClick={this.onEditClick}>Edit</button>
        <button className="ContactItemDelete" key="delete" onClick={this.onDeleteClick}>Delete</button>
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
