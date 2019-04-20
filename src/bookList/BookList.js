import React, { Component } from 'react';
import './BookList.css';

export default class BookList extends Component {
  render() {
    const { infoLink, title, authors } = this.props.book.volumeInfo;
    const price = this.props.book.saleInfo.listPrice.amount;
    const bookImage = this.props.book.volumeInfo.imageLinks.smallThumbnail;
    const link = this.props.book.accessInfo.webReaderLink;

    return (
      <li>
        <a href={infoLink}>
          <img className='book-cover' src={bookImage} alt={title} />
        </a>
        <header className='book-header'>
          <h1>{title}</h1>
          <h2>{authors}</h2>
          <a href={link}>Read sample</a>
          <p>
            <span>$</span>
            {price}
          </p>
        </header>
      </li>
    );
  }
}
