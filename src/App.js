import React  from 'react';
import { Provider } from 'react-redux';
import store from './store/Store';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Header from './components/Header';
import FilmListPage from './pages/FilmListPage';
import FilmPage from './pages/FilmPage';
import TVSeriesPage from './pages/TVSeriesPage';
import TVSeriesListPage from './pages/TVSeriesListPage';
import Footer from './components/Footer';

import WithSuspense from './hoc/WithSuspense';
let ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
let AuthForm = React.lazy(() => import('./components/AuthForm'));

let Wrapper = styled.div`
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

let App = (props) => {
    return (
        <Provider store={store}>
            <Router>
                <Header />
                <Wrapper>
                    <Switch>
                        <Route path="/" exact render={() => <FilmListPage listRole={"Лучшие фильмы"} />}/>
                        <Route path="/upcoming-films" render={() => <FilmListPage listRole={"Недавно вышедшие фильмы"} />}/>
                        <Route path="/popular-films" render={() => <FilmListPage listRole={"Популярные фильмы"} />}/>
                        <Route path="/film/:id"
                               render={
                                   ({ match, history }) => {
                                       let { id } = match.params;
                                       return <FilmPage history={history} filmId={id} />
                                   }
                               }
                        />

                        <Route path="/tv-series-on-air" render={() => <TVSeriesListPage listRole={"Сериалы" +
                        " в эфире"} />}/>
                        <Route path="/popular-tv-series" render={() => <TVSeriesListPage listRole={"Популярные сериалы"} />}/>
                        <Route path="/best-tv-series" render={() => <TVSeriesListPage listRole={"Лучшие сериалы"} />}/>
                        <Route path="/tv-series/:id"
                               render={
                                   ({ match, history }) => {
                                       let { id } = match.params;
                                       return <TVSeriesPage history={history} tvSeriesId={id} />
                                   }
                               }
                        />

                        <Route path="/authForm" render={WithSuspense(AuthForm)}/>
                        <Route path="/profile" render={WithSuspense(ProfilePage)}/>
                    </Switch>
                </Wrapper>
                <Footer />
            </Router>
        </Provider>
    );
}

export default App;
