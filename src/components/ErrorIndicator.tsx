import React from 'react';
import FilmErrorImg from '../img/filmerror.png';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  img {
    width: 64px;
    height: 64px;
    display: block;
    margin: 0 auto;
  }
  h2 {
    text-align: center;
    margin-bottom: 0;
  }
  p {
    text-align: center;
    margin-top: 5px;
  }
`

const ErrorIndicator = () => {
  return (
    <ErrorContainer>
      <img src={FilmErrorImg} alt="Error!"/>
      <h2>Что-то пошло не так</h2>
      <p>мы уже работаем над проблемой</p>
    </ErrorContainer>
  )
}

export default ErrorIndicator;
