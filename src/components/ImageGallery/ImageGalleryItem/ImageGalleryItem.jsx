import React from 'react';

const ImageGalleryItem = ({ photo }) => (
  <li className="galleryItem">
    <img src={photo.webformatURL} alt={photo.tags} />
  </li>
);

export default ImageGalleryItem;
