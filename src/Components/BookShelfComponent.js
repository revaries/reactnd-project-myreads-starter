import React, { Component } from "react";
import PropTypes from 'prop-types';
import BookComponent from "./BookComponent";


class BookShelf extends Component {



    render() {
        const { bookShelfTitle , books, updateShelf} = this.props;
        return (
            <div className="bookshelf">

                <h2 className="bookshelf-title">{bookShelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    { books && books.length>0 &&
                        books.map(book => {
                            return (
                                <li key = {book.id}>
                                    <BookComponent 
                                    bookTitle = {book.title}
                                    bookAuthors = {book.authors}
                                    backgroundImageURL =  {book.imageLinks && book.imageLinks.thumbnail}
                                    bookShelf = {book.shelf}
                                    bookId = {book.id}
                                    updateShelf = {updateShelf}
                                    />
                                </li>
                            )})}
                    </ol>
                </div>
            </div>
        )
    }
}

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    bookShelf: PropTypes.string.isRequired
}

export default BookShelf;