import React, { useState } from 'react';
import { IFilmReviews } from '../actions/actionCreators/actionCreatorsTypes/FilmActionCreatorsTypes';
import styled from 'styled-components';

const ReviewWrapper = styled.div`
  width: 800px;
  margin-bottom: 10px;
  padding: 12px;
  border-radius: 4px;
  background: #daf1db;
  
  @media (max-width: 900px) {
    box-sizing: border-box;
    width: 375px;
  }
  @media (max-width: 500px) {
    width: 345px;
  }
`
const ShowReviewsBtn = styled.button`
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

interface IFilmReviewsComponent {
  reviews: IFilmReviews
}

const FilmReviews: React.FC<IFilmReviewsComponent> = ({ reviews }) => {
  const [reviewsLimiter, setReviewsLimiter] = useState(3)
  const reviewsLimit = 3

  const moveReviewsLimiter = () => {
    setReviewsLimiter(reviewsLimiter + reviewsLimit)
  }
  const returnReviewsLimiterToInitial = () => {
    setReviewsLimiter(reviewsLimit)
  }

  const filmReviews = reviews.results;
  const ShowContentBtn = () => {
    return (
      <>
        {filmReviews.length > reviewsLimiter ?
        <ShowReviewsBtn onClick={moveReviewsLimiter}>Развернуть</ShowReviewsBtn> :
        <ShowReviewsBtn onClick={returnReviewsLimiterToInitial}>Скрыть</ShowReviewsBtn>}
      </>
    )
  }

  return (
    <>
      {filmReviews.length > 0 && <div>
        <h2>Отзывы:</h2>
        <div>
          {filmReviews.slice(0, reviewsLimiter).map((el) => {
            return (
              <ReviewWrapper key={el.id}>
                <h3>{el.author}</h3>
                <p>{el.content}</p>
              </ReviewWrapper>
            )
          })}
          {filmReviews.length > reviewsLimit && <ShowContentBtn />}
        </div>
      </div>}
    </>
  )
}

export default FilmReviews;
