import React, { useState, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppStateType } from '../store/Store'
import styled from 'styled-components'

import { FilmsLists } from '../data/ListPages'
import PaginationBar from '../components/PaginationBar'
import ErrorBoundary from '../hoc/ErrorBoundary'
import LoadingBoundary from '../hoc/LoadingBoundary'

import FilmCard from '../components/FilmCard'
import TVSeriesCard from '../components/TVSeriesCard';

const FilmsPageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const LoadMoreBtn = styled.button`
  display: block;
  width: 400px;
  height: 50px;
  margin: 27px auto 0;
  cursor: pointer;
`

interface IFilmsListPage {
  listRole: string
}
const FilmsListPage: React.FC<IFilmsListPage> = ({ listRole }) => {
  const dispatch = useDispatch()
  const [loadPage, changeLoadPage] = useState<(pageId: number, isUpdating?: string) => void>((pageId: number) => {})
  const isLoading = useSelector((state: AppStateType) => state.FilmsListReducer.isLoading)
  const isError = useSelector((state: AppStateType) => state.FilmsListReducer.isError)
  const filmsList = useSelector((state: AppStateType) => state.FilmsListReducer.listData)

  useLayoutEffect(() => {
    try {
      const currentList = FilmsLists.find(list => list.title === listRole)
      if (!currentList) throw Error('List not found')
      dispatch(currentList.getList())
      changeLoadPage(() => currentList.getList)
    } catch (e) {
      console.log('Films list page error: ', e)
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
          <LoadMoreBtn onClick={() => dispatch(loadPage(filmsList.page + 1, 'update'))}>Загрузить еще</LoadMoreBtn>
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
