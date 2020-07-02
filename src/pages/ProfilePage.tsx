import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../store/Store';
import { IUserMoviesList } from '../reducers/UserReducer';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import TabListContent from '../components/TabListContent';

import { getFavouriteMovies, getRatedMovies, getWatchList } from '../actions/FilmActions';
import { getRatedTVSeries, getFavoriteTVSeries, getTVSeriesWatchlist } from '../actions/TVSeriesActions';
import { logOut } from '../actions/AuthActions';

const UserInfoWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 100px 1fr 8fr;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
`
const UserIcon = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`
const UserName = styled.h1`
  margin-left: 30px;
`
const LogOutButton = styled.button`
  display: block;
  justify-self: flex-end;
  width: 200px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 4px;
  border: 3px solid #eee;
  background: none;
  cursor: pointer;
  
  @media (max-width: 900px) {
    grid-column: 1 / 3;
    justify-self: center;
  }
`
const TabIconsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
`
const TabIcon = styled.button`
  display: block;
  padding: 0;
  padding-bottom: 5px;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  
  ${(props: { isActive: boolean }) => props.isActive && `
    border-bottom: 2px solid #000;
  `}
  
  @media (max-width: 900px) {
    font-size: 18px;
  }
`

interface IProfilePage {
  sessionId: string | null,
  userId: number | null,
  isLogged: boolean,
  userName: string | null,
  userAvatarHash: string | null,
  favouriteMovies: IUserMoviesList,
  ratedMovies: IUserMoviesList,
  watchList: IUserMoviesList,
  ratedTVSeries: IUserMoviesList,
  favouriteTVSeries: IUserMoviesList,
  tvSeriesWatchList: IUserMoviesList,
  getFavouriteMovies: (userId: number, sessionId: string, page?: number) => void,
  getRatedMovies: (userId: number, sessionId: string, page?: number) => void,
  getWatchList: (userId: number, sessionId: string, page?: number) => void,
  getRatedTVSeries: (userId: number, sessionId: string, page?: number) => void,
  getFavoriteTVSeries: (userId: number, sessionId: string, page?: number) => void,
  getTVSeriesWatchlist: (userId: number, sessionId: string, page?: number) => void,
  logOut: (sessionId: string) => void
}
interface ITab {
  list: IUserMoviesList,
  name: string,
  currentPage: number,
  pagesCount: number,
  error: boolean,
  updatePage: (page: number) => void,
  isTVSeries?: boolean
}

class ProfilePage extends Component<IProfilePage> {
  state = {
    activeTab: 'favourite'
  }

  componentDidMount() {
    const {
      sessionId,
      userId,
      isLogged,
      getFavouriteMovies,
      getRatedMovies,
      getWatchList,
      getRatedTVSeries,
      getFavoriteTVSeries,
      getTVSeriesWatchlist
    } = this.props;

    if (isLogged) {
      getFavouriteMovies(userId!, sessionId!);
      getRatedMovies(userId!, sessionId!);
      getWatchList(userId!, sessionId!);
      getRatedTVSeries(userId!, sessionId!);
      getFavoriteTVSeries(userId!, sessionId!);
      getTVSeriesWatchlist(userId!, sessionId!);
    }
  }

  changeActiveTab = (tabName: string) => {
    this.setState({
      activeTab: tabName
    })
  }

  render() {
    const {
      isLogged,
      sessionId,
      userId,
      userName,
      userAvatarHash,
      favouriteMovies,
      getFavouriteMovies,
      ratedMovies,
      getRatedMovies,
      watchList,
      getWatchList,
      ratedTVSeries,
      getRatedTVSeries,
      favouriteTVSeries,
      getFavoriteTVSeries,
      tvSeriesWatchList,
      getTVSeriesWatchlist,
      logOut
    } = this.props;
    const { activeTab } = this.state;
    const tabNames = [
      {name: 'favourite', title: 'Избранные фильмы'},
      {name: 'rated', title: 'Оцененные фильмы'},
      {name: 'watchlist', title: 'Посмотреть позже (фильмы)'},
      {name: 'ratedTVSeries', title: 'Оцененные сериалы'},
      {name: 'favouriteTVSeries', title: 'Избранные сериалы'},
      {name: 'tvSeriesWatchList', title: 'Посмотреть позже (сериалы)'}
    ]
    const tabs = [
      {
        list: favouriteMovies,
        name: tabNames[0].name,
        currentPage: favouriteMovies.currentPage,
        pagesCount: favouriteMovies.pagesCount,
        error: favouriteMovies.isError,
        updatePage: (page: number) => getFavouriteMovies(userId!, sessionId!, page)
      },
      {
        list: ratedMovies,
        name: tabNames[1].name,
        currentPage: ratedMovies.currentPage,
        pagesCount: ratedMovies.pagesCount,
        error: ratedMovies.isError,
        updatePage: (page: number) => getRatedMovies(userId!, sessionId!, page)
      },
      {
        list: watchList,
        name: tabNames[2].name,
        currentPage: watchList.currentPage,
        pagesCount: watchList.pagesCount,
        error: watchList.isError,
        updatePage: (page: number) => getWatchList(userId!, sessionId!, page)
      },
      {
        list: ratedTVSeries,
        name: tabNames[3].name,
        currentPage: ratedTVSeries.currentPage,
        pagesCount: ratedTVSeries.pagesCount,
        error: ratedTVSeries.isError,
        updatePage: (page: number) => getRatedTVSeries(userId!, sessionId!, page),
        isTVSeries: true
      },
      {
        list: favouriteTVSeries,
        name: tabNames[4].name,
        currentPage: favouriteTVSeries.currentPage,
        pagesCount: favouriteTVSeries.pagesCount,
        error: favouriteTVSeries.isError,
        updatePage: (page: number) => getFavoriteTVSeries(userId!, sessionId!, page),
        isTVSeries: true
      },
      {
        list: tvSeriesWatchList,
        name: tabNames[5].name,
        currentPage: tvSeriesWatchList.currentPage,
        pagesCount: tvSeriesWatchList.pagesCount,
        error: tvSeriesWatchList.isError,
        updatePage: (page: number) => getTVSeriesWatchlist(userId!, sessionId!, page),
        isTVSeries: true
      },
    ]

    const ProfilePageContent = () => {
      return (
        <div>
          <UserInfoWrapper>
            <UserIcon src={`https://secure.gravatar.com/avatar/${userAvatarHash}.jpg?s=100`} alt="Avatar"/>
            <UserName>{userName}</UserName>
            <LogOutButton onClick={() => logOut(sessionId!)}>Выйти</LogOutButton>
          </UserInfoWrapper>
          <TabIconsWrapper>
            {tabNames.map(({ name, title }) => {
              return <TabIcon
                onClick={() => this.changeActiveTab(name)}
                isActive={activeTab === name}
              >{title}</TabIcon>
            })}
          </TabIconsWrapper>
          <div>
            {tabs.map((tab: ITab) => {
              return <TabListContent
                list={tab.list}
                componentName={tab.name}
                activeComponentName={activeTab}
                currentPage={tab.currentPage}
                pagesCount={tab.pagesCount}
                isError={tab.error}
                updatePage={tab.updatePage}
                isTVSeries={tab.isTVSeries}
              />
            })}
          </div>
        </div>
      )
    }

    return (
      <>
        {isLogged ?
        <ProfilePageContent/> :
        <Redirect to={'/authForm'}/>}
      </>
    );
  }
}

const mapStateToProps = ({ user }: AppStateType) => {
  return {
    userName: user.userName,
    userAvatarHash: user.userAvatarHash,
    userId: user.userId,
    sessionId: user.sessionId,
    isLogged: user.isLogged,
    favouriteMovies: user.favouriteMovies,
    ratedMovies: user.ratedMovies,
    watchList: user.watchList,
    ratedTVSeries: user.ratedTVSeries,
    favouriteTVSeries: user.favouriteTVSeries,
    tvSeriesWatchList: user.tvSeriesWatchList
  }
}

export default connect(mapStateToProps, {
  getFavouriteMovies,
  getRatedMovies,
  getWatchList,
  getRatedTVSeries,
  getFavoriteTVSeries,
  getTVSeriesWatchlist,
  logOut
})(ProfilePage);
