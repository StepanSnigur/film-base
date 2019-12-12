import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getPopularTVSeries, getTopRatedTVSeries, getTVSeriesOnAir } from '../actions/TVSeriesActions';
import PaginationBar from "../components/PaginationBar";
import LoadingBoundary from "../hoc/LoadingBoundary";
import TVSeriesCard from "../components/TVSeriesCard";

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
        let { getPopularTVSeries, getTopRatedTVSeries, getTVSeriesOnAir } = this.props;

        if (this.props.listRole === "Сериалы в эфире") {
            getTVSeriesOnAir();
            this.setState({
                getDataFunc: getTVSeriesOnAir
            })
        } else if (this.props.listRole === "Популярные сериалы") {
            getPopularTVSeries();
            this.setState({
                getDataFunc: getPopularTVSeries
            })
        } else if (this.props.listRole === "Лучшие сериалы") {
            getTopRatedTVSeries();
            this.setState({
                getDataFunc: getTopRatedTVSeries
            })
        }
    }

    render() {
        let TVSeriesList = this.props.TVSeriesListReducer.listData.results;
        let { page, total_pages } = this.props.TVSeriesListReducer.listData;
        let { isLoading } = this.props.TVSeriesListReducer;

        return (
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
        )
    }
}

let mapStateToProps = ({ TVSeriesListReducer }) => {
    return {
        TVSeriesListReducer
    }
}

export default connect(mapStateToProps, { getPopularTVSeries, getTopRatedTVSeries, getTVSeriesOnAir })(TVSeriesListPage);