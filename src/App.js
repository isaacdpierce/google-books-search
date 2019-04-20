import React, { Component } from 'react';
import SearchBar from './searchBar/SearchBar';
import BookList from './bookList/BookList';
import { config } from './config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchTerm: '',
      type: 'ebooks',
      print: 'all',
      error: null,
    };
  }

  handleClick(event) {
    event.preventDefault();
    const { searchTerm, type, print } = this.state;
    const query = encodeURIComponent(searchTerm);
    const options = `filter=${type}&printType=${print}`;
    const apiKey = config.apiKey;

    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&${options}&key=${apiKey}`;

    // ! Why won't this work?
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
        console.log(data);

        if (data.totalItems === 0) {
          throw new Error('There were no results for your search');
        }
        this.setState({
          books: [...data.items],
          error: null,
        });
      })
      .catch(err => {
        console.log(err);

        this.setState({
          error: err.message,
        });
      });
  }

  updateSearchTerm(term) {
    this.setState({ searchTerm: term });
  }

  updateSearchOptions(id, value) {
    console.log(value);

    id === 'book-type' &&
      this.setState({
        type: value,
      });
    id === 'print-type' &&
      this.setState({
        print: value,
      });
  }

  render() {
    const books = this.state.books.map((book, i) => (
      <BookList key={i} index={i} book={book} />
    ));
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Google Book Search</h1>
        </header>
        <SearchBar
          required
          searchTerm={this.state.searchTerm}
          handleUpdate={term => this.updateSearchTerm(term)}
          updateSearchOptions={(type, option) =>
            this.updateSearchOptions(type, option)
          }
          handleSubmit={event => this.handleClick(event)}
        />
        <ul>
          {this.state.error === null ? (
            books
          ) : (
            <h2 className='error-message'>{this.state.error}</h2>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
