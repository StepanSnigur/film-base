import React from 'react';
import { shallow } from 'enzyme';

import currentFilm  from './reducers/FilmPageReducer';

let initialState = {
    film: {},
    videos: {
        results: []
    },
    reviews: {
        results: []
    },
    similarFilms: {
        results: []
    },
    isLoading: true,
    error: false
}

describe('film page', () => {
    it('SET_CURRENT_FILM', () => {
        expect(
            currentFilm(initialState,
        {type: 'SET_CURRENT_FILM', payload: {
                film: {a: 1},
                videos: [1],
                reviews: [1],
                similar: [1]
            }}
        )
        ).toEqual({
            ...initialState,
            film: {a: 1},
            videos: [1],
            reviews: [1],
            similarFilms: [1],
            isLoading: false
        })
    });

    it('should render a label', () => {
        const wrapper = shallow(
            <h1>Hello Jest!</h1>
        );
        expect(wrapper.find('h1').text()).toEqual('Hello Jest!');
    });
});