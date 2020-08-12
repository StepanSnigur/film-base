import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { FilmsLists } from '../data/ListPages'
import SearchMovieForm from './SearchMovieForm'
import AuthButton from './AuthButton'

const HeaderWrapper = styled.div`
  width: 100%;
  padding-top: 20px;
  margin-bottom: 15px;
  background: #444444;
`
const HeaderContainer = styled.div`
  width: 1200px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
const HeaderLogo = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 40px;
  cursor: pointer;
`
const HeaderLinksWrapper = styled.div`
  justify-content: center;
  text-align: center;
  padding-bottom: 30px;
  margin-top: 10px;
`
const HeaderLink = styled(Link)`
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

const Header = () => (
  <HeaderWrapper>
    <HeaderContainer>
      <HeaderLogo to="/">FB</HeaderLogo>
      <SearchMovieForm />
      <AuthButton />
    </HeaderContainer>
    <HeaderLinksWrapper>
      {FilmsLists.map(({ title, url }, i) => (
        <HeaderLink key={i} to={url}>{title}</HeaderLink>
      ))}
    </HeaderLinksWrapper>
  </HeaderWrapper>
)

export default Header;
