export let setCurrentFilmDataLoading = () => ({
    type: 'SET_CURRENT_FILM_DATA_LOADING'
})
export let changeCurrentListData = listData => ({
    type: 'CHANGE_CURRENT_LIST_DATA',
    payload: listData
})

export let setCurrentPopularPage = page => ({
    type: 'SET_CURRENT_POPULAR_PAGE',
    payload: page
})
export let setCurrentRatedPage = page => ({
    type: 'SET_CURRENT_RATED_PAGE',
    payload: page
})
export let setCurrentUpcomingPage = page => ({
    type: 'SET_CURRENT_UPCOMING_PAGE',
    payload: page
})
export let setFilmListError = () => ({
    type: 'SET_FILM_LIST_ERROR'
})

export  let setCurrentFilmLoading =  () => ({
    type: 'SET_CURRENT_FILM_LOADING'
})
export let setFilmStates = filmStates => ({
    type: 'SET_FILM_STATES',
    payload: filmStates
})
export let setCurrentFilmData = (filmData, filmVideos, filmReviews, similarFilms) => ({
    type: 'SET_CURRENT_FILM',
    payload: {
        film: filmData,
        videos: filmVideos,
        reviews: filmReviews,
        similar: similarFilms
    }
})
export let setCurrentFilmError = () => ({
    type: 'SET_CURRENT_FILM_ERROR'
})

export let searchFilmData = searchResult => ({
    type: 'SEARCH_FILM',
    payload: searchResult
})
export let searchFilmError = () => ({
    type: 'SEARCH_FILM_ERROR'
})

export let loadFavouriteMovies = favouriteMovies => ({
    type: 'LOAD_FAVOURITE_MOVIES',
    payload: favouriteMovies
})
export let loadFavouriteMoviesError = () => ({
    type: 'LOAD_FAVOURITE_MOVIES_ERROR'
})

export let loadRatedMovies = ratedMovies => ({
    type: 'LOAD_RATED_MOVIES',
    payload: ratedMovies
})
export let loadRatedMoviesError = () => ({
    type: 'LOAD_RATED_MOVIES_ERROR'
})

export let loadWatchList = watchList => ({
    type: 'LOAD_WATCHLIST',
    payload: watchList
})
export let loadWatchListError = () => ({
    type: 'LOAD_WATCHLIST_ERROR'
})