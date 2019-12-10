import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getTopRelatedFilms } from '../actions/FilmActions';

import ErrorBoundary from '../hoc/ErrorBoundary';
import LoadingBoundary from '../hoc/LoadingBoundary';
import PaginationBar from '../components/PaginationBar';
import FilmCard from '../components/FilmCard';

let TopRelatedFilmsHeadline = styled.h1`
    margin-top: 35px;
`
let TopRelatedPageContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

class HomePage extends Component {
    componentDidMount() {
        this.props.getTopRelatedFilms();
    }

    render() {
        let filmsList = this.props.topRelatedFilms.results;
        let { isLoading, error, page, total_pages } = this.props.topRelatedFilms;

        let HomePageContent = () => {
            return (
                <LoadingBoundary isLoading={isLoading}>
                    <div>
                        <TopRelatedFilmsHeadline>Лучшие фильмы:</TopRelatedFilmsHeadline>
                        <TopRelatedPageContainer>
                            {
                                filmsList.map((el) => {
                                    return <FilmCard key={el.id} film={el} />
                                })
                            }
                        </TopRelatedPageContainer>
                        <PaginationBar
                            updatePage={(val) => this.props.getTopRelatedFilms(val)}
                            currentPage={page}
                            maxPagesCount={total_pages}
                        />
                    </div>
                </LoadingBoundary>
            )
        }

        return (
            <ErrorBoundary isError={error}>
                <HomePageContent />
            </ErrorBoundary>
        );
    }
}

let mapStateToProps = ({ topRelatedFilms }) => {
    return {
        topRelatedFilms
    }
}

export default connect(mapStateToProps, { getTopRelatedFilms })(HomePage);