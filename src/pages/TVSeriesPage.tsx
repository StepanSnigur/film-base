import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../store/Store';
import { ITVSeriesPageReducer } from '../reducers/TVSeriesPageReducer';
import { ICurrentFilmReducer } from '../reducers/FilmPageReducer';
import { History } from 'history';
import styled from 'styled-components';

import ErrorBoundary from '../hoc/ErrorBoundary';
import LoadingBoundary from '../hoc/LoadingBoundary';
import ActionButtons from '../components/ActionButtons';
import FilmReviews from '../components/FilmReviews';
import NextEpisodeTimeCounter from '../components/NextEpisodeTimeCounter';

import { setCurrentTVSeries } from '../actions/TVSeriesActions';
import { changeTVSeriesRating, deleteTVSeriesRating } from '../actions/UserActions';

const TVSeriesCardWrapper = styled.div`
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
const TVSeriesCardInfo = styled.div`
  width: 50%;
    
  @media (max-width: 1300px) {
    width: 100%;
  }
`
const TVSeriesTitle = styled.h1`
  border-bottom: 2px solid #eee;
`
const TVSeriesOverview = styled.p`
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

interface ITVSeriesPage {
  sessionId: string | null,
  userId: number | null,
  isLogged: boolean,
  tvSeriesId: number,
  currentTVSeries: ITVSeriesPageReducer,
  currentFilm: ICurrentFilmReducer,
  setCurrentTVSeries: (tvSeriesId: number, sessionId: string | null) => void,
  changeTVSeriesRating: (sessionId: string, filmId: number, rating: number) => void,
  deleteTVSeriesRating: (sessionId: string, filmId: number) => void,
  history: History
}

class TVSeriesPage extends Component<ITVSeriesPage> {
  componentDidMount() {
    const { tvSeriesId, sessionId } = this.props;
    this.props.setCurrentTVSeries(tvSeriesId, sessionId);
  }

  render() {
    const { reviews, isLoading, isError, isTVSeriesButtonsLoading } = this.props.currentTVSeries;
    const {
      poster_path,
      name,
      overview,
      vote_average,
      vote_count,
      first_air_date,
      number_of_seasons,
      number_of_episodes,
      last_episode_to_air,
      next_episode_to_air,
      status,
      id
    } = this.props.currentTVSeries.tvSeries;
    const {
      favorite,
      rated,
      watchlist
    } = this.props.currentTVSeries.tvSeriesStates;
    const {
      isInFavouriteLoading,
      isInWatchlistLoading,
    } = this.props.currentFilm;
    const {
      history,
      isLogged,
      changeTVSeriesRating,
      deleteTVSeriesRating,
      userId,
      sessionId
    } = this.props;

    const TVSeriesPageContent = () => {
      return (
        <>
          <LoadingBoundary isLoading={isLoading}>
            <div>
              <TVSeriesCardWrapper>
                <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="film"/>
                <TVSeriesCardInfo>
                  <TVSeriesTitle>{name}</TVSeriesTitle>
                  <TVSeriesOverview>{overview}</TVSeriesOverview>
                  <h3>Оценка: {vote_average}</h3>
                  <h3>Количество оценок: {vote_count}</h3>
                  <h3>Дата выхода: {first_air_date}</h3>
                  <h3>Статус: {status}</h3>
                  <h3>Количество сезонов: {number_of_seasons}, эпизодов: {number_of_episodes}</h3>
                  <h3>Дата выхода прошлого эпизода: {last_episode_to_air.air_date}</h3>
                  <NextEpisodeTimeCounter date={next_episode_to_air}/>
                  <ActionButtons
                    sessionId={sessionId}
                    userId={userId}
                    id={id}
                    isLogged={isLogged}
                    isFavourite={favorite}
                    isWatchlist={watchlist}
                    isError={false}
                    isInFavouriteLoading={isInFavouriteLoading}
                    isFilmButtonsLoading={isTVSeriesButtonsLoading}
                    isInWatchlistLoading={isInWatchlistLoading}
                    rating={rated.value}
                    changeRating={changeTVSeriesRating}
                    deleteRating={deleteTVSeriesRating}
                    mediaType={"tv"}
                  />
                </TVSeriesCardInfo>
              </TVSeriesCardWrapper>
              <FilmReviews reviews={reviews}/>
            </div>
          </LoadingBoundary>
          <GoBackBtn onClick={history.goBack}>Назад</GoBackBtn>
        </>
      )
    }

    return (
      <ErrorBoundary isError={isError}>
        <TVSeriesPageContent/>
      </ErrorBoundary>
    )
  }
}

let mapStateToProps = ({ currentTVSeries, user, currentFilm }: AppStateType) => {
  return {
    currentTVSeries,
    currentFilm,
    isLogged: user.isLogged,
    sessionId: user.sessionId,
    userId: user.userId,
  }
}

export default connect(mapStateToProps, {
  setCurrentTVSeries,
  changeTVSeriesRating,
  deleteTVSeriesRating
})(TVSeriesPage);
