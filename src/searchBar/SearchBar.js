import React, { Component } from 'react';
import './SearchBar.css';
import SearchOptions from '../searchOptions/SearchOptions';

export default class SearchBar extends Component {
  render() {
    return (
      <section className='search'>
        <form className='search__form'>
          <fieldset className='search__field'>
            <label htmlFor='search__input'>Search:</label>
            <input
              type='text'
              id='search__input'
              defaultValue={this.props.searchTerm}
              onChange={e => this.props.handleUpdate(e.target.value)}
            />
          </fieldset>

          <SearchOptions updateSearchOptions={this.props.updateSearchOptions} />

          <button onClick={e => this.props.handleSubmit(e)}>Search</button>
        </form>
      </section>
    );
  }
}
