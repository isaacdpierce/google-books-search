import React, { Component } from 'react';
import SearchBar from './searchBar/SearchBar';
import { config } from './config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchTerm: '',
      type: 'ebooks',
      print: 'all',
      errors: null,
    };
  }

  handleClick(event) {
    event.preventDefault();
    const { searchTerm, type, print } = this.state;
    const query = encodeURIComponent(searchTerm);
    const options = `filter=${type}&printType=${print}`;
    const apiKey = config.apiKey;

    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&${options}&key=${apiKey}`;

    // const options = {
    //   method: 'GET',
    //   headers: {
    // Add your key after Bearer
    //     Authorization: `Bearer ${config.apiKey} `,
    //     'Content-Type': 'application/json',
    //   },
    // };

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later.');
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          books: [...data.items],
          error: null,
        });
      })
      .catch(err => {
        this.setState({
          error: err.message,
        });
      });
  }

  updateSearchTerm(term) {
    this.setState({ searchTerm: term });
  }

  render() {
    const books = this.state.books.map((book, i) => (
      <li key={i}>
        <a href={book.volumeInfo.infoLink}>
          <img
            className='book-cover'
            src={book.volumeInfo.imageLinks.smallThumbnail}
            alt={book.volumeInfo.title}
          />
        </a>
        <header className='book-header'>
          <h1>{book.volumeInfo.title}</h1>
          <h2>{book.volumeInfo.authors}</h2>
          <a href={book.accessInfo.webReaderLink}>Read sample</a>
        </header>
      </li>
    ));

    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Google Book Search</h1>
        </header>
        <SearchBar
          searchTerm={this.state.searchTerm}
          handleUpdate={term => this.updateSearchTerm(term)}
          handleSubmit={event => this.handleClick(event)}
        />
        <ul>{books}</ul>
      </div>
    );
  }
}

export default App;
