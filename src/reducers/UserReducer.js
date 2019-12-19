let initialState = {
    requestToken: null,
    sessionId: null,
    userName: null,
    userId: null,
    userAvatarHash: null,
    isLogged: false,
    isLoading: false,
    favouriteMovies: {
        isLoading: false,
        isError: false,
        currentPage: false,
        pagesCount: false,
        results: []
    },
    ratedMovies: {
        isLoading: false,
        isError: false,
        currentPage: false,
        pagesCount: false,
        results: []
    },
    watchList: {
        isLoading: false,
        isError: false,
        currentPage: false,
        pagesCount: false,
        results: []
    },
    favouriteTVSeries: {
        isLoading: false,
        isError: false,
        currentPage: false,
        pagesCount: false,
        results: []
    },
    ratedTVSeries: {
        isLoading: false,
        isError: false,
        currentPage: false,
        pagesCount: false,
        results: []
    },
    tvSeriesWatchList: {
        isLoading: false,
        isError: false,
        currentPage: false,
        pagesCount: false,
        results: []
    }
}

let UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_LOADING':
            return {
                ...state,
                isLoading: action.payload
            }
        case 'SET_REQUEST_TOKEN':
            return {
                ...state,
                requestToken: action.payload.request_token
            }
        case 'SET_SESSION_ID':
            return {
                ...state,
                sessionId: action.payload.session_id
            }
        case 'SET_USER_DATA':
            return {
                ...state,
                userName: action.payload.username,
                userId: action.payload.id,
                userAvatarHash: action.payload.avatar.gravatar.hash,
                isLogged: true,
                isLoading: false
            }
        case 'LOAD_FAVOURITE_MOVIES':
            return {
                ...state,
                favouriteMovies: {
                    ...state.favouriteMovies,
                    results: action.payload.results || [],
                    pagesCount: action.payload.total_pages,
                    currentPage: action.payload.page,
                    isLoading: false
                }
            }
        case 'LOAD_FAVOURITE_MOVIES_ERROR':
            return {
                ...state,
                favouriteMovies: {
                    ...state.favouriteMovies,
                    isError: true
                }
            }
        case 'SET_FAVOURITE_MOVIES_LOADING':
            return {
                ...state,
                favouriteMovies: {
                    ...state.favouriteMovies,
                    isLoading: action.payload
                }
            }
        case 'LOAD_RATED_MOVIES':
            return {
                ...state,
                ratedMovies: {
                    ...state.ratedMovies,
                    results: action.payload.results || [],
                    pagesCount: action.payload.total_pages,
                    currentPage: action.payload.page,
                    isLoading: false
                }
            }
        case 'LOAD_RATED_MOVIES_ERROR':
            return {
                ...state,
                ratedMovies: {
                    ...state.ratedMovies,
                    isError: true
                }
            }
        case 'SET_RATED_MOVIES_LOADING':
            return {
                ...state,
                ratedMovies: {
                    ...state.ratedMovies,
                    isLoading: action.payload
                }
            }
        case 'LOAD_WATCHLIST':
            return {
                ...state,
                watchList: {
                    ...state.watchList,
                    results: action.payload.results || [],
                    pagesCount: action.payload.total_pages,
                    currentPage: action.payload.page,
                    isLoading: false
                }
            }
        case 'LOAD_WATCHLIST_ERROR':
            return {
                ...state,
                watchList: {
                    ...state.watchList,
                    isError: true
                }
            }
        case 'SET_WATCHLIST_LOADING':
            return {
                ...state,
                watchList: {
                    ...state.watchList,
                    isLoading: action.payload
                }
            }
        case 'LOAD_RATED_TV_SERIES':
            return {
                ...state,
                ratedTVSeries: {
                    ...state.ratedTVSeries,
                    results: action.payload.results || [],
                    pagesCount: action.payload.total_pages,
                    currentPage: action.payload.page,
                    isLoading: false
                }
            }
        case 'LOAD_RATED_TV_SERIES_ERROR':
            return {
                ...state,
                ratedTVSeries: {
                    ...state.ratedTVSeries,
                    isError: true
                }
            }
        case 'SET_RATED_TV_SERIES_LOADING':
            return {
                ...state,
                ratedTVSeries: {
                    ...state.ratedTVSeries,
                    isLoading: true
                }
            }
        case 'LOAD_FAVORITE_TV_SERIES':
            return {
                ...state,
                favouriteTVSeries: {
                    ...state.favouriteTVSeries,
                    results: action.payload.results || [],
                    pagesCount: action.payload.total_pages,
                    currentPage: action.payload.page,
                    isLoading: false
                }
            }
        case 'LOAD_FAVORITE_TV_SERIES_ERROR':
            return {
                ...state,
                favouriteTVSeries: {
                    ...state.favouriteTVSeries,
                    isError: true
                }
            }
        case 'SET_FAVORITE_TV_SERIES_LOADING':
            return {
                ...state,
                favouriteTVSeries: {
                    ...state.favouriteTVSeries,
                    isLoading: true
                }
            }
        case 'LOAD_TV_SERIES_WATCHLIST':
            return {
                ...state,
                tvSeriesWatchList: {
                    ...state.tvSeriesWatchList,
                    results: action.payload.results || [],
                    pagesCount: action.payload.total_pages,
                    currentPage: action.payload.page,
                    isLoading: false
                }
            }
        case 'LOAD_TV_SERIES_WATCHLIST_ERROR':
            return {
                ...state,
                tvSeriesWatchList: {
                    ...state.tvSeriesWatchList,
                    isError: true
                }
            }
        case 'SET_TV_SERIES_WATCHLIST_LOADING':
            return {
                ...state,
                tvSeriesWatchList: {
                    ...state.tvSeriesWatchList,
                    isLoading: true
                }
            }
        case 'CLEAR_USER_DATA':
            return {
                ...state,
                requestToken: null,
                sessionId: null,
                userName: null,
                userId: null,
                userAvatarHash: null,
                isLogged: false,
                isLoading: false,
                favouriteMovies: {
                    isLoading: false,
                    isError: false,
                    currentPage: false,
                    pagesCount: false,
                    results: []
                },
                ratedMovies: {
                    isLoading: false,
                    isError: false,
                    currentPage: false,
                    pagesCount: false,
                    results: []
                },
                watchList: {
                    isLoading: false,
                    isError: false,
                    currentPage: false,
                    pagesCount: false,
                    results: []
                },
                favouriteTVSeries: {
                    isLoading: false,
                    isError: false,
                    currentPage: false,
                    pagesCount: false,
                    results: []
                },
                ratedTVSeries: {
                    isLoading: false,
                    isError: false,
                    currentPage: false,
                    pagesCount: false,
                    results: []
                },
                tvSeriesWatchList: {
                    isLoading: false,
                    isError: false,
                    currentPage: false,
                    pagesCount: false,
                    results: []
                }
            }
        default:
            return state;
    }
}

export default UserReducer;