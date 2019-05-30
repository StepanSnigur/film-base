import React, { Component } from 'react';
import styled from 'styled-components';
import { Link }  from 'react-router-dom';

let FooterWrapper = styled.div`
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
let FooterContainer = styled.div`
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
`
let FooterLink = styled.a`
    text-decoration: none;
    color: #fff;
    font-size: 19px;
    
    &:hover {
        text-decoration: underline;
    }
`
let FooterText = styled.h3`
    color: #fff;
    font-size: 19px;
    font-weight: normal;
`
let HeaderLogo = styled(Link)`
    text-decoration: none;
    color: #fff;
    font-size: 40px;
    cursor: pointer;
`

class Footer extends Component {
    render() {
        return (
            <FooterWrapper>
                <FooterContainer>
                    <div>
                        <FooterLink href="mailto:snigur-stepan@mail.ru">Contact us</FooterLink>
                        <FooterText>Our phone: +7 (918) 078-03-38</FooterText>
                    </div>
                    <HeaderLogo to="/">FB</HeaderLogo>
                </FooterContainer>
            </FooterWrapper>
        );
    }
}

export default Footer;