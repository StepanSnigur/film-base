import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Preloader from '../components/Preloader';
import CirclePreloader from '../components/CirclePreloader';
import FilmReviews from '../components/FilmReviews';
import SimilarFilmsSlider from '../components/SimilarFilmsSlider';
import FilmVideos from '../components/FilmVideos';

import Checkmark from '../img/checkmark.png';
import Star from '../img/star.png';
import StarActive from '../img/star-active.png';

import { setCurrentFilm, markAsFavourite, addToWatchlist, rateFilm, deleteFilmRating } from '../actions/Actions';
import ErrorIndicator from '../components/ErrorIndicator';

import Rating from 'react-rating';

let FilmCardWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 70px;
    
    @media (max-width: 1300px) {
        width: 500px;
        flex-direction: column;
        justify-content: center;
        margin: 0 auto;
    }
`
let FilmCardInfo = styled.div`
    width: 50%;
    
    @media (max-width: 1300px) {
        width: 100%;
    }
`
let FilmButtonsWrapper = styled.div`
    width: 100%;
    display: flex;
`
let FavouriteButton = styled.button`
    position: relative;
    display: block;
    width: 200px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-top: 15px;
    margin-right: 7px;
    border-radius: 4px;
    border: 3px solid #eee;
    background: none;
    cursor: pointer;
    
    ${({isFavourite}) => isFavourite && `
        &:before {
            content: url(${Checkmark});
            display: block;
            width: 30px;
            height: 30px;
            position: absolute;
            top: 50%;
            left: 10px;
            transform: translateY(-50%);
            z-index: 999;
        }
    `}
`
let WatchListButton = styled.button`
    position: relative;
    display: block;
    width: 200px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-top: 15px;
    margin-right: 7px;
    border-radius: 4px;
    border: 3px solid #eee;
    background: none;
    cursor: pointer;
    
    ${({isInWatchList}) => isInWatchList && `
        &:before {
            content: url(${Checkmark});
            display: block;
            width: 30px;
            height: 30px;
            position: absolute;
            top: 50%;
            left: 10px;
            transform: translateY(-50%);
            z-index: 999;
        }
    `}
`
let DeleteRatingButton = styled.button`
    position: relative;
    display: block;
    width: 200px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-top: 15px;
    margin-right: 0;
    border-radius: 4px;
    border: 3px solid #eee;
    background: none;
    cursor: pointer;
`
let FilmTitle = styled.h1`
    border-bottom: 2px solid #eee;
`
let FilmOverview = styled.p`
    border-bottom: 2px solid #eee;
    padding-bottom: 20px;
`
let GoBackBtn = styled.button`
    display: block;
    width: 200px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 40px;
    margin-top: 15px;
    border-radius: 4px;
    border: 3px solid #eee;
    background: none;
    cursor: pointer;
`
let StarIcon = styled.img`
    margin-right: 4px;
    
    &:last-child {
        margin-right: 0;
    }
`

class FilmPage extends Component {
    componentDidMount() {
        let { sessionId, filmId } = this.props;
        this.props.setCurrentFilm(filmId, sessionId);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.filmId !== this.props.filmId) {
            let { sessionId, filmId } = this.props;
            this.props.setCurrentFilm(filmId, sessionId);
        }
    }

    render() {
        let { film, isLoading, error, isInFavouriteLoading, isInWatchlistLoading, isFilmStatesError, filmStates } = this.props.currentFilm;
        let { isLogged, sessionId, userId, filmId } = this.props;

        let FilmButtons = () => {
            return (
                <>
                    {
                        isLogged &&
                        <>
                            <Rating
                                initialRating={filmStates.rated.value}
                                stop={10}
                                emptySymbol={<StarIcon src={Star} alt="star" className="icon" />}
                                fullSymbol={<StarIcon src={StarActive} alt="star" className="icon" />}
                                onClick={(rating) => this.props.rateFilm(sessionId, filmId, rating)}
                            />
                            <FilmButtonsWrapper>
                                <FavouriteButton
                                    onClick={
                                        this.props.currentFilm.filmStates.favorite ?
                                            () => this.props.markAsFavourite(userId, sessionId, filmId, false) :
                                            () => this.props.markAsFavourite(userId, sessionId, filmId, true)
                                    }
                                    isFavourite={filmStates.favorite}
                                    disabled={isInFavouriteLoading}
                                >
                                    {isInFavouriteLoading ? <CirclePreloader /> : 'В избранные'}
                                </FavouriteButton>
                                <WatchListButton
                                    onClick={
                                        this.props.currentFilm.filmStates.watchlist ?
                                            () => this.props.addToWatchlist(userId, sessionId, filmId, false) :
                                            () => this.props.addToWatchlist(userId, sessionId, filmId, true)
                                    }
                                    isInWatchList={filmStates.watchlist}
                                    disabled={isInWatchlistLoading}
                                >
                                    {isInWatchlistLoading ? <CirclePreloader /> : 'Посмотреть позже'}
                                </WatchListButton>
                                {
                                    filmStates.rated.value &&
                                    <DeleteRatingButton onClick={() => this.props.deleteFilmRating(sessionId, filmId)}>
                                        Удалить оценку
                                    </DeleteRatingButton>
                                }
                            </FilmButtonsWrapper>
                        </>
                    }
                </>
            )
        }

        let FilmPageContent = () => {
            return (
                <>
                    {
                        isLoading ?
                        <Preloader /> :
                        <div>
                            <FilmCardWrapper>
                                <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt="film"/>
                                <FilmCardInfo>
                                    <FilmTitle>{film.title}</FilmTitle>
                                    <h2>{film.tagline}</h2>
                                    <FilmOverview>{film.overview}</FilmOverview>
                                    <h3>Оценка: {film.vote_average}</h3>
                                    <h3>Количество оценок: {film.vote_count}</h3>
                                    <h3>Дата выхода: {film.release_date}</h3>
                                    <h3>Бюджет: {film.budget}$</h3>
                                    <h3>Статус: {film.status}</h3>
                                    {isFilmStatesError ? <span>{isFilmStatesError}</span> : <FilmButtons />}
                                </FilmCardInfo>
                            </FilmCardWrapper>
                            <FilmVideos />
                            <FilmReviews />
                            <SimilarFilmsSlider />
                        </div>
                    }
                    <GoBackBtn onClick={this.props.history.goBack}>Назад</GoBackBtn>
                </>
            )
        }

        return (
            <>
                {
                    error ?
                    <ErrorIndicator/> :
                    <FilmPageContent/>
                }
            </>
        );
    }
}

let mapStateToProps = ({ currentFilm, user }) => {
    return {
        currentFilm,
        isLogged: user.isLogged,
        sessionId: user.sessionId,
        userId: user.userId,
        favouriteMovies: user.favouriteMovies,
        watchList: user.watchList
    }
}

export default connect(mapStateToProps, { setCurrentFilm, markAsFavourite, addToWatchlist, rateFilm, deleteFilmRating })(FilmPage);