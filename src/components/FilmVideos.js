import React, { Component } from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import styled from 'styled-components';

let FilmVideosWrapper = styled.div`
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
let ShowVideosBtn = styled.button`
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

class FilmVideos extends Component {
    state = {
        videosLimiter: 0
    }

    initialVideosLimiter = 2;

    componentDidMount() {
        this.setState({
            videosLimiter: this.initialVideosLimiter
        })
    }

    _onReady (event) {
        event.target.pauseVideo();
    }

    moveVideosLimiter = () => {
        this.setState({
            videosLimiter: this.state.videosLimiter + 2
        })
    }
    returnVideosLimiterToInitial = () => {
        this.setState({
            videosLimiter: this.initialVideosLimiter
        })
    }

    render() {
        let filmVideos = this.props.videos.results;
        let { videosLimiter } = this.state;
        let opts = {
            height: '390',
            width: '100%',
            playerVars: {
                autoplay: 0,
                enablejsapi: 1
            }
        }
        let showContentBtn = () => {
            return (
                <>
                    {
                        filmVideos.length > videosLimiter ?
                            <ShowVideosBtn onClick={this.moveVideosLimiter}>Развернуть</ShowVideosBtn> :
                            <ShowVideosBtn onClick={this.returnVideosLimiterToInitial}>Скрыть</ShowVideosBtn>
                    }
                </>
            )
        }
        return (
            <>
                {
                    filmVideos.length > 0 ?
                        <div>
                            <h2>Видео:</h2>
                            <FilmVideosWrapper>
                                {
                                    filmVideos.slice(0, videosLimiter).map((el) => {
                                        return (
                                            <YouTube
                                                key={el.id}
                                                videoId={el.key}
                                                opts={opts}
                                                onReady={this._onReady}
                                            />
                                        )
                                    })
                                }
                            </FilmVideosWrapper>
                            {
                                filmVideos.length <= this.initialVideosLimiter ?
                                null :
                                showContentBtn()
                            }
                        </div> :
                        null
                }
            </>
        );
    }
}

let mapStateToProps = ({ currentFilm }) => {
    return {
        videos: currentFilm.videos
    }
}

export default connect(mapStateToProps)(FilmVideos);