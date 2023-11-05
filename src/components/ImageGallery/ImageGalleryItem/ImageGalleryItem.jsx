import React, { Component } from 'react';

export default class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
    modalData: {
      largeImg: '',
      tag: '',
    },
  };

  openModal = (largeImageURL, tags) => {
    console.log('Opening modal');
    this.setState({
      isModalOpen: true,
    });
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props;

    return (
      <li
        className="imageGalleryItem"
        onClick={() => this.openModal(largeImageURL, tags)}
      >
        <img src={webformatURL} alt={tags} />
      </li>
    );
  }
}
