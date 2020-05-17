import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './Components/BookShelfComponent';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import SearchComponent from './Components/SearchComponent';

class BooksApp extends React.Component {

  shelfs = {
    currentlyReading : "Currently Reading",
    wantToRead: "Want To Read",
    read: "Read"
  }

  state =  {
    books: [],
    ids: {}
  }

  moveShelf = (bookId, shelf, newShelf) => {
    let currentState = this.state;
    if(currentState.ids[bookId]) {
      currentState.ids[bookId]['shelf'] = newShelf;
    }
    this.setState(currentState);
  };

  componentDidMount() {
    BooksAPI.getAll().then(allBooks => {
      if (Array.isArray(allBooks)) {
        let books = []
        let ids = {}
        allBooks.forEach(eachBook => {
          ids[eachBook.id] = eachBook;
          books.push(eachBook);
        })
         this.setState({
           books: books,
           ids: ids
         });
         console.log(this.state)
      }
    }).catch(err => (console.log(err)));

  };

  addBookFromSearch = (bookId, shelf) => {
    let currentState = this.state;
    if(currentState.ids[bookId]) {
      currentState.ids[bookId]['shelf'] = shelf;
    } else {
      BooksAPI.get(bookId).then(book => {
        currentState.ids[book.id] = book;
        currentState.books.push(book);
      })
    }
    this.setState(currentState);
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
                      { Object.keys(this.shelfs).map((key) => {
                        return (
                          <BookShelf 
                            key = {key}
                            bookShelfTitle = {this.shelfs[key]}
                            books = {this.state.books.filter(eachBook => (eachBook.shelf === key))}
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
              libraryBooks = {this.state.ids}
            />
          )}
        />
      </div>)
      
  }
}

export default BooksApp
