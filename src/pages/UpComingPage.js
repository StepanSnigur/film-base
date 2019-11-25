import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import ErrorBoundary from '../hoc/ErrorBoundary';
import LoadingBoundary from '../hoc/LoadingBoundary';
import PaginationBar from '../components/PaginationBar';
import FilmCard from '../components/FilmCard';

import { loadUpComingFilms } from '../actions/Actions';

let UpComingPageContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

class UpComingPage extends Component {
    componentDidMount() {
        this.props.loadUpComingFilms();
    }

    render() {
        let filmsList = this.props.upComingFilms.results;
        let { isLoading, error, page, total_pages } = this.props.upComingFilms;

        let UpComingPageContent = () => {
            return (
                <LoadingBoundary isLoading={isLoading}>
                    <div>
                        <h1>Скоро в кинотеатрах:</h1>
                        <UpComingPageContainer>
                            {
                                filmsList.map((el) => {
                                    return <FilmCard key={el.id} film={el} />
                                })
                            }
                        </UpComingPageContainer>
                        <PaginationBar
                            updatePage={(val) => this.props.loadUpComingFilms(val)}
                            currentPage={page}
                            maxPagesCount={total_pages}
                        />
                    </div>
                </LoadingBoundary>
            )
        }

        return (
            <ErrorBoundary isError={error}>
                <UpComingPageContent />
            </ErrorBoundary>
        );
    }
}

let mapStateToProps = ({ upComingFilms }) => {
    return {
        upComingFilms
    }
}

export default connect(mapStateToProps, { loadUpComingFilms })(UpComingPage);
