import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

let ButtonWrapper = styled.div`
    justify-self: flex-end;
`
let UserIcon = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`
let AuthBtn = styled(Link)`
    height: 50px;
    border: none;
    background: none;
    color: #fff;
    font-size: 16px;
    text-decoration: none;
    cursor: pointer;
`

class AuthButton extends Component {
    render() {
        return (
            <ButtonWrapper>
                {
                    this.props.isLogged ?
                    <Link to={'/profile'}>
                        <UserIcon src={`https://secure.gravatar.com/avatar/${this.props.userAvatar}.jpg?s=50`} alt="Avatar" />
                    </Link> :
                    <AuthBtn to={'/authForm'}>войти</AuthBtn>
                }
            </ButtonWrapper>
        );
    }
}

let mapStateToProps = ({ user }) => {
    return {
        isLogged: user.isLogged,
        userAvatar: user.userAvatarHash
    }
}

export default connect(mapStateToProps)(AuthButton);