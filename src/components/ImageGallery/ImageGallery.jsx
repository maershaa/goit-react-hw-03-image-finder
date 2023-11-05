import React from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ photos }) => (
  <ul className="imageGallery">
    {photos.map(photo => (
      <ImageGalleryItem
        key={photo.id}
        largeImageURL={photo.largeImageURL}
        webformatURL={photo.webformatURL}
        tags={photo.tags}
      />
    ))}
  </ul>
);

export default ImageGallery;
