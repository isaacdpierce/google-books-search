import React, { Component } from 'react';
import './SearchOptions.css';

export default class SearchOptions extends Component {
  render() {
    return (
      <fieldset className='search-options'>
        <label htmlFor='book-type'>Book Type</label>
        <select className='search-options__type' id='book-type'>
          <option value=''>--Please choose a book type--</option>
          <option value='ebooks'>All E-books</option>
          <option value='free-ebooks'>Free E-books</option>
          <option value='paid-ebooks'>Paid E-books</option>
        </select>
        <label htmlFor='book-type'>Print Type</label>
        <select className='search-options__type'>
          <option value=''>--Please choose a print option--</option>
          <option value='books'>Books</option>
          <option value='magazines'>Magazines</option>
          <option value='all'>All</option>
        </select>
      </fieldset>
    );
  }
}
