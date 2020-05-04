import React from 'react';
import Preloader from '../components/Preloader';

interface ILoadingBoundary {
  isLoading: boolean
}
const LoadingBoundary: React.FC<ILoadingBoundary> = (props) => <>{props.isLoading ? <Preloader /> : props.children}</>;

export default LoadingBoundary;
