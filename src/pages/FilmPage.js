import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import ErrorBoundary from '../hoc/ErrorBoundary';
import LoadingBoundary from '../hoc/LoadingBoundary';
import CirclePreloader from '../components/CirclePreloader';
import FilmReviews from '../components/FilmReviews';
import SimilarFilmsSlider from '../components/SimilarFilmsSlider';
import FilmVideos from '../components/FilmVideos';

import CheckMark from '../img/checkmark.png';
import Star from '../img/star.png';
import StarActive from '../img/star-active.png';

import { setCurrentFilm } from '../actions/FilmActions';
import { markAsFavourite, addToWatchlist, changeFilmRating } from '../actions/UserActions';

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
    @media (max-width: 900px) {
        width: 375px;
    }
    @media (max-width: 500px) {
        width: 345px;
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
    
    @media (max-width: 900px) {
        flex-direction: column;
        
        button {
            margin: 12px auto 0 auto;
        }
    }
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
            content: url(${CheckMark});
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
            content: url(${CheckMark});
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
    
    @media (max-width: 500px) {
        width: 30px;
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
        let {
            film,
            isLoading,
            error,
            isInFavouriteLoading,
            isInWatchlistLoading,
            isFilmButtonsLoading,
            isFilmStatesError,
            filmStates
        } = this.props.currentFilm;
        let {
            history,
            isLogged,
            sessionId,
            userId,
            filmId,
            markAsFavourite,
            addToWatchlist,
            changeFilmRating
        } = this.props;

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
                                onClick={(rating) => changeFilmRating(sessionId, filmId, rating)}
                                readonly={isFilmButtonsLoading}
                            />
                            <FilmButtonsWrapper>
                                <FavouriteButton
                                    onClick={
                                        this.props.currentFilm.filmStates.favorite ?
                                            () => markAsFavourite(userId, sessionId, filmId, false) :
                                            () => markAsFavourite(userId, sessionId, filmId, true)
                                    }
                                    isFavourite={filmStates.favorite}
                                    disabled={isFilmButtonsLoading}
                                >
                                    {isInFavouriteLoading ? <CirclePreloader /> : 'В избранные'}
                                </FavouriteButton>
                                <WatchListButton
                                    onClick={
                                        this.props.currentFilm.filmStates.watchlist ?
                                            () => addToWatchlist(userId, sessionId, filmId, false) :
                                            () => addToWatchlist(userId, sessionId, filmId, true)
                                    }
                                    isInWatchList={filmStates.watchlist}
                                    disabled={isFilmButtonsLoading}
                                >
                                    {isInWatchlistLoading ? <CirclePreloader /> : 'Посмотреть позже'}
                                </WatchListButton>
                                {
                                    filmStates.rated.value &&
                                    <DeleteRatingButton onClick={() => changeFilmRating(sessionId, filmId)} disabled={isFilmButtonsLoading}>
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
                    <LoadingBoundary isLoading={isLoading}>
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
                    </LoadingBoundary>
                    <GoBackBtn onClick={history.goBack}>Назад</GoBackBtn>
                </>
            )
        }

        return (
            <ErrorBoundary isError={error}>
                <FilmPageContent />
            </ErrorBoundary>
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

export default connect(mapStateToProps, { setCurrentFilm, markAsFavourite, addToWatchlist, changeFilmRating })(FilmPage);