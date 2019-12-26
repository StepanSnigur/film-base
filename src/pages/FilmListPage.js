import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import PaginationBar from '../components/PaginationBar';
import ErrorBoundary from '../hoc/ErrorBoundary';
import LoadingBoundary from '../hoc/LoadingBoundary';
import FilmCard from '../components/FilmCard';

import { loadUpComingFilms, loadMostPopularFilms, getTopRatedFilms } from '../actions/FilmActions';

let FilmPageContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

class FilmListPage extends Component {
    state = {
        getDataFunc: null
    }

    componentDidMount() {
        this.changeCurrentListRole();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.listRole !== this.props.listRole) {
            this.changeCurrentListRole();
        }
    }

    changeCurrentListRole = () => {
        let { listRole, loadUpComingFilms, loadMostPopularFilms, getTopRatedFilms } = this.props;
        let { currentPopularPage, currentRatedPage, currentUpcomingPage } = this.props.FilmListReducer;

        if (listRole === "Недавно вышедшие фильмы") {
            loadUpComingFilms(currentUpcomingPage);
            this.setState({
                getDataFunc: loadUpComingFilms
            })
        } else if (listRole === "Популярные фильмы") {
            loadMostPopularFilms(currentPopularPage);
            this.setState({
                getDataFunc: loadMostPopularFilms
            })
        } else if (listRole === "Лучшие фильмы") {
            getTopRatedFilms(currentRatedPage);
            this.setState({
                getDataFunc: getTopRatedFilms
            })
        }
    }

    render() {
        let filmsList = this.props.FilmListReducer.listData.results;
        let { isLoading, error } = this.props.FilmListReducer;
        let { page, total_pages } = this.props.FilmListReducer.listData;

        return (
            <ErrorBoundary isError={error}>
                <LoadingBoundary isLoading={isLoading}>
                    <div>
                        <h1>{this.props.listRole}:</h1>
                        <FilmPageContainer>
                            {
                                filmsList.map((el) => {
                                    return <FilmCard key={el.id} film={el} />
                                })
                            }
                        </FilmPageContainer>
                        <PaginationBar
                            updatePage={(val) => this.state.getDataFunc(val)}
                            currentPage={page}
                            maxPagesCount={total_pages}
                        />
                    </div>
                </LoadingBoundary>
            </ErrorBoundary>
        )
    }
}

let mapStateToProps = ({ FilmListReducer }) => {
    return {
        FilmListReducer
    }
}

export default connect(mapStateToProps, { loadUpComingFilms, loadMostPopularFilms, getTopRatedFilms })(FilmListPage);