export interface IFilmListDataResults {
  poster_path: string | null,
  adult: boolean,
  overview: string,
  release_date: string,
  genre_ids: number[],
  id: number,
  original_title: string,
  original_language: string,
  title?: string,
  name?: string,
  backdrop_path: string | null,
  popularity: number,
  vote_count: number,
  video: boolean,
  vote_average: number,
  media_type?: string,
  first_air_date?: string
}
export interface IFilmListData {
  page: number,
  results: IFilmListDataResults[],
  total_results: number,
  total_pages: number
}

export interface IFilmStates {
  id: number,
  favorite: boolean,
  rated: { value?: number },
  watchlist: boolean
}
export interface IFilmData {
  adult: boolean,
  backdrop_path: string | null,
  belongs_to_collection: null | object,
  budget: number,
  genres: Array<{id: number, name: string}>,
  homepage: string | null,
  id: number,
  imdb_id: string | null,
  original_language: string,
  original_title: string,
  overview: string | null,
  popularity: number,
  poster_path: string | null,
  production_companies: Array<{name: string, id: number, logo_path: string | null, origin_country: string}>,
  production_countries: Array<{iso_3166_1: string, name: string}>,
  release_date: string,
  revenue: number,
  runtime: number | null,
  spoken_languages: Array<{iso_639_1: string, name: string}>,
  status: string,
  tagline: string | null,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}
interface IFilmVideosResults {
  id: string,
  iso_639_1: string,
  iso_3166_1: string,
  key: string,
  name: string,
  site: string,
  size: number,
  type: string
}
export interface IFilmVideos {
  id: number,
  results: IFilmVideosResults[]
}
export interface IFilmReviewsResults {
  id: string,
  author: string,
  content: string,
  url: string
}
export interface IFilmReviews {
  id: number,
  page: number,
  results: IFilmReviewsResults[],
  total_pages: number,
  total_results: number
}

export interface IFilmsResults {
  page: number,
  results: IFilmListDataResults[],
  total_pages: number,
  total_results: number
}
