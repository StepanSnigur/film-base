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

    const ProfilePageContent = () => {
      return (
        <div>
          <UserInfoWrapper>
            <UserIcon src={`https://secure.gravatar.com/avatar/${userAvatarHash}.jpg?s=100`} alt="Avatar"/>
            <UserName>{userName}</UserName>
            <LogOutButton onClick={() => logOut(sessionId!)}>Выйти</LogOutButton>
          </UserInfoWrapper>
          <TabIconsWrapper>
            <TabIcon onClick={() => this.changeActiveTab('favourite')} isActive={activeTab === 'favourite'}>Избранные
              фильмы</TabIcon>
            <TabIcon onClick={() => this.changeActiveTab('rated')} isActive={activeTab === 'rated'}>Оцененные
              фильмы</TabIcon>
            <TabIcon onClick={() => this.changeActiveTab('watchlist')} isActive={activeTab === 'watchlist'}>Посмотреть
              позже (фильмы)</TabIcon>
            <TabIcon onClick={() => this.changeActiveTab('ratedTVSeries')}
                     isActive={activeTab === 'ratedTVSeries'}>Оцененные сериалы</TabIcon>
            <TabIcon onClick={() => this.changeActiveTab('favouriteTVSeries')}
                     isActive={activeTab === 'favouriteTVSeries'}>Избранные сериалы</TabIcon>
            <TabIcon onClick={() => this.changeActiveTab('tvSeriesWatchlist')}
                     isActive={activeTab === 'tvSeriesWatchlist'}>Посмотреть позже (сериалы)</TabIcon>
          </TabIconsWrapper>
          <div>
            <TabListContent
              list={favouriteMovies}
              componentName="favourite"
              activeComponentName={activeTab}
              currentPage={favouriteMovies.currentPage}
              pagesCount={favouriteMovies.pagesCount}
              isError={favouriteMovies.isError}
              updatePage={(page) => getFavouriteMovies(userId!, sessionId!, page)}
            />
            <TabListContent
              list={ratedMovies}
              componentName="rated"
              activeComponentName={activeTab}
              currentPage={ratedMovies.currentPage}
              pagesCount={ratedMovies.pagesCount}
              isError={ratedMovies.isError}
              updatePage={(page) => getRatedMovies(userId!, sessionId!, page)}
            />
            <TabListContent
              list={watchList}
              componentName="watchlist"
              activeComponentName={activeTab}
              currentPage={ratedTVSeries.currentPage}
              pagesCount={ratedTVSeries.pagesCount}
              isError={ratedTVSeries.isError}
              updatePage={(page) => getWatchList(userId!, sessionId!, page)}
            />
            <TabListContent
              list={ratedTVSeries}
              componentName="ratedTVSeries"
              activeComponentName={activeTab}
              currentPage={watchList.currentPage}
              pagesCount={watchList.pagesCount}
              isError={watchList.isError}
              isTVSeries={true}
              updatePage={(page) => getRatedTVSeries(userId!, sessionId!, page)}
            />
            <TabListContent
              list={favouriteTVSeries}
              componentName="favouriteTVSeries"
              activeComponentName={activeTab}
              currentPage={favouriteTVSeries.currentPage}
              pagesCount={favouriteTVSeries.pagesCount}
              isError={favouriteTVSeries.isError}
              isTVSeries={true}
              updatePage={(page) => getFavoriteTVSeries(userId!, sessionId!, page)}
            />
            <TabListContent
              list={tvSeriesWatchList}
              componentName="tvSeriesWatchlist"
              activeComponentName={activeTab}
              currentPage={tvSeriesWatchList.currentPage}
              pagesCount={tvSeriesWatchList.pagesCount}
              isError={tvSeriesWatchList.isError}
              isTVSeries={true}
              updatePage={(page) => getTVSeriesWatchlist(userId!, sessionId!, page)}
            />
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
