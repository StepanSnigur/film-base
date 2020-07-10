import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../store/Store';
import { History } from 'history';
import { ICurrentFilmReducer } from '../reducers/FilmPageReducer';
import styled from 'styled-components';

import ErrorBoundary from '../hoc/ErrorBoundary';
import LoadingBoundary from '../hoc/LoadingBoundary';
import ActionButtons from '../components/ActionButtons';
import FilmReviews from '../components/FilmReviews';
import SimilarFilmsSlider from '../components/SimilarFilmsSlider';
import FilmVideos from '../components/FilmVideos';

import { setCurrentFilm } from '../actions/FilmActions';
import { changeFilmRating, deleteFilmRating } from '../actions/UserActions';
import { addLastPage, removeLastPage } from '../actions/actionCreators/HistoryReducerActionCreators'

const FilmCardWrapper = styled.div`
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
const FilmCardInfo = styled.div`
  width: 50%;
  
  @media (max-width: 1300px) {
    width: 100%;
  }
`
const FilmTitle = styled.h1`
  border-bottom: 2px solid #eee;
`
const FilmOverview = styled.p`
  border-bottom: 2px solid #eee;
  padding-bottom: 20px;
`
const GoBackBtn = styled.button`
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

interface IFilmPage {
  sessionId: string | null,
  userId: number | null,
  isLogged: boolean,
  filmId: number,
  currentFilm: ICurrentFilmReducer,
  setCurrentFilm: (filmId: number, sessionId: string | null) => void,
  changeFilmRating: (sessionId: string, filmId: number, rating: number) => void,
  deleteFilmRating: (sessionId: string, filmId: number) => void,
  addLastPage: (url: string) => void,
  removeLastPage: () => void,
  history: History
}

class FilmPage extends Component<IFilmPage> {
  componentDidMount() {
    const { sessionId, filmId, setCurrentFilm, addLastPage } = this.props;
    setCurrentFilm(filmId, sessionId);
    addLastPage(window.location.pathname)
  }
  componentDidUpdate(prevProps: IFilmPage) {
    if (prevProps.filmId !== this.props.filmId) {
      const { sessionId, filmId, setCurrentFilm, addLastPage } = this.props;
      setCurrentFilm(filmId, sessionId);
      addLastPage(window.location.pathname)
    }
  }
  componentWillUnmount() {
    const { removeLastPage } = this.props
    const path = window.location.pathname
    if (path !== '/authForm') removeLastPage()
  }

  render() {
    const {
      film,
      reviews,
      isLoading,
      error,
      isInFavouriteLoading,
      isInWatchlistLoading,
      isFilmButtonsLoading,
      isFilmStatesError,
    } = this.props.currentFilm;
    const {
      favorite,
      watchlist,
      rated
    } = this.props.currentFilm.filmStates;
    const {
      history,
      isLogged,
      sessionId,
      userId,
      filmId,
      changeFilmRating,
      deleteFilmRating
    } = this.props;

    return (
      <ErrorBoundary isError={error}>
        <LoadingBoundary isLoading={isLoading}>
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
              />
            </FilmCardInfo>
          </FilmCardWrapper>
          <FilmVideos/>
          <FilmReviews reviews={reviews}/>
          <SimilarFilmsSlider/>
        </LoadingBoundary>
        <GoBackBtn onClick={history.goBack}>Назад</GoBackBtn>
      </ErrorBoundary>
    )
  }
}

const mapStateToProps = ({ currentFilm, user }: AppStateType) => {
  return {
    currentFilm,
    isLogged: user.isLogged,
    sessionId: user.sessionId,
    userId: user.userId,
    favouriteMovies: user.favouriteMovies,
    watchList: user.watchList
  }
}

export default connect(mapStateToProps, {
  setCurrentFilm,
  changeFilmRating,
  deleteFilmRating,
  addLastPage,
  removeLastPage
})(FilmPage);
