import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import SearchedFilmsList from './SearchedFilmsList';

import { searchFilm } from '../actions/Actions';


let SearchFilmWrapper = styled.div`
    width: 400px;
    margin: 0 auto;
    position: relative;
    
    @media (max-width: 500px) {
        width: 100%;
    }
`
let SearchFilmInput = styled.input`
    display: block;
    width: 100%;
    height: 40px;
    border-radius: 5px 5px 0 0;
    border: 2px solid #eee;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 18px;
    box-sizing: border-box;
`
let SearchMovieForm = (props) => {
    let [searchInputLength, getSearchInputLength] = useState(0);

    let searchFilm = async (e) => {
        if (e.target.value.length !== 0) {
            props.searchFilm(e.target.value);
        }
    }

    return (
        <SearchFilmWrapper onSubmit={searchFilm}>
            <SearchFilmInput onChange={(e) => getSearchInputLength(e.target.value.length)} onInput={(event) => searchFilm(event)} type="text" placeholder="Введите название фильма"/>
            <SearchedFilmsList inputLength={searchInputLength} />
        </SearchFilmWrapper>
    );
}

export default connect(null, { searchFilm })(SearchMovieForm);