import React,{ Component } from "react";
import PropTypes from "prop-types";
import DropDownComponent from "./DropDownComponent";

class BookComponent extends Component {

    updatingShelf = (newShelf) => {
        const {bookId, bookShelf, updateShelf} = this.props;
        updateShelf(bookId, bookShelf, newShelf);
    }

    render() {
        const {bookTitle, bookAuthors, backgroundImageURL, bookShelf} = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                    style={
                        {
                            width: 128,
                            height: 192,
                            backgroundImage: `url(${backgroundImageURL})`

                        }}>
                    </div>
                    <DropDownComponent
                    shelf = {bookShelf}
                    onShelfUpdate = {this.updatingShelf}
                    />
                </div>
                <div className="book-title">{bookTitle}</div>
                { bookAuthors && bookAuthors.length > 0 && bookAuthors.map(eachBookAuthor => {
                        return (
                            <div className="book-authors" key={eachBookAuthor}>
                                {eachBookAuthor}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

BookComponent.propTypes = {
    bookTitle: PropTypes.string.isRequired,
    backgroundImageURL: PropTypes.string.isRequired,
    bookId: PropTypes.string.isRequired
}

export default BookComponent;