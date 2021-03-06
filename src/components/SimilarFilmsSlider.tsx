import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../store/Store';
import { ICurrentFilmReducer } from '../reducers/FilmPageReducer';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ComponentWrapper = styled.div`
  display: block;

  @media (max-width: 640px) {
    display: none;
  }
`
const SimilarFilmsWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
`
const Slides = styled.div`
  width: 100%;
  overflow: hidden;
`
const ScrollLeftBtn = styled.button`
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
const ScrollRightBtn = styled.button`
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
const SimilarFilmCard = styled.div`
  position: relative;
  width: 150px;
  height: 200px;
  margin-right: 10px;
`
const SimilarFilms = styled.div`
  position: relative;
  display: flex;
  width: 999%;
  transition: .3s;
  left: 0;
`
const SimilarFilmCardImg = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`
const SimilarFilmCardInfo = styled.div`
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

interface ISimilarFilmsSlider {
  currentFilm: ICurrentFilmReducer
}

class SimilarFilmsSlider extends Component<ISimilarFilmsSlider> {
  private _sliderEl = createRef<HTMLDivElement>()!
  state = {
    sliderLeftIndent: 0
  }

  sliderScrollLeft = (slidesCount: number) => {
    const sliderWidth = this._sliderEl.current!.offsetWidth;
    const scrollLimiter = slidesCount * 160 - sliderWidth;
    const scrollInterval = sliderWidth < 900 ? 8 : 4;
    const { sliderLeftIndent } = this.state;
    if (sliderLeftIndent > 0) {
      this.setState({
        sliderLeftIndent: sliderLeftIndent - scrollLimiter / scrollInterval
      })
    }
  }
  sliderScrollRight = (slidesCount: number) => {
    const sliderWidth = this._sliderEl.current!.offsetWidth;
    const scrollLimiter = slidesCount * 160 - sliderWidth;
    const scrollInterval = sliderWidth < 900 ? 8 : 4;
    const { sliderLeftIndent } = this.state;
    if (sliderLeftIndent < scrollLimiter) {
      this.setState({
        sliderLeftIndent: sliderLeftIndent + scrollLimiter / scrollInterval
      })
    }
  }

  render() {
    const { similarFilms } = this.props.currentFilm;
    const filmsCount = similarFilms.results!.length;
    const similarFilmsList = similarFilms.results;
    const { sliderLeftIndent } = this.state;

    return (
      <ComponentWrapper>
        {
          filmsCount > 0 && <div ref={this._sliderEl}>
            <h2>Похожие фильмы:</h2>
            <SimilarFilmsWrapper>
              <Slides>
                <SimilarFilms style={{transform: `translate3d(-${sliderLeftIndent}px, 0, 0)`}}>
                  {similarFilmsList!.map((el) => {
                    return (
                      <SimilarFilmCard key={el.id}>
                        <SimilarFilmCardImg src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} alt="film"/>
                        <SimilarFilmCardInfo>
                          <h3>{el.title}</h3>
                          <Link to={`/film/${el.id}`}>Открыть</Link>
                        </SimilarFilmCardInfo>
                      </SimilarFilmCard>
                    )
                  })}
                </SimilarFilms>
              </Slides>
              <ScrollLeftBtn onClick={() => this.sliderScrollLeft(filmsCount)}>&lt;</ScrollLeftBtn>
              <ScrollRightBtn onClick={() => this.sliderScrollRight(filmsCount)}>&gt;</ScrollRightBtn>
            </SimilarFilmsWrapper>
          </div>
        }
      </ComponentWrapper>
    );
  }
}

const mapStateToProps = ({ currentFilm }: AppStateType) => {
  return {
    currentFilm
  }
}

export default connect(mapStateToProps)(SimilarFilmsSlider);
