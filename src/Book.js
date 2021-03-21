import React from "react";

class Book extends React.Component {
  options = [
    { label: "Move to...", value: "move", disabled: true },
    { label: "Currently Reading", value: "currentlyReading" },
    { label: "Want to read", value: "wantToRead" },
    { label: "Read", value: "read" },
    { label: "None", value: "none" },
  ];

  render() {
    return (
      <div className="book" id={this.props.id}>
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${this.props.imgUrl})`,
            }}
          />
          <div className="book-shelf-changer">
            <select
              defaultValue={this.props.cat}
              onChange={(event) => this.props.onChangeCat(event)}
            >
              {this.options.map((option, idx) => {
                if (option.disabled === true)
                  return (
                    <option key={idx} value={option.value} disabled>
                      {option.label}
                    </option>
                  );
                return (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors}</div>
      </div>
    );
  }
}

export default Book;
