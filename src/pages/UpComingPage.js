import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Preloader from '../components/Preloader';
import ErrorIndicator from '../components/ErrorIndicator';
import ExpandArrow from '../img/arrow-down-icon.png';

import { loadUpComingFilms } from '../actionCreators/ActionCreators';

let UpComingPageContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`
let FilmCard = styled.div`
    width: 400px;
    height: auto;
    text-align: center;
    margin: 10px;
    overflow: hidden;
    box-shadow: 0 10px 50px rgba(0,0,0,0.19), 0 6px 50px rgba(0,0,0,0.23);  
    border-radius: 4px;
`
let FilmCardImgDescription = styled.div`
    position: absolute;
    left: -100%;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    transition: .3s;
    
    h4 {
        color: #fff;
        font-weight: 400;
        font-size: 25px;
    }
`
let FilmCardImg = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 250px;
    border-radius: 4px 4px 0 0;
    overflow: hidden;
    
    &:hover ${FilmCardImgDescription} {
        left: 0;
    }
    
    img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
`
let FilmInfo = styled.div`
    width: 100%;
    text-align: center;
`
let FilmInfoTitle = styled.h2`
    font-weight: 400;
`
let FilmInfoDescription = styled.p`
    padding-left: 12px;
    padding-right: 12px;
`

class UpComingPage extends Component {
    componentDidMount() {
        this.props.loadUpComingFilms();
    }

    render() {
        let filmsList = this.props.upComingFilms.results;
        let { error } = this.props.upComingFilms;

        let UpComingPageContent = () => {
            return (
                <>
                    {
                        filmsList.length === 0 ?
                        <Preloader /> :
                        <div>
                            <h1>Upcoming films:</h1>
                            <UpComingPageContainer>
                                {
                                    filmsList.map((el) => {
                                        return (
                                            <FilmCard key={el.id}>
                                                <FilmCardImg>
                                                    <img src={`https://image.tmdb.org/t/p/w500${el.backdrop_path}`} alt="Film preview"/>
                                                    <FilmCardImgDescription>
                                                        <h4>Release: {el.release_date}</h4>
                                                        <h4>Vote: {el.vote_average}</h4>
                                                    </FilmCardImgDescription>
                                                </FilmCardImg>
                                                <FilmInfo>
                                                    <FilmInfoTitle>{el.title}</FilmInfoTitle>
                                                    <FilmInfoDescription>{el.overview.length >= 200 ? `${el.overview.slice(0, 200)}...` : el.overview}</FilmInfoDescription>
                                                    <Link to={`/film/${el.id}`}>
                                                        <img src={ExpandArrow} alt="open" />
                                                    </Link>
                                                </FilmInfo>
                                            </FilmCard>
                                        )
                                    })
                                }
                            </UpComingPageContainer>
                        </div>
                    }
                </>
            )
        }

        return (
            <>
                {
                    error ?
                    <ErrorIndicator /> :
                    <UpComingPageContent />
                }
            </>
        );
    }
}

let mapStateToProps = ({ upComingFilms }) => {
    return {
        upComingFilms
    }
}

export default connect(mapStateToProps, { loadUpComingFilms })(UpComingPage);
