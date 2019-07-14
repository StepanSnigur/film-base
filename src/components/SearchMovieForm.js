import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import WithService from '../hoc/WithService';
import SearchedFilmsList from './SearchedFilmsList';

import { searchFilm } from '../actionCreators/ActionCreators';


let SearchFilmWrapper = styled.div`
    width: 400px;
    margin: 0 auto;
    position: relative;
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
            <SearchFilmInput onChange={(e) => getSearchInputLength(e.target.value.length)} onInput={(event) => searchFilm(event)} type="text" placeholder="Enter film title"/>
            <SearchedFilmsList inputLength={searchInputLength} />
        </SearchFilmWrapper>
    );
}

export default WithService(connect(null, { searchFilm })(SearchMovieForm));