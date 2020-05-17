import React, { Component } from "react";

class DropDownComponent extends Component {
    change = (event) => {
        this.props.onShelfUpdate(event.target.value);
    }

    render() {
        const {shelf} = this.props;

        return (
            <div className="book-shelf-changer">
                <select onChange={this.change} value={shelf}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
          </div>
        )
    }
}

export default DropDownComponent;