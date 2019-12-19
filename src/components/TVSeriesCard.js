import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ExpandArrow from '../img/arrow-down-icon.png';

let TVSeriesCardWrapper = styled.div`
    width: 400px;
    height: auto;
    text-align: center;
    margin: 10px;
    overflow: hidden;
    box-shadow: 0 10px 50px rgba(0,0,0,0.19), 0 6px 50px rgba(0,0,0,0.23);  
    border-radius: 4px;
`
let TVSeriesCardImgDescription = styled.div`
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
let TVSeriesCardImg = styled.div`
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
let TVSeriesInfo = styled.div`
    width: 100%;
    text-align: center;
`
let TVSeriesInfoTitle = styled.h2`
    font-weight: 400;
`
let TVSeriesInfoDescription = styled.p`
    padding-left: 12px;
    padding-right: 12px;
`

let TVSeriesCard = (props) => {

    let { id, backdrop_path, first_air_date, vote_average, name, overview } = props.film;

    return (
        <TVSeriesCardWrapper>
            <TVSeriesCardImg>
                <img src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} alt="Film preview"/>
                <TVSeriesCardImgDescription>
                    <h4>Дата выхода: {first_air_date}</h4>
                    <h4>Оценка: {vote_average}</h4>
                </TVSeriesCardImgDescription>
            </TVSeriesCardImg>
            <TVSeriesInfo>
                <TVSeriesInfoTitle>{name}</TVSeriesInfoTitle>
                <TVSeriesInfoDescription>{overview.length >= 200 ? `${overview.slice(0, 200)}...` : overview}</TVSeriesInfoDescription>
                <Link to={`/tv-series/${id}`}>
                    <img src={ExpandArrow} alt="open" />
                </Link>
            </TVSeriesInfo>
        </TVSeriesCardWrapper>
    )
}

export default TVSeriesCard;