import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import ErrorBoundary from '../hoc/ErrorBoundary';
import LoadingBoundary from '../hoc/LoadingBoundary';
import ActionButtons from '../components/ActionButtons';

import { setCurrentTVSeries } from '../actions/TVSeriesActions';
import { changeTVSeriesRating, deleteTVSeriesRating } from '../actions/UserActions';

let TVSeriesCardWrapper = styled.div`
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
let TVSeriesCardInfo = styled.div`
    width: 50%;
    
    @media (max-width: 1300px) {
        width: 100%;
    }
`
let TVSeriesTitle = styled.h1`
    border-bottom: 2px solid #eee;
`
let TVSeriesOverview = styled.p`
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

class TVSeriesPage extends Component {
    componentDidMount() {
        let { tvSeriesId, sessionId } = this.props;
        this.props.setCurrentTVSeries(tvSeriesId, sessionId);
    }

    render() {
        let { isLoading, isError, isTVSeriesButtonsLoading } = this.props.currentTVSeries;
        let {
            poster_path,
            name,
            overview,
            vote_average,
            vote_count,
            first_air_date,
            status,
            id
        } = this.props.currentTVSeries.tvSeries;
        let {
            favorite,
            rated,
            watchlist
        } = this.props.currentTVSeries.tvSeriesStates;
        let {
            isInFavouriteLoading,
            isInWatchlistLoading,
        } = this.props.currentFilm;
        let {
            history,
            isLogged,
            changeTVSeriesRating,
            deleteTVSeriesRating,
            addToWatchlist,
            userId,
            sessionId
        } = this.props;

        let TVSeriesPageContent = () => {
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
                                        addToWatchlist={addToWatchlist}
                                        mediaType={"tv"}
                                    />
                                </TVSeriesCardInfo>
                            </TVSeriesCardWrapper>
                        </div>
                    </LoadingBoundary>
                    <GoBackBtn onClick={history.goBack}>Назад</GoBackBtn>
                </>
            )
        }

        return (
            <ErrorBoundary isError={isError}>
                <TVSeriesPageContent />
            </ErrorBoundary>
        );
    }
}

let mapStateToProps = ({ currentTVSeries, user, currentFilm }) => {
    return {
        currentTVSeries,
        currentFilm,
        isLogged: user.isLogged,
        sessionId: user.sessionId,
        userId: user.userId,
    }
}

export default connect(mapStateToProps, { setCurrentTVSeries, changeTVSeriesRating, deleteTVSeriesRating })(TVSeriesPage);