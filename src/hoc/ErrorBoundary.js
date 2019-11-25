import React from 'react';
import ErrorIndicator from '../components/ErrorIndicator';

let ErrorBoundary = (props) => <>{props.isError ? <ErrorIndicator /> : props.children}</>

export default ErrorBoundary;