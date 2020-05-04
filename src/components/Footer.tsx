import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterWrapper = styled.div`
  width: 100%;
  margin-top: 35px;
  padding-top: 7px;
  padding-bottom: 7px;
  background: #444444;
  
  * {
    margin: 0;
    padding: 0;
  }
`
const FooterContainer = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
const FooterLink = styled.a`
  text-decoration: none;
  color: #fff;
  font-size: 19px;
  
  &:hover {
    text-decoration: underline;
  }
`
const FooterText = styled.h3`
  color: #fff;
  font-size: 19px;
  font-weight: normal;
  
  @media (max-width: 400px) {
    font-size: 15px;
  }
`
const HeaderLogo = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-size: 40px;
  cursor: pointer;
`

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <div>
          <FooterLink href="mailto:snigur-stepan@mail.ru">Связаться</FooterLink>
          <FooterText>Наш телефон: +7 (918) 078-03-38</FooterText>
        </div>
        <HeaderLogo to="/">FB</HeaderLogo>
      </FooterContainer>
    </FooterWrapper>
  )
}

export default Footer;
