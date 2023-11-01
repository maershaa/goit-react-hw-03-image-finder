import React, { Component } from 'react';

class Searchbar extends Component {
  state = {
    inputValue: '', // Инициализация состояния для значения ввода
  };

  render() {
    return (
      <header className="searchbar">
        <form className="searchForm" onSubmit={this.props.onSearch}>
          <button type="submit" className="button">
            <span className="buttonLabel">Поиск</span>
          </button>
          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Искать изображения и фотографии"
            value={this.state.inputValue}
            onChange={e => this.setState({ inputValue: e.target.value })}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
