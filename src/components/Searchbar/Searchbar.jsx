import React from 'react';
import {
  SearchFormBtn,
  SearchForm,
  SeacrHeader,
  SearchInput,
} from './Searchbar.styled';
import { useForm } from 'react-hook-form';

const Searchbar = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();
  return (
    <SeacrHeader>
      <SearchForm
        autoComplete="off"
        onSubmit={handleSubmit(data => {
          onSubmit(data.search);
        })}
      >
        <SearchFormBtn type="submit"></SearchFormBtn>
        <SearchInput
          {...register('search', {
            register: true,
            required: 'This is required',
          })}
          name="search"
          type="text"
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SeacrHeader>
  );
};

export default Searchbar;
