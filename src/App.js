import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import { Link, Route } from "react-router-dom";
import ListBooks from "./ListBooks";
import * as BooksAPI from "./BooksAPI";
//import selectOption from "./utils/selectOption";

class BooksApp extends React.Component {
  state = {
    books: [
      {
        id: "1",
        imgUrl:
          "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
        title: "To Kill a Mockingbird",
        authors: ["Harper Lee", "danhvfjehahjevfjahv"]
          .toString()
          .replace(",", ", "),
        cat: "read",
      },
      {
        id: "2",
        imgUrl:
          "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
        title: "1776",
        authors: "David McCullough",
        cat: "wantToRead",
      },
      {
        id: "3",
        imgUrl:
          "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api",
        title: "Oh, the Places You'll Go!",
        authors: "Seuss",
        cat: "currentlyReading",
      },
    ],
    searchedBooks: [],
    query: "",
    noResult: false,
  };

  // componentDidMount() {
  //   BooksAPI.search("ART").then((res) => {
  //     const books = res.map((book) => {
  //       return {
  //         id: book.id,
  //         authors: book.authors.toString().replaceAll(",", ", "),
  //         title: book.title,
  //         imgUrl: book.imageLinks.thumbnail,
  //         cat: "none",
  //       };
  //     });

  //     this.setState({ searchedBooks: books });

  //     console.log(this.state.searchedBooks);
  //   });

  // BooksAPI.getAll().then((data) => {
  //   const books = data.map((book) => {
  //     return {
  //       id: book.id,
  //       authors: book.authors.toString().replaceAll(",", ", "),
  //       title: book.title,
  //       imgUrl: book.imageLinks.thumbnail,
  //       cat: "none",
  //     };
  //   });

  //   this.setState({ searchedBooks: books });

  //   console.log(this.state.searchedBooks);
  // });
  //}

  searchBook = (query) => {
    this.setState({
      query: query.trim(),
      noResult: false,
    });
    if (query !== "") {
      BooksAPI.search(query)
        .then((res) => {
          const books = res.map((book) => {
            return {
              id: book.id,
              authors: book.authors,
              title: book.title,
              imgUrl: book.imageLinks.thumbnail,
              cat: "none",
            };
          });

          this.setState({
            searchedBooks: books,
          });
        })
        .catch((err) => {
          this.setState({
            noResult: true,
            searchedBooks: [],
          });
          console.log(`Error : ${err}`);
        });
    }
    if (query === "") {
      this.setState({
        searchedBooks: [],
      });
    }
  };

  addTobookStore(id) {
    const idx = this.state.books.findIndex((el) => el.id === id);
    if (idx === -1) {
      const booksCopy = this.state.books;
      booksCopy.push(this.state.searchedBooks.find((el) => el.id === id));
      return booksCopy;
    }
  }
  changeCat = (event) => {
    const parentEl = event.target.closest(".book");
    const id = parentEl.getAttribute("id");
    const value = event.target.value;
    const booksCopy = this.addTobookStore(id);
    if (booksCopy) {
      this.setState({
        books: booksCopy.map((book) => {
          if (book.id === id) {
            book.cat = value;
          }
          return book;
        }),
      });
    } else {
      this.setState((state) => ({
        books: state.books.map((book) => {
          if (book.id === id) {
            book.cat = value;
          }
          return book;
        }),
      }));
    }
    this.setState((state) => ({
      books: state.books.filter((book) => book.cat !== "none"),
    }));
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <ListBooks
                        onChangeCat={this.changeCat}
                        books={this.state.books.filter(
                          (book) => book.cat === "currentlyReading"
                        )}
                      />
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <ListBooks
                        onChangeCat={this.changeCat}
                        books={this.state.books.filter(
                          (book) => book.cat === "wantToRead"
                        )}
                      />
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ListBooks
                        onChangeCat={this.changeCat}
                        books={this.state.books.filter(
                          (book) => book.cat === "read"
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          )}
        />

        <Route
          exact
          path="/search"
          render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/">
                  <button className="close-search">Close</button>
                </Link>

                <div className="search-books-input-wrapper">
                  {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}

                  <input
                    onChange={(event) => this.searchBook(event.target.value)}
                    type="text"
                    value={this.state.query}
                    placeholder="Search by title or author"
                  />
                </div>
              </div>
              <div className="search-books-results">
                <p>{this.state.noResult && "No results. Try Another term"}</p>
                <ListBooks
                  onChangeCat={this.changeCat}
                  books={this.state.searchedBooks}
                />
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
