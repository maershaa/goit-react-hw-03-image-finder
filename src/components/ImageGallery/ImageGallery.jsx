import React from 'react'
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem'

const ImageGallery = ({ photos }) => (
  <div>
    
    <h1>поиск в апи сработал</h1>
   <ul className="gallery">
     
 {photos.map(({ id, largeImageURL, webformatURL, tags }) => (
              <ImageGalleryItem
                  key={id}
                  largeImageURL={largeImageURL}
                  webformatURL={webformatURL}
                  tags={tags}
              />
  ))}
  </ul>

   </div>

)


export default ImageGallery;
