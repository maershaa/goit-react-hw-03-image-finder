import React, { Component } from 'react';
import Loader from '../Loader/Loader';

class Button extends Component {
  state = {
    imagesToLoad: 12, // Количество изображений для загрузки при нажатии кнопки
  };

  onLoadMoreButtonClick = () => {
    const { imagesToLoad } = this.state;
    const { photos, onLoadMore } = this.props;

    const newImages = photos.slice(0, imagesToLoad);

    onLoadMore(newImages); // Убедитесь, что вызывается переданный обработчик onLoadMore

    this.setState(prevState => ({
      imagesToLoad: prevState.imagesToLoad + imagesToLoad,
    }));
  };

  render() {
    const { isLoading, photos } = this.props;

    const shouldHideButton = isLoading || photos.length === 0;

    return (
      <button
        className="LoadMoreBtn"
        onClick={this.onLoadMoreButtonClick}
        disabled={shouldHideButton}
      >
        Load More
        {isLoading && <Loader />}
      </button>
    );
  }
}

export default Button;
