import React, { Component } from 'react'
import Searchbar from './Searchbar/Searchbar'
import ImageGallery from './ImageGallery/ImageGallery'
import Loader from './Loader/Loader'
import Button from './Button/Button'
// import Modal from './Modal/Modal'

import fetchPhotos from '../helpers/api'; // Импортируем функцию fetchPhotos


class App extends Component {
  state = {
    photos: null, // Состояние для хранения фотографий
    isLoading: false, // Состояние для отображения загрузки
    error: null, // Состояние для хранения ошибки (если есть)
    inputValue: '', // Состояние для поискового запроса
  };


  // Обработчик изменения поискового запроса
  handleInputChange = (value) => {
    this.setState({ inputValue: value });
    console.log("inputValue in App", value);
  };

  

  // Функция для выполнения запроса и обновления фотографий
  async fetchAndSetPhotos() {
    try {
      const searchQuery = this.state.inputValue;
      // Устанавливаем isLoading в true перед началом запроса
    this.setState({ isLoading: true });
    
      const data = await fetchPhotos(searchQuery);
      // При успешном запросе обновляем состояние фотографий и сбрасываем ошибку
    this.setState({ photos: data, error: null });
    
    } catch (error) {
      // В случае ошибки сохраняем сообщение об ошибке
    this.setState({ error: error.message, photos: null });
    
    } finally {
      // В любом случае завершаем запрос, сбрасывая флаг isLoading
      this.setState({ isLoading: false });
    }
   }

  // Метод жизненного цикла, вызывается при монтировании компонента
  componentDidMount() {
    // Вызываем функцию fetchPhotos() при монтировании компонента для начального запроса
    this.fetchAndSetPhotos();
  }
  


  render() {
    return (
      <div>
<Searchbar onSubmit={this.handleInputChange} />

        {this.state.error !== null && (
          <p className="error-bage">
            Oops, some error occured... Error message: {this.state.error}
          </p>
        )}


        {this.state.isLoading && <Loader />}

        {this.state.photos && this.state.photos.length > 0 && <ImageGallery photos={this.state.photos} />
        }

        <Button />
        {/* <Modal closeModal={this.closeModal}
            modalData={this.state.modalData} /> */}
      </div>
    );
  }
}

export default App;
