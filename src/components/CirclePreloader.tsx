import React from 'react';
import styled, { keyframes } from 'styled-components';

const PreloaderAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
const PreloaderWrapper = styled.div`
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    border: 3px solid #000;
    border-radius: 50%;
    animation: ${PreloaderAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #000 transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
`

const CirclePreloader = () => {
  return (
    <PreloaderWrapper>
      <div />
      <div />
      <div />
      <div />
    </PreloaderWrapper>
  )
}

export default CirclePreloader;
