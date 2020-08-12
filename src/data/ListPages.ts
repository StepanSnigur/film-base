import {
  getPopularTVSeries,
  getTopRatedFilms,
  getTopRatedTVSeries,
  getTVSeriesOnAir,
  loadMostPopularFilms,
  loadUpComingFilms
} from '../actions/FilmsList/Actions'

export const FilmsLists = [
  {
    title: 'Лучшие фильмы',
    url: '/',
    getList: getTopRatedFilms
  },
  {
    title: 'Недавно вышедшие фильмы',
    url: '/upcoming-films',
    getList: loadUpComingFilms
  },
  {
    title: 'Популярные фильмы',
    url: '/popular-films',
    getList: loadMostPopularFilms
  },
  {
    title: 'Сериалы в эфире',
    url: '/tv-series-on-air',
    getList: getTVSeriesOnAir
  },
  {
    title: 'Популярные сериалы',
    url: '/popular-tv-series',
    getList: getPopularTVSeries
  },
  {
    title: 'Лучшие сериалы',
    url: '/best-tv-series',
    getList: getTopRatedTVSeries
  }
]
