import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';

import fetchPhotos from '../helpers/api'; // Импортируем функцию fetchPhotos

class App extends Component {
  state = {
    photos: null, // Состояние для хранения фотографий
    isLoading: false, // Состояние для отображения загрузки
    error: null, // Состояние для хранения ошибки (если есть)
    inputValue: '', // Состояние для поискового запроса
  };

  // Обработчик изменения поискового запроса
  handleInputChange = value => {
    this.setState({ inputValue: value });
    console.log('inputValue in App', value);
  };

  // Обработчик отправки формы поиска
  handleSubmit = event => {
    event.preventDefault();
    // Вызываем функцию для выполнения запроса и обновления фотографий
    this.fetchAndSetPhotos(this.state.inputValue);
  };

  // Функция для выполнения запроса и обновления фотографий
  async fetchAndSetPhotos() {
    try {
      const searchQuery = this.state.inputValue;
      // Устанавливаем isLoading в true перед началом запроса
      this.setState({ isLoading: true });

      const data = await fetchPhotos(searchQuery);
      // При успешном запросе обновляем состояние фотографий и сбрасываем ошибку
      this.setState({ photos: data.hits, error: null });
    } catch (error) {
      // В случае ошибки сохраняем сообщение об ошибке и очищаем фотографии
      this.setState({ error: error.message, photos: null });
    } finally {
      // В любом случае завершаем запрос, сбрасывая флаг isLoading
      this.setState({ isLoading: false });
    }
  }

  // Метод жизненного цикла, вызывается при обновлении компонента
  componentDidUpdate(_, prevState) {
    if (prevState.inputValue !== this.state.inputValue) {
      // При изменении inputValue вызываем функцию для выполнения запроса и обновления фотографий
      this.fetchAndSetPhotos();
    }
  }

  render() {
    return (
      <>
        <Searchbar
          onSubmit={this.handleInputChange}
          onSearch={this.handleSubmit}
        />

        {this.state.error !== null && (
          <p className="errorBage">
            Oops, some error occurred... Error message: {this.state.error}
          </p>
        )}

        {this.state.isLoading && <Loader />}

        {this.state.photos && this.state.photos.length > 0 && (
          <>
            <ImageGallery photos={this.state.photos} />
            <Button />
          </>
        )}

        {/* <Modal closeModal={this.closeModal}
            modalData={this.state.modalData} /> */}
      </>
    );
  }
}

export default App;
