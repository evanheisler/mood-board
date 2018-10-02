import React, { Component } from 'react';
import emoji from 'emojilib';

class EmojiPicker extends Component {
  state = {
    searchValue: ''
  };

  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { searchValue } = this.state;

    return (
      <div className="emoji-picker">
        <div className="emoji-search w-25 mx-auto my-3">
          <input
            type="text"
            className="form-control"
            id="emoji-search-field"
            name="emoji-search"
            placeholder="Filter"
            onChange={this.handleChangeInput}
            value={searchValue}
          />
        </div>
        <div className="emoji-list bg-light p-3 m-3">
          {Object.keys(emoji.lib).map(emojiKey => (
            <div
              key={emojiKey}
              className="emoji-option d-inline-block px-2 rounded"
              title={emojiKey}
              onClick={() => this.props.emojiClick(emoji.lib[emojiKey])}
            >
              {emoji.lib[emojiKey].char}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default EmojiPicker;
