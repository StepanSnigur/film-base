import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { markAsFavourite, addToWatchlist } from '../actions/UserActions';

import ErrorBoundary from '../hoc/ErrorBoundary';
import Rating from 'react-rating';
import Star from '../img/star.png';
import StarActive from '../img/star-active.png';
import CirclePreloader from './CirclePreloader';
import CheckMark from '../img/checkmark.png';

const FilmButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  
  @media (max-width: 900px) {
    flex-direction: column;
    
    button {
      margin: 12px auto 0 auto;
    }
  }
`
const FavouriteButton = styled.button`
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
  
  ${(props: { isFavourite: boolean }) => props.isFavourite && `
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
  ${({ disabled }) => disabled && `
    cursor: not-allowed;
  `}
`
const WatchListButton = styled.button`
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
  
  ${(props: { isInWatchList: boolean }) => props.isInWatchList && `
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
  ${({ disabled }) => disabled && `
    cursor: not-allowed;
  `}
`
const DeleteRatingButton = styled.button`
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
  
  ${({disabled}) => disabled && `
    cursor: not-allowed;
  `}
`
const StarIcon = styled.img`
  margin-right: 4px;
  
  &:last-child {
    margin-right: 0;
  }
  
  @media (max-width: 500px) {
    width: 30px;
  }
`

interface IActionButtons {
  sessionId: string | null,
  userId: number | null,
  id: number,
  isLogged: boolean,
  isFavourite: boolean,
  isWatchlist: boolean,
  isError: boolean | string,
  isInFavouriteLoading: boolean,
  isFilmButtonsLoading: boolean,
  isInWatchlistLoading: boolean,
  rating?: number,
  changeRating: (sessionId: string, filmId: number, rating: number) => void,
  deleteRating: (sessionId: string, filmId: number) => void,
  markAsFavourite: (userId: number, sessionId: string, filmId: number, isAdding: boolean, mediaType?: string) => void,
  addToWatchlist: (userId: number, sessionId: string, filmId: number, isAdding: boolean, mediaType?: string) => void,
  mediaType?: string
}

const ActionButtons: React.FC<IActionButtons> = props => {
  const {
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
    changeRating,
    deleteRating,
    markAsFavourite,
    addToWatchlist,
    mediaType
  } = props;

  return (
    <>
      {isLogged && <ErrorBoundary isError={isError}>
        <Rating
          initialRating={rating}
          stop={10}
          emptySymbol={<StarIcon src={Star} alt="star" className="icon" />}
          fullSymbol={<StarIcon src={StarActive} alt="star" className="icon" />}
          onClick={(rating) => changeRating(sessionId!, id, rating)}
          readonly={isFilmButtonsLoading}
        />
        <FilmButtonsWrapper>
          <FavouriteButton
            onClick={
              isFavourite ?
                () => markAsFavourite(userId!, sessionId!, id, false, mediaType) :
                () => markAsFavourite(userId!, sessionId!, id, true, mediaType)
            }
            isFavourite={isFavourite}
            disabled={isFilmButtonsLoading}
          >
            {isInFavouriteLoading ? <CirclePreloader /> : 'В избранные'}
          </FavouriteButton>
          <WatchListButton
            onClick={
              isWatchlist ?
                () => addToWatchlist(userId!, sessionId!, id, false, mediaType) :
                () => addToWatchlist(userId!, sessionId!, id, true, mediaType)
            }
            isInWatchList={isWatchlist}
            disabled={isFilmButtonsLoading}
          >
            {isInWatchlistLoading ? <CirclePreloader /> : 'Посмотреть позже'}
          </WatchListButton>
          {rating &&
          <DeleteRatingButton
              onClick={() => deleteRating(sessionId!, id)}
              disabled={isFilmButtonsLoading}
          >
              Удалить оценку
          </DeleteRatingButton>}
        </FilmButtonsWrapper>
      </ErrorBoundary>}
    </>
  )
}

export default connect(null, { markAsFavourite, addToWatchlist })(ActionButtons);
