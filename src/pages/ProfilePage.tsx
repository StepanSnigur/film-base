import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../store/Store';
import { IUserMoviesList } from '../reducers/UserReducer';
import styled from 'styled-components';
import LoginBoundary from '../hoc/LoginBoundary';

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
  position: relative;
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
  
  @media (max-width: 900px) {
    font-size: 18px;
  }
`
const TabIconUnderline = styled.span`
  position: absolute;
  bottom: 0;
  height: 2px;
  background: #000;
  transition: .3s;
  
  ${(props: { tabUnderlineWidth: number, tabUnderlineLeft: number }) => `
    width: ${props.tabUnderlineWidth}px;
    left: ${props.tabUnderlineLeft}px;
  `};
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
interface IProfilePageContent {
  sessionId: string | null,
  userName: string | null,
  userAvatarHash: string | null,
  logOut: (sessionId: string) => void,
  tabs: ITab[]
}
interface ITab {
  list: IUserMoviesList,
  name: string,
  title: string,
  currentPage: number,
  pagesCount: number,
  error: boolean,
  updatePage: (page: number) => void,
  isTVSeries?: boolean
}

const ProfilePageContent: React.FC<IProfilePageContent> = (props) => {
  const tabHeadline = useRef<HTMLButtonElement>(null)
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0)
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0)
  const [activeTab, setActiveTab] = useState('favourite')
  const {
    sessionId,
    userName,
    userAvatarHash,
    logOut,
    tabs
  } = props;

  useEffect(() => {
    setTabUnderlineWidth(tabHeadline.current!.offsetWidth)
  }, [tabHeadline])

  const changeActiveTab = (e: React.MouseEvent<HTMLElement>, tabName: string) => {
    const node = e.target as HTMLElement
    const nodeLeftIndent = node.offsetLeft
    const nodeWidth = node.offsetWidth

    setTabUnderlineWidth(nodeWidth)
    setTabUnderlineLeft(nodeLeftIndent)
    setActiveTab(tabName)
  }

  return (
    <>
      <UserInfoWrapper>
        <UserIcon src={`https://secure.gravatar.com/avatar/${userAvatarHash}.jpg?s=100`} alt="Avatar"/>
        <UserName>{userName}</UserName>
        <LogOutButton onClick={() => logOut(sessionId!)}>Выйти</LogOutButton>
      </UserInfoWrapper>
      <TabIconsWrapper>
        {tabs.map(({ name, title }: any, i) => {
          return <TabIcon
            onClick={(e) => changeActiveTab(e, name)}
            key={i}
            ref={i === 0 ? tabHeadline : null}
          >{title}</TabIcon>
        })}
        <TabIconUnderline tabUnderlineWidth={tabUnderlineWidth} tabUnderlineLeft={tabUnderlineLeft}/>
      </TabIconsWrapper>
      <div>
        {tabs.map((tab: ITab, i) => {
          return <TabListContent
            key={i}
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
    </>
  )
}

const ProfilePage: React.FC<IProfilePage> = (props) => {
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
  } = props;

  useEffect(() => {
    if (isLogged) {
      getFavouriteMovies(userId!, sessionId!);
      getRatedMovies(userId!, sessionId!);
      getWatchList(userId!, sessionId!);
      getRatedTVSeries(userId!, sessionId!);
      getFavoriteTVSeries(userId!, sessionId!);
      getTVSeriesWatchlist(userId!, sessionId!);
    }
  }, [])
  const tabs = [
    {
      list: favouriteMovies,
      name: 'favourite',
      title: 'Избранные фильмы',
      currentPage: favouriteMovies.currentPage,
      pagesCount: favouriteMovies.pagesCount,
      error: favouriteMovies.isError,
      updatePage: (page: number) => getFavouriteMovies(userId!, sessionId!, page)
    },
    {
      list: ratedMovies,
      name: 'rated',
      title: 'Оцененные фильмы',
      currentPage: ratedMovies.currentPage,
      pagesCount: ratedMovies.pagesCount,
      error: ratedMovies.isError,
      updatePage: (page: number) => getRatedMovies(userId!, sessionId!, page)
    },
    {
      list: watchList,
      name: 'watchlist',
      title: 'Посмотреть позже (фильмы)',
      currentPage: watchList.currentPage,
      pagesCount: watchList.pagesCount,
      error: watchList.isError,
      updatePage: (page: number) => getWatchList(userId!, sessionId!, page)
    },
    {
      list: ratedTVSeries,
      name: 'ratedTVSeries',
      title: 'Оцененные сериалы',
      currentPage: ratedTVSeries.currentPage,
      pagesCount: ratedTVSeries.pagesCount,
      error: ratedTVSeries.isError,
      updatePage: (page: number) => getRatedTVSeries(userId!, sessionId!, page),
      isTVSeries: true
    },
    {
      list: favouriteTVSeries,
      name: 'favouriteTVSeries',
      title: 'Избранные сериалы',
      currentPage: favouriteTVSeries.currentPage,
      pagesCount: favouriteTVSeries.pagesCount,
      error: favouriteTVSeries.isError,
      updatePage: (page: number) => getFavoriteTVSeries(userId!, sessionId!, page),
      isTVSeries: true
    },
    {
      list: tvSeriesWatchList,
      name: 'tvSeriesWatchList',
      title: 'Посмотреть позже (сериалы)',
      currentPage: tvSeriesWatchList.currentPage,
      pagesCount: tvSeriesWatchList.pagesCount,
      error: tvSeriesWatchList.isError,
      updatePage: (page: number) => getTVSeriesWatchlist(userId!, sessionId!, page),
      isTVSeries: true
    },
  ]

  return (
    <LoginBoundary>
      <ProfilePageContent
        sessionId={sessionId}
        userName={userName}
        userAvatarHash={userAvatarHash}
        tabs={tabs}
        logOut={logOut}
      />
    </LoginBoundary>
  )
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
