import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import debounce from 'lodash/debounce';

import SearchedFilmsList from './SearchedFilmsList';

import { searchFilm } from '../actions/FilmActions';


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
    let [inputValue, setInputValue] = useState('');
    let inputEl = useRef(null);

    let searchFilm = (e, value) => {
        setInputValue(value);
        if (value.length !== 0) {
            props.searchFilm(value);
        }
    }
    let debouncedFilmSearch = debounce(searchFilm, 300);
    let clearInput = () => {
        setInputValue('');
        inputEl.current.value = '';
    }

    return (
        <SearchFilmWrapper>
            <SearchFilmInput
                onChange={(e) => debouncedFilmSearch(e, e.target.value)}
                type="text"
                ref={inputEl}
                placeholder="Введите название фильма или сериала"
            />
            <SearchedFilmsList inputLength={inputValue.length} clearInput={clearInput} />
        </SearchFilmWrapper>
    );
}

export default connect(null, { searchFilm })(SearchMovieForm);