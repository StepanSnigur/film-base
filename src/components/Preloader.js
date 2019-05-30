import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

let slide = keyframes`
    0% {
        clip: rect(0, 0, 20px, 0);
    }

    30% {
        clip: rect(0, 80px, 20px, 0);
    }

    50% {
        clip: rect(0, 80px, 20px, 0);
    }

    80% {
        clip: rect(0, 80px, 20px, 80px);
    }

    100% {
        clip: rect(0, 80px, 20px, 80px);
    }
`
let fade = keyframes`
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`
let PreloaderContainer = styled.div`
    position: relative;
    width: 80px;
    height: 60px;
    margin: 0 auto;
`
let PreloaderLines = styled.div`
    width: 80px;
    height: 40px;
    position: absolute;
`
let PreloaderLine1 = styled.div`
    width: 80px;
    height: 10px;
    background-color: #000;
    position: absolute;
    clip: rect(0, 0, 20px, 0);
    top: 0;
    animation: ${slide} 2s ease 0s infinite;
`
let PreloaderLine2 = styled.div`
    width: 80px;
    height: 10px;
    background-color: #000;
    position: absolute;
    clip: rect(0, 0, 20px, 0);
    top: 15px;
    animation: ${slide} 2s ease 0.25s infinite;
`
let PreloaderLine3 = styled.div`
    width: 80px;
    height: 10px;
    background-color: #000;
    position: absolute;
    clip: rect(0, 0, 20px, 0);
    top: 30px;
    animation: ${slide} 2s ease 0.5s infinite;
`
let PreloaderText = styled.div`
    position: absolute;
    top: 50px;
    text-align: center;
    width: 100%;
    color: #000;
    font-size: 13px;
    font-family: sans-serif;
    letter-spacing: 3px;
    line-height: 10px;
    height: 10px;
    animation: ${fade} 1s ease 0s infinite;
`

class Preloader extends Component {
    render() {
        return (
            <PreloaderContainer>
                <PreloaderLines>
                    <PreloaderLine1></PreloaderLine1>
                    <PreloaderLine2></PreloaderLine2>
                    <PreloaderLine3></PreloaderLine3>
                </PreloaderLines>
                <PreloaderText>LOADING</PreloaderText>
            </PreloaderContainer>
        )
    }
}

export default Preloader;