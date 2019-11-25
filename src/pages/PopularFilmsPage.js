import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import ErrorBoundary from '../hoc/ErrorBoundary';
import LoadingBoundary from '../hoc/LoadingBoundary';
import PaginationBar from '../components/PaginationBar';
import FilmCard from '../components/FilmCard';

import { loadMostPopularFilms } from '../actions/Actions';

let PopularFilmsPageContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

class PopularFilmsPage extends Component {
    componentDidMount() {
        this.props.loadMostPopularFilms();
    }

    render() {
        let filmsList = this.props.mostPopularFilms.results;
        let { isLoading, error, page, total_pages } = this.props.mostPopularFilms;

        let PopularFilmsPageContent = () => {
            return (
                <LoadingBoundary isLoading={isLoading}>
                    <div>
                        <h1>Популярные фильмы:</h1>
                        <PopularFilmsPageContainer>
                            {
                                filmsList.map((el) => {
                                    return <FilmCard key={el.id} film={el} />
                                })
                            }
                        </PopularFilmsPageContainer>
                        <PaginationBar
                            updatePage={(val) => this.props.loadMostPopularFilms(val)}
                            currentPage={page}
                            maxPagesCount={total_pages}
                        />
                    </div>
                </LoadingBoundary>
            )
        }

        return (
            <ErrorBoundary isError={error}>
                <PopularFilmsPageContent />
            </ErrorBoundary>
        );
    }
}

let mapStateToProps = ({ mostPopularFilms }) => {
    return {
        mostPopularFilms
    }
}

export default connect(mapStateToProps, { loadMostPopularFilms })(PopularFilmsPage);