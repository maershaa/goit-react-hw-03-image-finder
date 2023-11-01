import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

import fetchPhotos from '../helpers/api';

class App extends Component {
  state = {
    photos: null, // Состояние для хранения фотографий
    isLoading: false, // Состояние для отображения индикатора загрузки
    error: null, // Состояние для хранения сообщения об ошибке (если есть)
    inputValue: '', // Состояние для хранения поискового запроса
    currentPage: 1, //  состояние для текущей страницы
    selectedPhoto: null, //  состояние для выбранного изображения
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
  async fetchAndSetPhotos(query, page = 1) {
    try {
      // Устанавливаем isLoading в true перед началом запроса
      this.setState({ isLoading: true });

      // Выполняем запрос к API с переданным поисковым запросом и номером страницы
      const data = await fetchPhotos(query, page);

      // При успешном запросе, добавляем новые фотографии к текущим
      const currentPhotos = this.state.photos || []; // Существующие фотографии
      const newPhotos = data.hits; // Новые фотографии
      const updatedPhotos = [...currentPhotos, ...newPhotos]; // Объединяем их

      this.setState({ photos: updatedPhotos, error: null });
    } catch (error) {
      // В случае ошибки сохраняем сообщение об ошибке и очищаем фотографии
      this.setState({ error: error.message, photos: null });
    } finally {
      // В любом случае завершаем запрос, сбрасывая флаг isLoading
      this.setState({ isLoading: false });
    }
  }

  // Обработчик для кнопки "Загрузить еще"
  loadMoreImages = () => {
    const { inputValue, currentPage } = this.state;
    const nextPage = currentPage + 1; // Увеличиваем текущую страницу на 1
    this.fetchAndSetPhotos(inputValue, nextPage); // Вызываем запрос для следующей страницы
    this.setState({ currentPage: nextPage }); // Обновляем текущую страницу
  };

  // Обработчик клика на изображение в галерее
  handleImageClick = photo => {
    // При клике на изображение, обновляем состояние выбранного изображения
    this.setState({ selectedPhoto: photo });
  };

  // Метод для закрытия модального окна
  closeModal = () => {
    this.setState({ selectedPhoto: null });
  };

  render() {
    // Деструктуризация для упрощения доступа к состояниям
    const { error, isLoading, photos, selectedPhoto } = this.state;
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
            <Button
              photos={photos}
              isLoading={isLoading}
              onLoadMore={this.loadMoreImages}
              onNoMoreResults={this.handleNoMoreResults}
            />
          </>
        )}

        {selectedPhoto && ( // Если есть выбранное изображение, отображаем модальное окно
          <Modal modalData={selectedPhoto} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}

export default App;
