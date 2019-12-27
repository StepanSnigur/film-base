import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import PaginationBar from '../components/PaginationBar';
import ErrorBoundary from '../hoc/ErrorBoundary';
import LoadingBoundary from '../hoc/LoadingBoundary';
import TVSeriesCard from '../components/TVSeriesCard';

import { getPopularTVSeries, getTopRatedTVSeries, getTVSeriesOnAir } from '../actions/TVSeriesActions';

let TVSeriesListPageContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

class TVSeriesListPage extends Component {
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
        let { listRole, getPopularTVSeries, getTopRatedTVSeries, getTVSeriesOnAir } = this.props;
        let { currentPopularPage, currentRatedPage, currentOnAirPage } = this.props.TVSeriesListReducer;

        if (listRole === "Сериалы в эфире") {
            getTVSeriesOnAir(currentOnAirPage);
            this.setState({
                getDataFunc: getTVSeriesOnAir
            })
        } else if (listRole === "Популярные сериалы") {
            getPopularTVSeries(currentPopularPage);
            this.setState({
                getDataFunc: getPopularTVSeries
            })
        } else if (listRole === "Лучшие сериалы") {
            getTopRatedTVSeries(currentRatedPage);
            this.setState({
                getDataFunc: getTopRatedTVSeries
            })
        }
    }

    render() {
        let TVSeriesList = this.props.TVSeriesListReducer.listData.results;
        let { page, total_pages } = this.props.TVSeriesListReducer.listData;
        let { isLoading, error } = this.props.TVSeriesListReducer;

        return (
            <ErrorBoundary isError={error}>
                <LoadingBoundary isLoading={isLoading}>
                    <div>
                        <h1>{this.props.listRole}:</h1>
                        <TVSeriesListPageContainer>
                            {
                                TVSeriesList.map((el) => {
                                    return <TVSeriesCard key={el.id} film={el} />
                                })
                            }
                        </TVSeriesListPageContainer>
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

let mapStateToProps = ({ TVSeriesListReducer }) => {
    return {
        TVSeriesListReducer
    }
}

export default connect(mapStateToProps, { getPopularTVSeries, getTopRatedTVSeries, getTVSeriesOnAir })(TVSeriesListPage);