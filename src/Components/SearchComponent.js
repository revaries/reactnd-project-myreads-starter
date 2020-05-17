import React,{ Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from '../BooksAPI';
import BookShelf from "./BookShelfComponent";


class SearchComponent extends Component {
  state = {
    books: [],
    incorrectKey: true
  }

  clearBooks = () => {
    this.setState({
      books: []
    });
  }

  searchHandler = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      this.searchWithValue(event.target.value);
    }
  }

  searchWithValue = (query) => {
    BooksAPI.search(query)
      .then(searchBooks => {
        if (Array.isArray(searchBooks)) {
          searchBooks = searchBooks.map(eachBook => ({...eachBook, shelf: 'none'}))
          this.setState({
            books: searchBooks
          })}
        else {
          this.clearBooks();
        }
      })
      .catch(err => {
        console.log(err);
        this.clearBooks();
      })
  }

  moveToShelf = (bookId, currentShelf, newShelf) => {
    BooksAPI.updatewithBookId(bookId, newShelf)
    .then(
      this.setState((currentState) => ({
        books : currentState['books'].filter(eachBook => {
          return eachBook.id !== bookId;
        })
      })),
      this.props.updatePage(bookId, newShelf)
    )
  }

    render() {
        return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/"><button className="close-search">Close</button></Link>
              <div className="search-books-input-wrapper">
                <input 
                  type="text" 
                  placeholder="Search by title or author"
                  onKeyDown={this.searchHandler}
                  />
              </div>
            </div>
            <div className="search-books-results">
                <BookShelf 
                  key = {'searchedBooks'}
                  search = {true}
                  books = {this.state.books}
                  bookShelf = {'search'}
                  updateShelf = {this.moveToShelf}
                />
            </div>
          </div>
        )
    }
}

export default SearchComponent;