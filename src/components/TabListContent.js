import React from 'react';
import styled from 'styled-components';

import Preloader from './Preloader';
import FilmCard from './FilmCard';
import PaginationBar from './PaginationBar';
import ErrorIndicator from './ErrorIndicator';

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
    let { componentName, activeComponentName, isError, currentPage, pagesCount, updatePage } = props;
    let isTabActive = componentName === activeComponentName;

    return (
        <>
            {
                isTabActive &&
                <TabContent>
                    {
                        isError ?
                        <ErrorIndicator /> :
                        <>
                            {
                                isLoading ?
                                <Preloader /> :
                                <>
                                    {
                                        results.length === 0 ?
                                        <span>Здесь пока ничего нет</span> :
                                        <>
                                            <TabContentList>
                                                {
                                                    results.map((el) => {
                                                        return <FilmCard key={el.id} film={el} />
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
                                </>
                            }
                        </>
                    }
                </TabContent>
            }
        </>
    )
}

export default TabListContent;