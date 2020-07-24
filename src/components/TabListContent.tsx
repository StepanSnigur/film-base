import React from 'react';
import styled, { keyframes } from 'styled-components';

import { IFilmListDataResults } from '../actions/actionCreators/actionCreatorsTypes/FilmActionCreatorsTypes';
import ErrorBoundary from '../hoc/ErrorBoundary';
import LoadingBoundary from '../hoc/LoadingBoundary';
import FilmCard from './FilmCard';
import TVSeriesCard from './TVSeriesCard';
import PaginationBar from './PaginationBar';

const fadeId = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
const TabContent = styled.div`
  margin-top: 50px;
  animation: ${fadeId} .3s;
`
const TabContentList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

interface ITabListContent {
  list: {
    isLoading: boolean,
    results: IFilmListDataResults[]
  },
  componentName: string,
  activeComponentName: string,
  isError: boolean,
  currentPage: number,
  pagesCount: number,
  updatePage: (page: number) => void,
  isTVSeries?: boolean
}

const TabListContent: React.FC<ITabListContent> = (props) => {
  const { results, isLoading } = props.list;
  const { componentName, activeComponentName, isError, currentPage, pagesCount, updatePage, isTVSeries } = props;
  const isTabActive = componentName === activeComponentName;

  return (
    <>
      {isTabActive && <TabContent>
        <ErrorBoundary isError={isError}>
          <LoadingBoundary isLoading={isLoading}>
            {results.length === 0 ?
            <span>Здесь пока ничего нет</span> :
            <>
              <TabContentList>
                {results.map((el) => {
                  return !isTVSeries ?
                  <FilmCard key={el.id} film={el}/> :
                  <TVSeriesCard key={el.id} film={el}/>
                })}
              </TabContentList>
              <PaginationBar
                currentPage={currentPage}
                maxPagesCount={pagesCount}
                updatePage={(page) => updatePage(page)}
              />
            </>}
          </LoadingBoundary>
        </ErrorBoundary>
      </TabContent>}
    </>
  )
}

export default TabListContent;
