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

describe('film page reducer', () => {
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
});