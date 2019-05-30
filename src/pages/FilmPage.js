import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Preloader from '../components/Preloader';
import FilmReviews from '../components/FilmReviews';
import SimilarFilmsSlider from '../components/SimilarFilmsSlider';

let FilmCardWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 70px;
    
    @media (max-width: 1300px) {
        width: 500px;
        flex-direction: column;
        justify-content: center;
        margin: 0 auto;
    }
`
let FilmCardInfo = styled.div`
    width: 50%;
    
    @media (max-width: 1300px) {
        width: 100%;
    }
`
let FilmTitle = styled.h1`
    border-bottom: 2px solid #eee;
`
let FilmOverview = styled.p`
    border-bottom: 2px solid #eee;
    padding-bottom: 20px;
`
let GoBackBtn = styled.button`
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

class FilmPage extends Component {
    state = {
        isLoading: true
    }

    componentDidMount() {
        this.setCurrentFilm(this.props.filmId);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.filmId !== this.props.filmId) {
            this.setCurrentFilm(this.props.filmId);
        }
    }

    setCurrentFilm = async (id) => {
        this.setState({isLoading: true});
        let { service, setCurrentFilm } = this.props;
        let filmData = await service.getFilm(id);
        let filmReviews = await service.getFilmReviews(id);
        let similarFilms = await service.getSimilarFilms(id);
        setCurrentFilm({
            film: filmData,
            reviews: filmReviews,
            similar: similarFilms
        });
        this.setState({isLoading: false});
    }

    render() {
        let { film } = this.props.currentFilm;
        return (
            <>
                {this.state.isLoading ?
                    <Preloader /> :
                    <div>
                        <FilmCardWrapper>
                            <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt="film"/>
                            <FilmCardInfo>
                                <FilmTitle>{film.title}</FilmTitle>
                                <h2>{film.tagline}</h2>
                                <FilmOverview>{film.overview}</FilmOverview>
                                <h3>Vote: {film.vote_average}</h3>
                                <h3>Votes count: {film.vote_count}</h3>
                                <h3>Release: {film.release_date}</h3>
                                <h3>Budget: {film.budget}$</h3>
                                <h3>Status: {film.status}</h3>
                            </FilmCardInfo>
                        </FilmCardWrapper>
                        <FilmReviews />
                        <SimilarFilmsSlider />
                    </div>
                }
                <GoBackBtn onClick={this.props.history.goBack}>Go back</GoBackBtn>
            </>
        );
    }
}

let mapStateToProps = ({ currentFilm }) => {
    return {
        currentFilm
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        setCurrentFilm: (film) => dispatch({type: 'SET_CURRENT_FILM', payload: film})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmPage);