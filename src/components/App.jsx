import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar'; // Импортируем компонент поисковой строки
import ImageGallery from './ImageGallery/ImageGallery'; // Импортируем компонент галереи изображений
import Loader from './Loader/Loader'; // Импортируем компонент индикатора загрузки
import Button from './Button/Button'; // Импортируем компонент кнопки "Загрузить еще"

import fetchPhotos from '../helpers/api'; // Импортируем функцию fetchPhotos для выполнения запросов к API

class App extends Component {
  state = {
    photos: null, // Состояние для хранения фотографий
    isLoading: false, // Состояние для отображения индикатора загрузки
    error: null, // Состояние для хранения сообщения об ошибке (если есть)
    inputValue: '', // Состояние для хранения поискового запроса
  };

  // Обработчик изменения значения поискового запроса
  handleInputChange = value => {
    this.setState({ inputValue: value });
  };

  // Обработчик отправки формы поиска
  handleSubmit = event => {
    const inputValue = this.state.inputValue.trim();
    if (inputValue === '') {
      // Предотвращаем отправку пустого запроса
      return;
    }
    this.fetchAndSetPhotos(inputValue);
  };

  // Функция для выполнения запроса и обновления фотографий
  async fetchAndSetPhotos(query) {
    try {
      // Устанавливаем isLoading в true перед началом запроса
      this.setState({ isLoading: true });

      // Выполняем запрос к API с переданным поисковым запросом
      const data = await fetchPhotos(query);

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
  // componentDidUpdate(_, prevState) {
  //   if (prevState.inputValue !== this.state.inputValue) {
  //     // При изменении inputValue вызываем функцию для выполнения запроса и обновления фотографий
  //     this.fetchAndSetPhotos(this.state.inputValue);
  //   }
  // }

  render() {
    // Деструктуризация для упрощения доступа к состояниям
    const { error, isLoading, photos } = this.state;
    return (
      <>
        {/* Компонент поисковой строки с передачей обработчиков событий */}
        <Searchbar
          onInputChange={this.handleInputChange}
          onSearch={this.handleSubmit}
        />

        {/* Отображаем сообщение об ошибке, если ошибка не равна null */}
        {error !== null && (
          <p className="errorBage">
            Oops, some error occurred... Error message: {error}
          </p>
        )}

        {/* Отображаем индикатор загрузки, если isLoading равно true */}
        {isLoading && <Loader />}

        {/* Отображаем галерею изображений, если фотографии не равны null и их количество больше 0 */}
        {photos && photos.length > 0 && (
          <>
            <ImageGallery photos={photos} />
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
