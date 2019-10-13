import _ from 'underscore';
import React from 'react';

import {ContactItem} from './ContactItem.react';

export class ContactList extends React.Component {
  state = {
    query: null,
  };

  render() {
    const {query} = this.state;
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
      });

      const sortedItems = _.sortBy(items, item => {
        return item.name;
      });

      const renderedItems = sortedItems.map((item, i) => <ContactItem key={i} item={item} />);


    const body = renderedItems.length > 0 ? renderedItems : <p>There are no items to display</p>;

    return (
      <div className="ContactList">
        <div className="ContactListSearch" key="search">
          <div className="ContactListSearchLabel">Search</div>
          <input onChange={this.onSearchChange} />
          <button className="ContactListAdd" onClick={this.props.onAddClick}>
            Add
          </button>
        </div>
        <div className="ContactListItems" key="items">
          {body}
        </div>
      </div>
    );
  }

  onSearchChange = event => {
    this.setState({
      query: event.currentTarget.value.trim(),
    });
  };

  onAdd = () => {};
}
