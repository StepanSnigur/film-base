import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AuthUser } from './actions/AuthActions';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import styled from 'styled-components';

import { FilmsLists } from './data/ListPages'
import Header from './components/Header';
import FilmsListPage from './pages/FilmsListPage';
import FilmPage from './pages/FilmPage';
import TVSeriesPage from './pages/TVSeriesPage';
import Footer from './components/Footer';

import WithSuspense from './hoc/WithSuspense';

const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const AuthForm = React.lazy(() => import('./components/AuthForm'));

const Wrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 1300px) {
    width: 900px;
  }
  @media (max-width: 1000px) {
    width: 850px;
  }
  @media (max-width: 900px) {
    width: 500px;
  }
  @media (max-width: 550px) {
    width: 375px;
  }
  @media (max-width: 400px) {
    width: 345px;
  }
`

export const appHistory = createBrowserHistory()
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const userData: {
      userName: string,
      password: string
    } = JSON.parse(localStorage.getItem('userAuthData')!)
    userData && dispatch(AuthUser(userData.userName, userData.password))
  }, [dispatch])

  return (
    <Router history={appHistory}>
      <Header/>
      <Wrapper>
        <Switch>
          {FilmsLists.map((filmList, i) => (
            <Route
              key={i}
              path={filmList.url}
              exact={filmList.url === '/'}
              render={() => <FilmsListPage listRole={filmList.title} />}
            />
          ))}

          <Route
            path="/film/:id"
            render={({ match, history }) => {
              const { id } = match.params
              return <FilmPage history={history} filmId={id} />
            }}
          />
          <Route
            path="/tv-series/:id"
            render={({ match, history }) => {
              const { id } = match.params
              return <TVSeriesPage history={history} tvSeriesId={id} />
            }}
          />

          <Route path="/authForm" render={WithSuspense(AuthForm)}/>
          <Route path="/profile" render={WithSuspense(ProfilePage)}/>
        </Switch>
      </Wrapper>
      <Footer/>
    </Router>
  )
}

export default App;
