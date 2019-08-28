import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ErrorIndicator from './ErrorIndicator';

let SearchedFilmsWrapper = styled.div`
    position: absolute;
    left: 0;
    top: 39px;
    width: 100%;
    border: 2px solid #eee;
    border-radius: 0 0 5px 5px;
    z-index: 99;
    background: #fff;
    box-sizing: border-box;
    
    ${({isInputEmpty}) => isInputEmpty && `
        display: none;
    `}
`
let SearchedFilmsWrapperItem = styled(Link)`
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 2px solid #eee;
    font-size: 18px;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    color: #000;
    text-decoration: none;
    
    img {
        height: 60px;
    }
    h3 {
        margin-left: 20px;
    }
    &:last-child: {
        border-bottom: none;
    }
`

let SearchedFilmsList = (props) => {
    let searchedFilmsList = props.searchFilms.results;
    let isError = props.searchFilms.error;
    let { inputLength, clearInput } = props;

    let SearchedFilmsListContent = () => {
        return (
            <SearchedFilmsWrapper isInputEmpty={inputLength === 0}>
                {
                    searchedFilmsList.slice(0, 5).map((el) => {
                        return (
                            <SearchedFilmsWrapperItem to={`/film/${el.id}`} onClick={clearInput} key={el.id}>
                                <img src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} alt="Film preview"/>
                                <h3>{el.title}</h3>
                            </SearchedFilmsWrapperItem>
                        )
                    })
                }
            </SearchedFilmsWrapper>
        )
    }

    return (
        <>
            {
                isError ?
                <SearchedFilmsWrapper isInputEmpty={inputLength === 0}>
                    <ErrorIndicator />
                </SearchedFilmsWrapper> :
                <SearchedFilmsListContent />
            }
        </>
    )
}

let mapStateToProps = ({ searchFilms }) => {
    return {
        searchFilms
    }
}

export default connect(mapStateToProps)(SearchedFilmsList);