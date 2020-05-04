import React from 'react';
import ErrorIndicator from '../components/ErrorIndicator';

interface IErrorBoundary {
  isError: boolean | string
}
const ErrorBoundary: React.FC<IErrorBoundary> = (props) => <>{props.isError ? <ErrorIndicator /> : props.children}</>;

export default ErrorBoundary;
