import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import ErrorBoundary from '../hoc/ErrorBoundary';
import LoadingBoundary from '../hoc/LoadingBoundary';
import ActionButtons from '../components/ActionButtons';
import FilmReviews from '../components/FilmReviews';
import SimilarFilmsSlider from '../components/SimilarFilmsSlider';
import FilmVideos from '../components/FilmVideos';

import { setCurrentFilm } from '../actions/FilmActions';
import { markAsFavourite, addToWatchlist, changeFilmRating, deleteFilmRating } from '../actions/UserActions';

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
        } = this.props.currentFilm;
        let {
            favorite,
            watchlist,
            rated
        } = this.props.currentFilm.filmStates;
        let {
            history,
            isLogged,
            sessionId,
            userId,
            filmId,
            addToWatchlist,
            changeFilmRating,
            deleteFilmRating
        } = this.props;

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
                                    <ActionButtons
                                        sessionId={sessionId}
                                        userId={userId}
                                        id={filmId}
                                        isLogged={isLogged}
                                        isFavourite={favorite}
                                        isWatchlist={watchlist}
                                        isError={isFilmStatesError}
                                        isInFavouriteLoading={isInFavouriteLoading}
                                        isFilmButtonsLoading={isFilmButtonsLoading}
                                        isInWatchlistLoading={isInWatchlistLoading}
                                        rating={rated.value}
                                        changeRating={changeFilmRating}
                                        deleteRating={deleteFilmRating}
                                        addToWatchlist={addToWatchlist}
                                    />
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

export default connect(mapStateToProps, { setCurrentFilm, markAsFavourite, addToWatchlist, changeFilmRating, deleteFilmRating })(FilmPage);