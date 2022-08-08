import React from 'react';
import Searchbar from '../Searchbar/Searchbar';
import searchAPI from '../Servises/SearchApi';
import ImageGallery from '../ImageGalery/ImageGallery';
import { Loading, LoadingContainer, ContainerLoadMore } from './App.styled';
import LoadButton from 'components/LoadButton/LoadButton';
import ModalView from 'components/Modal/Modal';
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResult, setSearchResult] = useState([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');
  const [index, setIndex] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentQuery === '') {
      return;
    }
    setSearchResult([]);
    handleSearch();
    // eslint-disable-next-line
  }, [currentQuery]);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const search = await searchAPI(currentQuery, currentPage);
      setSearchResult(prevState => [...prevState, ...search]);
      setCurrentPage(currentPage + 1);
    } catch (error) {
      Notiflix.Notify.warning('Something goes wrong:( Try again');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitHandler = currentQuery => {
    setCurrentQuery(currentQuery);
    setCurrentPage(1);
  };

  const toggleModal = () => {
    setLargeImageURL('');
    setIndex('');
  };

  const getLargeImg = img => {
    setLargeImageURL(img);
  };

  const findCurrentIndex = () => {
    const index = searchResult
      .map(el => el.largeImageURL)
      .indexOf(largeImageURL);
    setIndex(index);
  };

  const changeURL = value => {
    setIndex(prevIndex => prevIndex + value);    
    setLargeImageURL(searchResult[index + value].largeImageURL);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmitHandler} />
      <ImageGallery items={searchResult} getLargeImg={getLargeImg} />
      {isLoading && (
        <LoadingContainer>
          <Loading color="#d13411" />
        </LoadingContainer>
      )}

      {searchResult.length > 0 && (
        <ContainerLoadMore>
          <LoadButton onClick={handleSearch}></LoadButton>
        </ContainerLoadMore>
      )}
      {largeImageURL.length > 0 && (
        <ModalView
          onClose={toggleModal}
          largeImageURL={largeImageURL}
          changeURL={changeURL}
          findCurrentIndex={findCurrentIndex}
        ></ModalView>
      )}
    </>
  );
};

export default App;
