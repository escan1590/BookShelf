import React from "react";
import Book from "./Book";
class ListBooks extends React.Component {
  render() {
    return (
      <ol className="books-grid">
        {this.props.books.map((book) => (
          <li key={book.id}>
            <Book
              onChangeCat={this.props.onChangeCat}
              imgUrl={book.imgUrl}
              title={book.title}
              authors={book.authors}
              cat={book.cat}
              id={book.id}
            />
          </li>
        ))}
      </ol>
    );
  }
}

export default ListBooks;
