import React, { Component } from 'react'


class Searchbar extends Component {
  state = {
    inputValue: '', // Инициализация состояния для значения ввода
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.inputValue); // Вызовите пропс onSubmit из компонента App
  };

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
        console.log('inputValue in SearchBar',event.target.value);
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
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
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
