import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ExpandArrow from '../img/arrow-down-icon.png';
import { IFilmListDataResults } from '../actions/actionCreators/actionCreatorsTypes/FilmActionCreatorsTypes';

const FilmCardWrapper = styled.div`
  width: 400px;
  height: auto;
  text-align: center;
  margin: 10px;
  overflow: hidden;
  box-shadow: 0 10px 50px rgba(0,0,0,0.19), 0 6px 50px rgba(0,0,0,0.23);  
  border-radius: 4px;
`
const FilmCardImgDescription = styled.div`
  position: absolute;
  left: -100%;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  transition: .3s;
  
  h4 {
    color: #fff;
    font-weight: 400;
    font-size: 25px;
  }
`
const FilmCardImg = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 250px;
  border-radius: 4px 4px 0 0;
  overflow: hidden;
  
  &:hover ${FilmCardImgDescription} {
    left: 0;
  }
  
  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`
const FilmInfo = styled.div`
  width: 100%;
  text-align: center;
`
const FilmInfoTitle = styled.h2`
  font-weight: 400;
`
const FilmInfoDescription = styled.p`
  padding-left: 12px;
  padding-right: 12px;
`

interface IFilmCard {
  film: IFilmListDataResults
}

const FilmCard: React.FC<IFilmCard> = (props) => {
  const { id, backdrop_path, release_date, vote_average, title, overview } = props.film;

  return (
    <FilmCardWrapper>
      <FilmCardImg>
        <img
          src={backdrop_path ?
          `https://image.tmdb.org/t/p/w500${backdrop_path}` :
          'https://via.placeholder.com/400x250.png?text=Image+not+found'}
          alt="Film preview"
        />
        <FilmCardImgDescription>
          <h4>Дата выхода: {release_date}</h4>
          <h4>Оценка: {vote_average}</h4>
        </FilmCardImgDescription>
      </FilmCardImg>
      <FilmInfo>
        <FilmInfoTitle>{title}</FilmInfoTitle>
        <FilmInfoDescription>{overview.length >= 200 ? `${overview.slice(0, 200)}...` : overview}</FilmInfoDescription>
        <Link to={`/film/${id}`}>
          <img src={ExpandArrow} alt="open"/>
        </Link>
      </FilmInfo>
    </FilmCardWrapper>
  )
}

export default FilmCard;
