import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../store/Store';
import { ITVSeriesListReducer } from '../reducers/TVSeriesListReducer';
import styled from 'styled-components';

import PaginationBar from '../components/PaginationBar';
import ErrorBoundary from '../hoc/ErrorBoundary';
import LoadingBoundary from '../hoc/LoadingBoundary';
import TVSeriesCard from '../components/TVSeriesCard';

import { getPopularTVSeries, getTopRatedTVSeries, getTVSeriesOnAir } from '../actions/TVSeriesActions';

const TVSeriesListPageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

interface ITVSeriesListPage {
  listRole: string,
  TVSeriesListReducer: ITVSeriesListReducer,
  getTVSeriesOnAir: (page?: number) => void,
  getPopularTVSeries: (page?: number) => void,
  getTopRatedTVSeries: (page?: number) => void
}

class TVSeriesListPage extends Component<ITVSeriesListPage> {
  state = {
    getDataFunc: (page: number) => {}
  }

  componentDidMount() {
    this.changeCurrentListRole();
  }

  componentDidUpdate(prevProps: ITVSeriesListPage) {
    if (prevProps.listRole !== this.props.listRole) {
      this.changeCurrentListRole();
    }
  }

  changeCurrentListRole = () => {
    const { listRole, getPopularTVSeries, getTopRatedTVSeries, getTVSeriesOnAir } = this.props;

    if (listRole === "Сериалы в эфире") {
      getTVSeriesOnAir();
      this.setState({
        getDataFunc: getTVSeriesOnAir
      })
    } else if (listRole === "Популярные сериалы") {
      getPopularTVSeries();
      this.setState({
        getDataFunc: getPopularTVSeries
      })
    } else if (listRole === "Лучшие сериалы") {
      getTopRatedTVSeries();
      this.setState({
        getDataFunc: getTopRatedTVSeries
      })
    }
  }

  render() {
    const TVSeriesList = this.props.TVSeriesListReducer.listData.results;
    const { page, total_pages } = this.props.TVSeriesListReducer.listData;
    const { isLoading, error } = this.props.TVSeriesListReducer;

    return (
      <ErrorBoundary isError={error}>
        <LoadingBoundary isLoading={isLoading}>
          <div>
            <h1>{this.props.listRole}:</h1>
            <TVSeriesListPageContainer>
              {TVSeriesList.map((el) => <TVSeriesCard key={el.id} film={el}/>)}
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

let mapStateToProps = ({ TVSeriesListReducer }: AppStateType) => {
  return {
    TVSeriesListReducer
  }
}

export default connect(mapStateToProps, {
  getPopularTVSeries,
  getTopRatedTVSeries,
  getTVSeriesOnAir
})(TVSeriesListPage);
