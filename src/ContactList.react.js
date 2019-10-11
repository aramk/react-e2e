import React from 'react';

import { ContactItem } from './ContactItem.react';

export class ContactList extends React.Component {
  state = {
    query: null,
  };

  render() {
    const { query } = this.state;
    let lowerCaseQuery;
    if (query != null) {
      lowerCaseQuery = query.toLowerCase();
    }
    const items = this.props.items
      .filter(item => {
        return (
          !lowerCaseQuery ||
          (item.name.toLowerCase().includes(query) ||
            item.phone.toLowerCase().includes(query) ||
            item.street.toLowerCase().includes(query) ||
            item.city.toLowerCase().includes(query))
        );
      })
      .map(item => <ContactItem item={item} />);

    const body =
      items.length > 0 ? items : <p>There are no items to display</p>;

    return (
      <div className="ContactList">
        <div className="ContactListSearch">
          <div className="ContactListSearchLabel">Search</div>
          <input onChange={this.onSearchChange} />
        </div>
        <div className="ContactListItems">{body}</div>
      </div>
    );
  }

  onSearchChange = event => {
    this.setState({
      query: event.currentTarget.value.trim(),
    });
  };
}
