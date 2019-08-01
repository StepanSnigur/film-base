import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from "react-router-dom";

let SimilarFilmsWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 200px;
`
let Slides = styled.div`
    width: 100%;
    overflow: hidden;
`
let ScrollLeftBtn = styled.button`
    position: absolute;
    left: -100px;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    color: #000;
    line-height: 50px;
    text-align: center;
    border-radius: 50%;
    border: none;
    background: #eee;
    font-size: 20px;
    cursor: pointer;
    
    @media (max-width: 720px) {
        left: -55px;
    }
`
let ScrollRightBtn = styled.button`
    position: absolute;
    right: -100px;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    color: #000;
    line-height: 50px;
    text-align: center;
    border-radius: 50%;
    border: none;
    background: #eee;
    font-size: 20px;
    cursor: pointer;
    
    @media (max-width: 720px) {
        right: -55px;
    }
`
let SimilarFilmCard = styled.div`
    position: relative;
    width: 150px;
    height: 200px;
    margin-right: 10px;
`
let SimilarFilms = styled.div`
    position: relative;
    display: flex;
    width: 999%;
    transition: .3s;
    left: 0;
`
let SimilarFilmCardImg = styled.img`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
`
let SimilarFilmCardInfo = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    
    h3 {
        text-align: center;
        color: #fff;
    }
    a {
        display: block;
        color: #000;
        width: 80%;
        height: 20px;
        line-height: 20px;
        background: #eee;
        text-decoration: none;
        text-align: center;
        margin: 0 auto;
        margin-bottom: 20px;
        border-radius: 4px;
    }
`

class SimilarFilmsSlider extends Component {
    state = {
        sliderLeftIndent: 0
    }

    sliderScrollLeft = (slidesCount) => {
        let sliderWidth = this._sliderEl.offsetWidth;
        let scrollLimiter = slidesCount * 160 - sliderWidth;
        let scrollInterval = sliderWidth < 900 ? 8 : 4;
        let { sliderLeftIndent } = this.state;
        if (sliderLeftIndent > 0) {
            this.setState({
                sliderLeftIndent: sliderLeftIndent - scrollLimiter / scrollInterval
            })
        }
    }
    sliderScrollRight = (slidesCount) => {
        let sliderWidth = this._sliderEl.offsetWidth;
        let scrollLimiter = slidesCount * 160 - sliderWidth;
        let scrollInterval = sliderWidth < 900 ? 8 : 4;
        let { sliderLeftIndent } = this.state;
        if (sliderLeftIndent < scrollLimiter) {
            this.setState({
                sliderLeftIndent: sliderLeftIndent + scrollLimiter / scrollInterval
            })
        }
    }

    render() {
        let { similarFilms } = this.props.currentFilm;
        let filmsCount = similarFilms.results.length;
        let { sliderLeftIndent } = this.state;
        return (
            <>
                {
                    filmsCount > 0 ?
                        <div ref={(node) => this._sliderEl = node}>
                            <h2>Похожие фильмы:</h2>
                            <SimilarFilmsWrapper>
                                <Slides>
                                    <SimilarFilms style={{transform: `translate3d(-${sliderLeftIndent}px, 0, 0)`}}>
                                        {
                                            similarFilms.results.map((el) => {
                                                return (
                                                    <SimilarFilmCard key={el.id}>
                                                        <SimilarFilmCardImg src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} alt="film" />
                                                        <SimilarFilmCardInfo>
                                                            <h3>{el.title}</h3>
                                                            <Link to={`/film/${el.id}`}>Открыть</Link>
                                                        </SimilarFilmCardInfo>
                                                    </SimilarFilmCard>
                                                )
                                            })
                                        }
                                    </SimilarFilms>
                                </Slides>
                                <ScrollLeftBtn onClick={() => this.sliderScrollLeft(filmsCount)}>&lt;</ScrollLeftBtn>
                                <ScrollRightBtn onClick={() => this.sliderScrollRight(filmsCount)}>&gt;</ScrollRightBtn>
                            </SimilarFilmsWrapper>
                        </div> :
                        null
                }
            </>
        );
    }
}

let mapStateToProps = ({ currentFilm }) => {
    return {
        currentFilm
    }
}

export default connect(mapStateToProps)(SimilarFilmsSlider);