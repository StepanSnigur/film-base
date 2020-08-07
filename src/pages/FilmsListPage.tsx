import React, { useState, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppStateType } from '../store/Store'
import styled from 'styled-components'

import PaginationBar from '../components/PaginationBar'
import ErrorBoundary from '../hoc/ErrorBoundary'
import LoadingBoundary from '../hoc/LoadingBoundary'

import FilmCard from '../components/FilmCard'
import TVSeriesCard from '../components/TVSeriesCard';

import {
  loadUpComingFilms,
  loadMostPopularFilms,
  getTopRatedFilms,
  getPopularTVSeries,
  getTopRatedTVSeries,
  getTVSeriesOnAir
} from '../actions/FilmsList/Actions'

const FilmsPageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

interface IFilmsListPage {
  listRole: string
}
const FilmsListPage: React.FC<IFilmsListPage> = ({ listRole }) => {
  const dispatch = useDispatch()
  const [loadPage, changeLoadPage] = useState<(pageId: number) => void>((pageId: number) => {})
  const isLoading = useSelector((state: AppStateType) => state.FilmsListReducer.isLoading)
  const isError = useSelector((state: AppStateType) => state.FilmsListReducer.isError)
  const filmsList = useSelector((state: AppStateType) => state.FilmsListReducer.listData)

  useLayoutEffect(() => {
    switch (listRole) {
      case 'Лучшие фильмы':
        dispatch(getTopRatedFilms())
        changeLoadPage(() => getTopRatedFilms)
        break
      case 'Недавно вышедшие фильмы':
        dispatch(loadUpComingFilms())
        changeLoadPage(() => loadUpComingFilms)
        break
      case 'Популярные фильмы':
        dispatch(loadMostPopularFilms())
        changeLoadPage(() => loadMostPopularFilms)
        break

      case 'Сериалы в эфире':
        dispatch(getTVSeriesOnAir())
        changeLoadPage(() => getTVSeriesOnAir)
        break
      case 'Популярные сериалы':
        dispatch(getPopularTVSeries())
        changeLoadPage(() => getPopularTVSeries)
        break
      case 'Лучшие сериалы':
        dispatch(getTopRatedTVSeries())
        changeLoadPage(() => getTopRatedTVSeries)
        break
    }
  }, [listRole, dispatch])

  return (
    <ErrorBoundary isError={isError}>
      <LoadingBoundary isLoading={isLoading}>
        <div>
          <h1>{listRole}:</h1>
          <FilmsPageContainer>
            {filmsList.results.map((el: any) => {
              return el.title ? <FilmCard key={el.id} film={el}/> : <TVSeriesCard key={el.id} film={el} />
            })}
          </FilmsPageContainer>
          <PaginationBar
            currentPage={filmsList.page}
            pagesCount={filmsList.total_pages}
            onPageChange={loadPage}
            isFunctionWrapped={false} // TO-DO
          />
        </div>
      </LoadingBoundary>
    </ErrorBoundary>
  )
}

export default FilmsListPage
