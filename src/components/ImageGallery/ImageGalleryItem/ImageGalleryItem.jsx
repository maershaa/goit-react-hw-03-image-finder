import React from 'react';

const ImageGalleryItem = ({ id, largeImageURL, webformatURL, tags }) => (
  <li key={id} className="imageGalleryItem">
    <img src={webformatURL} alt={tags} />
  </li>
);

export default ImageGalleryItem;
