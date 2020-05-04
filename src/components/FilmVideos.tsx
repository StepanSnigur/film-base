import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../store/Store';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import { IFilmVideos } from '../actions/actionCreators/actionCreatorsTypes/FilmActionCreatorsTypes';

const FilmVideosWrapper = styled.div`
  display: grid;
  grid-template-columns: 430px 430px;
  grid-row-gap: 20px;
  justify-content: space-around;
  
  @media (max-width: 1000px) {
    grid-template-columns: 430px;
  }
  @media (max-width: 900px) {
    grid-template-columns: 375px;
  }
  @media (max-width: 500px) {
    grid-template-columns: 345px;
  }
`
const ShowVideosBtn = styled.button`
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

interface IFilmVideosComponent {
  videos: IFilmVideos | { results: [] }
}

const FilmVideos: React.FC<IFilmVideosComponent> = (props) => {
  const [videosLimiter, setVideosLimiter] = useState(2)
  const videosLimit = 2

  const _onReady = (event: React.ChangeEvent<HTMLVideoElement>) => {
    // @ts-ignore
    event.target.pauseVideo()
  }

  const moveVideosLimiter = () => {
    setVideosLimiter(videosLimiter + videosLimit)
  }
  const returnVideosLimiterToInitial = () => {
    setVideosLimiter(videosLimit)
  }

  const filmVideos = props.videos.results;
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 0,
      enablejsapi: 1
    }
  }
  const ShowContentBtn = () => {
    return (
      <>
        {filmVideos.length > videosLimiter ?
        <ShowVideosBtn onClick={moveVideosLimiter}>Развернуть</ShowVideosBtn> :
        <ShowVideosBtn onClick={returnVideosLimiterToInitial}>Скрыть</ShowVideosBtn>}
      </>
    )
  }
  return (
    <>
      {filmVideos.length > 0 && <div>
        <h2>Видео:</h2>
        <FilmVideosWrapper>
          {filmVideos.slice(0, videosLimiter).map((el) => {
            return (
              <YouTube
                key={el.id}
                videoId={el.key}
                // @ts-ignore
                opts={opts}
                onReady={_onReady}
              />
            )
          })}
        </FilmVideosWrapper>
        {filmVideos.length > videosLimit && <ShowContentBtn />}
      </div>}
    </>
  )
}

let mapStateToProps = ({ currentFilm }: AppStateType) => {
  return {
    videos: currentFilm.videos
  }
}

export default connect(mapStateToProps)(FilmVideos);
