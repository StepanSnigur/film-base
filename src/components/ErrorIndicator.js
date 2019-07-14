import React from 'react';
import FilmErrorImg from '../img/filmerror.png';
import styled from 'styled-components';

let ErrorContainer = styled.div`
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

let ErrorIndicator = () => {
    return (
        <ErrorContainer>
            <img src={FilmErrorImg} alt="Error!"/>
            <h2>Something has gone terribly wrong</h2>
            <p>please try again later</p>
        </ErrorContainer>
    )
}

export default ErrorIndicator;