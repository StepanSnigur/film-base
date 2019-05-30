import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './reducers/Reducer';
import FilmService from './services/FilmService';
import { BrowserRouter as Router, Route, HashRouter } from 'react-router-dom';
import styled from 'styled-components';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import UpComingPage from './pages/UpComingPage';
import PopularFilmsPage from './pages/PopularFilmsPage';
import FilmPage from './pages/FilmPage';
import Footer from './components/Footer';

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
`

let service = new FilmService();

let getTopRelatedFilms = async () => {
    let result = await service.getTopRatedFilms();
    store.dispatch({type: 'LOAD_TOP_RELATED_FILMS', payload: result});
}

class App extends Component {
    componentDidMount () {
        getTopRelatedFilms();
    }
    render () {
        return (
            <Provider store={store}>
                <Router>
                    <HashRouter>
                        <Header />
                        <Wrapper>
                            <Route path="/" exact component={() => <HomePage service={service} />}/>
                            <Route path="/upcoming" component={() => <UpComingPage service={service} />}/>
                            <Route path="/popular" component={() => <PopularFilmsPage service={service} />}/>
                            <Route path="/film/:id"
                                   render={
                                       ({ match, history }) => {
                                           let { id } = match.params;
                                           return <FilmPage service={service} history={history} filmId={id} />
                                       }
                                   }
                            />
                        </Wrapper>
                        <Footer />
                    </HashRouter>
                </Router>
            </Provider>
        );
    }
}

export default App;
