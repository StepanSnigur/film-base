import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../store/Store';
import { IFilmListReducer } from '../reducers/FilmListReducer';
import styled from 'styled-components';

import PaginationBar from '../components/PaginationBar';
import ErrorBoundary from '../hoc/ErrorBoundary';
import LoadingBoundary from '../hoc/LoadingBoundary';
import FilmCard from '../components/FilmCard';

import { loadUpComingFilms, loadMostPopularFilms, getTopRatedFilms } from '../actions/FilmActions';

const FilmPageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

interface IFilmListPage {
  listRole: string,
  FilmListReducer: IFilmListReducer,
  loadUpComingFilms: (page?: number) => void,
  loadMostPopularFilms: (page?: number) => void,
  getTopRatedFilms: (page?: number) => void
}

class FilmListPage extends Component<IFilmListPage> {
  state = {
    getDataFunc: (page: number) => {}
  }

  componentDidMount() {
    this.changeCurrentListRole();
  }

  componentDidUpdate(prevProps: IFilmListPage) {
    if (prevProps.listRole !== this.props.listRole) {
      this.changeCurrentListRole();
    }
  }

  changeCurrentListRole = () => {
    const { listRole, loadUpComingFilms, loadMostPopularFilms, getTopRatedFilms } = this.props;

    if (listRole === "Недавно вышедшие фильмы") {
      loadUpComingFilms();
      this.setState({
        getDataFunc: loadUpComingFilms
      })
    } else if (listRole === "Популярные фильмы") {
      loadMostPopularFilms();
      this.setState({
        getDataFunc: loadMostPopularFilms
      })
    } else if (listRole === "Лучшие фильмы") {
      getTopRatedFilms();
      this.setState({
        getDataFunc: getTopRatedFilms
      })
    }
  }

  render() {
    const filmsList = this.props.FilmListReducer.listData.results;
    const { isLoading, error } = this.props.FilmListReducer;
    const { page, total_pages } = this.props.FilmListReducer.listData;

    return (
      <ErrorBoundary isError={error}>
        <LoadingBoundary isLoading={isLoading}>
          <div>
            <h1>{this.props.listRole}:</h1>
            <FilmPageContainer>
              {filmsList.map((el) =>  <FilmCard key={el.id} film={el}/>)}
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

let mapStateToProps = ({ FilmListReducer }: AppStateType) => {
  return {
    FilmListReducer
  }
}

export default connect(mapStateToProps, {
  loadUpComingFilms,
  loadMostPopularFilms,
  getTopRatedFilms
})(FilmListPage);
