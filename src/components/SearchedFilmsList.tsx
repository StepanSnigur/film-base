import React from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../store/Store';
import { ISearchFilmsReducer } from '../reducers/SearchFilmReducer';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ErrorIndicator from './ErrorIndicator';

const SearchedFilmsWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 39px;
  width: 100%;
  border: 2px solid #eee;
  border-radius: 0 0 5px 5px;
  z-index: 99;
  background: #fff;
  box-sizing: border-box;
`
const SearchedFilmsWrapperItem = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid #eee;
  font-size: 18px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  color: #000;
  text-decoration: none;
  
  img {
    width: 40px;
    height: 60px;
  }
  h3 {
    margin-left: 20px;
  }
  &:last-child: {
    border-bottom: none;
  }
`

interface ISearchedFilmsList {
  searchFilms: ISearchFilmsReducer,
  inputLength: number,
  clearInput: () => void
}

const SearchedFilmsList: React.FC<ISearchedFilmsList> = (props) => {
  const searchedFilmsList = props.searchFilms.results.filter(el => el.media_type !== 'person' && el.poster_path);
  const isError = props.searchFilms.error;
  const { inputLength, clearInput } = props;

  const SearchedFilmsListContent = () => {
    return searchedFilmsList.slice(0, 5).map((el) => {
      return (
        <SearchedFilmsWrapperItem
          to={{
            pathname: el.media_type === 'movie' ? `/film/${el.id}` : `/tv-series/${el.id}`,
            state: { title: el.title || el.name }
          }}
          onClick={clearInput}
          key={el.id}
        >
          <img src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} alt="Film preview"/>
          <h3>{el.title || el.name}</h3>
        </SearchedFilmsWrapperItem>
      )
    })
  }

  return (
    <>
      {inputLength !== 0 && <SearchedFilmsWrapper>
        {isError ?
        <ErrorIndicator/> :
        <div>{SearchedFilmsListContent()}</div>}
      </SearchedFilmsWrapper>}
    </>
  )
}

const mapStateToProps = ({ searchFilms }: AppStateType) => {
  return {
    searchFilms
  }
}

export default connect(mapStateToProps)(SearchedFilmsList);
