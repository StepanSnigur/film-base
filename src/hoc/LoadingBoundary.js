import React from 'react';
import Preloader from '../components/Preloader';

let LoadingBoundary = (props) => props.isLoading ? <Preloader /> : props.children;

export default LoadingBoundary;