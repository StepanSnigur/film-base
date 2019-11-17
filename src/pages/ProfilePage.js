import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import TabListContent from '../components/TabListContent';

import { getFavouriteMovies, getRatedMovies, getWatchList, logOut } from '../actions/Actions';

let UserInfoWrapper = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 100px 1fr 8fr;
    
    @media (max-width: 900px) {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
    }
`
let UserIcon = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
`
let UserName = styled.h1`
    margin-left: 30px;
`
let LogOutButton = styled.button`
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
let TabIconsWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
`
let TabIcon = styled.button`
    display: block;
    padding: 0;
    padding-bottom: 5px;
    border: none;
    background: none;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    
    ${({isActive}) => isActive && `
        border-bottom: 2px solid #000;
    `}
    
    @media (max-width: 900px) {
        font-size: 18px;
    }
`

class ProfilePage extends Component {
    state = {
        activeTab: 'favourite'
    }

    componentDidMount() {
        let { sessionId, userId, isLogged, getFavouriteMovies, getRatedMovies, getWatchList } = this.props;

        if (isLogged) {
            getFavouriteMovies(userId, sessionId);
            getRatedMovies(userId, sessionId);
            getWatchList(userId, sessionId);
        }
    }

    changeActiveTab = (tabName) => {
        this.setState({
            activeTab: tabName
        })
    }

    render() {
        let {
            isLogged,
            sessionId,
            userId,
            userName,
            userAvatar,
            favouriteMovies,
            getFavouriteMovies,
            ratedMovies,
            getRatedMovies,
            watchList,
            getWatchList,
            logOut
        } = this.props;
        let { activeTab } = this.state;

        let ProfilePageContent = () => {
            return (
                <div>
                    <UserInfoWrapper>
                        <UserIcon src={`https://secure.gravatar.com/avatar/${userAvatar}.jpg?s=100`} alt="Avatar" />
                        <UserName>{userName}</UserName>
                        <LogOutButton onClick={() => logOut(sessionId)}>Выйти</LogOutButton>
                    </UserInfoWrapper>
                    <TabIconsWrapper>
                        <TabIcon onClick={() => this.changeActiveTab('favourite')} isActive={activeTab === 'favourite'}>Избранные</TabIcon>
                        <TabIcon onClick={() => this.changeActiveTab('rated')} isActive={activeTab === 'rated'}>Оцененные</TabIcon>
                        <TabIcon onClick={() => this.changeActiveTab('watchlist')} isActive={activeTab === 'watchlist'}>Посмотреть</TabIcon>
                    </TabIconsWrapper>
                    <div>
                        <TabListContent
                            list={this.props.favouriteMovies}
                            componentName="favourite"
                            activeComponentName={activeTab}
                            currentPage={favouriteMovies.currentPage}
                            pagesCount={favouriteMovies.pagesCount}
                            isError={favouriteMovies.isError}
                            updatePage={(page) => getFavouriteMovies(userId, sessionId, page)}
                        />
                        <TabListContent
                            list={this.props.ratedMovies}
                            componentName="rated"
                            activeComponentName={activeTab}
                            currentPage={ratedMovies.currentPage}
                            pagesCount={ratedMovies.pagesCount}
                            isError={ratedMovies.isError}
                            updatePage={(page) => getRatedMovies(userId, sessionId, page)}
                        />
                        <TabListContent
                            list={this.props.watchList}
                            componentName="watchlist"
                            activeComponentName={activeTab}
                            currentPage={watchList.currentPage}
                            pagesCount={watchList.pagesCount}
                            isError={watchList.isError}
                            updatePage={(page) => getWatchList(userId, sessionId, page)}
                        />
                    </div>
                </div>
            )
        }

        return (
            <>
                {
                    isLogged ?
                    <ProfilePageContent /> :
                    <Redirect to={'/authForm'} />
                }
            </>
        );
    }
}

let mapStateToProps = ({ user }) => {
    return {
        userName: user.userName,
        userAvatarHash: user.userAvatarHash,
        userId: user.userId,
        sessionId: user.sessionId,
        isLogged: user.isLogged,
        favouriteMovies: user.favouriteMovies,
        ratedMovies: user.ratedMovies,
        watchList: user.watchList
    }
}

export default connect(mapStateToProps, { getFavouriteMovies, getRatedMovies, getWatchList, logOut })(ProfilePage);