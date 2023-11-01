import React, { Component } from 'react';

class Searchbar extends Component {
  state = {
    inputValue: '', // Состояние для хранения значения ввода
  };

  // Обработчик изменения значения инпута
  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
    // Вызываем функцию onInputChange из родительского компонента и передаем значение ввода
    this.props.onInputChange(event.target.value);
  };

  // Обработчик отправки формы
  handleSubmit = event => {
    event.preventDefault();
    // Вызываем функцию onSearch из родительского компонента для выполнения поиска
    this.props.onSearch(this.state.inputValue);
  };

  render() {
    return (
      <header className="searchbar">
        <form className="searchForm" onSubmit={this.handleSubmit}>
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
            // Обновляем состояние при изменении значения инпута
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
