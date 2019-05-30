import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Preloader from '../components/Preloader';

let PopularFilmsPageContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`
let FilmCard = styled.div`
    width: 400px;
    height: auto;
    text-align: center;
    margin: 10px;
    overflow: hidden;
    box-shadow: 0 10px 50px rgba(0,0,0,0.19), 0 6px 50px rgba(0,0,0,0.23);  
    border-radius: 4px;
`
let FilmCardImgDescription = styled.div`
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
let FilmCardImg = styled.div`
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
let FilmInfo = styled.div`
    width: 100%;
    text-align: center;
`
let FilmInfoTitle = styled.h2`
    font-weight: 400;
`
let FilmInfoDescription = styled.p`
    padding-left: 12px;
    padding-right: 12px;
`

class PopularFilmsPage extends Component {
    componentDidMount() {
        this.loadMostPopularFilms();
    }

    loadMostPopularFilms = async () => {
        let { service, loadMostPopularFilms } = this.props;
        let result = await service.getPopularFilms();
        loadMostPopularFilms(result);
    }

    render() {
        let filmsList = this.props.mostPopularFilms.results;
        return (
            <>
                {
                    filmsList.length === 0 ?
                    <Preloader /> :
                    <div>
                        <h1>Popular films:</h1>
                        <PopularFilmsPageContainer>
                            {
                                filmsList.map((el) => {
                                    return (
                                        <FilmCard key={el.id}>
                                            <FilmCardImg>
                                                <img src={`https://image.tmdb.org/t/p/w500${el.backdrop_path}`} alt="Film preview"/>
                                                <FilmCardImgDescription>
                                                    <h4>Release: {el.release_date}</h4>
                                                    <h4>Vote: {el.vote_average}</h4>
                                                </FilmCardImgDescription>
                                            </FilmCardImg>
                                            <FilmInfo>
                                                <FilmInfoTitle>{el.title}</FilmInfoTitle>
                                                <FilmInfoDescription>{el.overview.length >= 200 ? `${el.overview.slice(0, 200)}...` : el.overview}</FilmInfoDescription>
                                                <Link to={`/film/${el.id}`}>
                                                    <img src="https://cdn.icon-icons.com/icons2/936/PNG/64/angle-arrow-down_icon-icons.com_73683.png" alt="open" />
                                                </Link>
                                            </FilmInfo>
                                        </FilmCard>
                                    )
                                })
                            }
                        </PopularFilmsPageContainer>
                    </div>
                }
            </>
        );
    }
}

let mapStateToProps = ({ mostPopularFilms }) => {
    return {
        mostPopularFilms
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        loadMostPopularFilms: (films) => dispatch({type: 'LOAD_MOST_POPULAR_FILMS', payload: films})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularFilmsPage);