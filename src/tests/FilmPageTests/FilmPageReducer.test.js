import currentFilm from '../../reducers/FilmPageReducer';

describe('film page', () => {
    it('should return correct film data', () => {
        let state = {
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
        let action = {
            type: 'SET_CURRENT_FILM',
            payload: {
                film: 1,
                videos: 1,
                reviews: 1,
                similar: 1
            }
        }

        expect(currentFilm(state, action)).toEqual({
            film: 1,
            videos: 1,
            reviews: 1,
            similarFilms: 1,
            isLoading: false,
            error: false
        })
    })
    it('should return correct film states', () => {
        let state = {
            filmStates: {
                rated: {}
            }
        }
        let action = {
            type: 'SET_FILM_STATES',
            payload: 1
        }

        expect(currentFilm(state, action)).toEqual({
            filmStates: 1,
            isFilmButtonsLoading: false
        })
    })
    it('should return correct film rating', () => {
        let state = {
            filmStates: {
                rated: {}
            }
        }
        let action = {
            type: 'SET_FILM_STATES',
            payload: {
                rated: {
                    value: 1
                }
            }
        }

        expect(currentFilm(state, action)).toEqual({
            filmStates: {
                rated: {
                    value: 1
                }
            },
            isFilmButtonsLoading: false
        })
    })
})