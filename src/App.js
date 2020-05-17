import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './Components/BookShelfComponent';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import SearchComponent from './Components/SearchComponent';

class BooksApp extends React.Component {

  titles = {
    currentlyReading : "Currently Reading",
    wantToRead: "Want To Read",
    read: "Read"
  }
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  moveShelf = (bookId, shelf, newShelf) => {
      const book = this.state[shelf].find(eachBook => (eachBook.id===bookId));
      book.shelf = newShelf;
      BooksAPI.update(book, newShelf)
        .then(() => {
          let currentState = this.state;
          let value = currentState[shelf].filter(eachBook => {
            return eachBook.id !== bookId;
          });
          currentState[shelf] = value;
          currentState[newShelf].push(book);
          this.setState(currentState);
        });
  };

  componentDidMount() {
    BooksAPI.getAll().then(allBooks => {
      this.setState({
        currentlyReading: allBooks.filter(eachBook => {
          return eachBook.shelf === 'currentlyReading'
        }),
        wantToRead: allBooks.filter(eachBook => {
          return eachBook.shelf === 'wantToRead'
        }),
        read: allBooks.filter(eachBook => {
          return eachBook.shelf === 'read'
        })
      })
    }).catch(err => (console.log(err)));
  };

  addBookFromSearch = (bookId, shelf) => {
    BooksAPI.get(bookId).then(book => {
      let currentState = this.state;
      currentState[shelf].push(book);
      this.setState(currentState);
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>My Reads</h1>
                  </div>
                  <div className="list-books-content">
                    <div>
                      { Object.keys(this.state).map((key, index) => {
                        return (
                          <BookShelf
                            key = {index}
                            bookShelfTitle = {this.titles[key]}
                            books = {this.state[key]}
                            updateShelf = {this.moveShelf}
                            bookShelf = {key}
                          />
                        )})}
                      </div>
                    </div>
                  <div className="open-search">
                    <Link to='/search'><button>Add Button</button></Link>
                  </div>
                </div>)}
        />
        <Route path='/search' 
          render={() => (
            <SearchComponent 
              updatePage = {this.addBookFromSearch}
            />
          )}
        />
      </div>)
      
  }
}

export default BooksApp
