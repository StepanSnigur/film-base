import React from 'react';
import FilmService from '../services/FilmService';

let service = new FilmService();

let WithService = (Component) => {
    return (props) => {
        return <Component {...props} service={service} />
    }
}

export default WithService;