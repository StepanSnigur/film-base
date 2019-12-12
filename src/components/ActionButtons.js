import React from 'react';
import styled from 'styled-components';

import { markAsFavourite, addToWatchlist, changeTVSeriesRating } from '../actions/UserActions';

import ErrorBoundary from '../hoc/ErrorBoundary';
import Rating from 'react-rating';
import Star from '../img/star.png';
import StarActive from '../img/star-active.png';
import CirclePreloader from './CirclePreloader';
import CheckMark from "../img/checkmark.png";
import {connect} from "react-redux";

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
let StarIcon = styled.img`
    margin-right: 4px;
    
    &:last-child {
        margin-right: 0;
    }
    
    @media (max-width: 500px) {
        width: 30px;
    }
`

let ActionButtons = (props) => {
    let {
        sessionId,
        userId,
        id,
        isLogged,
        isFavourite,
        isWatchlist,
        isError,
        isInFavouriteLoading,
        isFilmButtonsLoading,
        isInWatchlistLoading,
        rating,
        markAsFavourite,
        changeFilmRating,
        changeTVSeriesRating,
        addToWatchlist,
        mediaType
    } = props;

    return (
        <ErrorBoundary isError={isError}>
            {
                isLogged &&
                <>
                    <Rating
                        initialRating={rating}
                        stop={10}
                        emptySymbol={<StarIcon src={Star} alt="star" className="icon" />}
                        fullSymbol={<StarIcon src={StarActive} alt="star" className="icon" />}
                        onClick={(rating) => changeFilmRating(sessionId, id, rating)}
                        readonly={isFilmButtonsLoading}
                    />
                    <FilmButtonsWrapper>
                        <FavouriteButton
                            onClick={
                                isFavourite ?
                                    () => markAsFavourite(userId, sessionId, id, false, mediaType) :
                                    () => markAsFavourite(userId, sessionId, id, true, mediaType)
                            }
                            isFavourite={isFavourite}
                            disabled={isFilmButtonsLoading}
                        >
                            {isInFavouriteLoading ? <CirclePreloader /> : 'В избранные'}
                        </FavouriteButton>
                        <WatchListButton
                            onClick={
                                isWatchlist ?
                                    () => addToWatchlist(userId, sessionId, id, false, mediaType) :
                                    () => addToWatchlist(userId, sessionId, id, true, mediaType)
                            }
                            isInWatchList={isWatchlist}
                            disabled={isFilmButtonsLoading}
                        >
                            {isInWatchlistLoading ? <CirclePreloader /> : 'Посмотреть позже'}
                        </WatchListButton>
                        {
                            rating &&
                            <DeleteRatingButton
                                onClick={() => {
                                    return mediaType === "tv" ?
                                            changeTVSeriesRating(sessionId, id) :
                                            changeFilmRating(sessionId, id)
                                }}
                                disabled={isFilmButtonsLoading}
                            >
                                Удалить оценку
                            </DeleteRatingButton>
                        }
                    </FilmButtonsWrapper>
                </>
            }
        </ErrorBoundary>
    )
}

export default connect(null, { markAsFavourite, addToWatchlist, changeTVSeriesRating })(ActionButtons);