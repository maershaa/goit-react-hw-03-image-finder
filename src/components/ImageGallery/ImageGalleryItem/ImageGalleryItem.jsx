import React, { Component } from 'react';

export default class ImageGalleryItem extends Component {
  state = {
    isOpenModal: false,
    modalData: {
      largeImg: '',
      tagImg: '',
    },
  };

  openModal = data => {
    this.setState({
      isOpenModal: true,
      modalData: {
        largeImg: data.largeImageURL,
        tagImg: data.tags,
      },
    });
  };

  handleImageClick = () => {
    const { webformatURL, tags, largeImageURL } = this.props;
    this.props.onClick({ webformatURL, tags, largeImageURL });
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props;

    return (
      <li
        className="imageGalleryItem"
        onClick={() => this.openModal({ largeImageURL, tags })}
      >
        <img src={webformatURL} alt={tags} />
      </li>
    );
  }
}
