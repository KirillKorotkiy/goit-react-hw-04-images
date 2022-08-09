import React from 'react';
import ImageGalleryItem from 'components/ImageGaleryItem/ImageGalleryItem';
import { ImgGallaryList, ContainerList } from './ImageGallery.styled';
import { memo } from 'react';

function ImageGallery({ items,  getLargeImg }) {
  console.log('image')
  return (
    <ContainerList>
    <ImgGallaryList>
      {items.map(item => (
        <ImageGalleryItem item={item} key={item.id} getLargeImg = {getLargeImg} />
      ))}
    </ImgGallaryList>
    </ContainerList>
  );
}

export default memo(ImageGallery)
