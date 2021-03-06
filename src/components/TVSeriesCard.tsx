import React from 'react';
import { IFilmListDataResults } from '../actions/actionCreators/actionCreatorsTypes/FilmActionCreatorsTypes';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ExpandArrow from '../img/arrow-down-icon.png';

const TVSeriesCardWrapper = styled.div`
  width: 400px;
  height: auto;
  text-align: center;
  margin: 10px;
  overflow: hidden;
  box-shadow: 0 10px 50px rgba(0,0,0,0.19), 0 6px 50px rgba(0,0,0,0.23);  
  border-radius: 4px;
`
const TVSeriesCardImgDescription = styled.div`
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
const TVSeriesCardImg = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 250px;
  border-radius: 4px 4px 0 0;
  overflow: hidden;
  
  &:hover ${TVSeriesCardImgDescription} {
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
const TVSeriesInfo = styled.div`
  width: 100%;
  text-align: center;
`
const TVSeriesInfoTitle = styled.h2`
  font-weight: 400;
`
const TVSeriesInfoDescription = styled.p`
  padding-left: 12px;
  padding-right: 12px;
`

interface ITVSeriesCard {
  film: IFilmListDataResults
}

const TVSeriesCard: React.FC<ITVSeriesCard> = ({ film }) => {
  const {id, backdrop_path, first_air_date, vote_average, name, overview} = film;

  return (
    <TVSeriesCardWrapper>
      <TVSeriesCardImg>
        <img
          src={backdrop_path ?
            `https://image.tmdb.org/t/p/w500${backdrop_path}` :
            'https://via.placeholder.com/400x250.png?text=Image+not+found'}
          alt="TV series preview"
        />
        <TVSeriesCardImgDescription>
          <h4>Дата выхода: {first_air_date}</h4>
          <h4>Оценка: {vote_average}</h4>
        </TVSeriesCardImgDescription>
      </TVSeriesCardImg>
      <TVSeriesInfo>
        <TVSeriesInfoTitle>{name}</TVSeriesInfoTitle>
        <TVSeriesInfoDescription>{overview.length >= 200 ? `${overview.slice(0, 200)}...` : overview}</TVSeriesInfoDescription>
        <Link
          to={{
            pathname: `/tv-series/${id}`,
            state: { title: name }
          }}
        >
          <img src={ExpandArrow} alt="open"/>
        </Link>
      </TVSeriesInfo>
    </TVSeriesCardWrapper>
  )
}

export default TVSeriesCard;
