import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import SearchMovieForm from './SearchMovieForm';
import AuthButton from './AuthButton';

let HeaderWrapper = styled.div`
    width: 100%;
    padding-top: 20px;
    margin-bottom: 15px;
    background: #444444;
`
let HeaderContainer = styled.div`
    width: 1200px;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    align-items: center;
    justify-content: space-between;
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
let HeaderLogo = styled(Link)`
    text-decoration: none;
    color: #fff;
    font-size: 40px;
    cursor: pointer;
`
let HeaderLinksWrapper = styled.div`
    justify-content: center;
    grid-column-start: 2; 
    grid-column-end: 3;
    text-align: center;
`
let HeaderLink = styled(Link)`
    position: relative;
    text-decoration: none;
    color: #fff;
    margin-left: 20px;
    padding-bottom: 3px;
    
    &:before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background: #fff;
        transform: scaleX(0);
        transform-origin: left;
        transition: .3s;
    }
    
    &:first-child {
        margin-left: 0;
    }
    
    &:hover {
        &:before {
            transform: scaleX(1);
        }
    }
    
    @media (max-width: 400px) {
        margin-left: 10px;
    }
`

class Header extends Component {
    render() {
        return (
            <HeaderWrapper>
                <HeaderContainer>
                    <HeaderLogo to="/">FB</HeaderLogo>
                    <SearchMovieForm />
                    <AuthButton />
                    <HeaderLinksWrapper>
                        <HeaderLink to="/">Лучшие</HeaderLink>
                        <HeaderLink to="/upcoming">Скоро</HeaderLink>
                        <HeaderLink to="/popular">Популярные</HeaderLink>
                    </HeaderLinksWrapper>
                </HeaderContainer>
            </HeaderWrapper>
        );
    }
}

export default Header;