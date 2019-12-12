import React from 'react';
import styled from 'styled-components';

import ErrorBoundary from '../hoc/ErrorBoundary';
import LoadingBoundary from '../hoc/LoadingBoundary';
import FilmCard from './FilmCard';
import TVSeriesCard from './TVSeriesCard';
import PaginationBar from './PaginationBar';

let TabContent = styled.div`
    margin-top: 50px;
`
let TabContentList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

let TabListContent = (props) => {
    let { results, isLoading } = props.list;
    let { componentName, activeComponentName, isError, currentPage, pagesCount, updatePage, isTVSeries } = props;
    let isTabActive = componentName === activeComponentName;

    return (
        <>
            {
                isTabActive &&
                <TabContent>
                    <ErrorBoundary isError={isError}>
                        <LoadingBoundary isLoading={isLoading}>
                            {
                                results.length === 0 ?
                                <span>Здесь пока ничего нет</span> :
                                <>
                                    <TabContentList>
                                        {
                                            results.map((el) => {
                                                return !isTVSeries ?
                                                    <FilmCard key={el.id} film={el} /> :
                                                    <TVSeriesCard key={el.id} film={el} />
                                            })
                                        }
                                    </TabContentList>
                                    <PaginationBar
                                        currentPage={currentPage}
                                        maxPagesCount={pagesCount}
                                        updatePage={(page) => updatePage(page)}
                                    />
                                </>
                            }
                        </LoadingBoundary>
                    </ErrorBoundary>
                </TabContent>
            }
        </>
    )
}

export default TabListContent;