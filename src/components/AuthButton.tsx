import React from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../store/Store';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ButtonWrapper = styled.div`
  justify-self: flex-end;
`
const UserIcon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`
const AuthBtn = styled(Link)`
  height: 50px;
  border: none;
  background: none;
  color: #fff;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
`

interface IAuthButton {
  isLogged: boolean,
  userAvatar: string | null
}

const AuthButton: React.FC<IAuthButton> = (props) => {
  return (
    <ButtonWrapper>
      {
        props.isLogged ?
        <Link
          to={{
            pathname: '/profile',
            state: { title: 'Профиль' }
          }}
        >
          <UserIcon src={`https://secure.gravatar.com/avatar/${props.userAvatar}.jpg?s=50`}
                    alt="Avatar"/>
        </Link> :
        <AuthBtn to={{
          pathname: '/authForm',
          state: { title: 'Войти' }
        }}>войти</AuthBtn>
      }
    </ButtonWrapper>
  )
}

const mapStateToProps = ({ user }: AppStateType) => {
  return {
    isLogged: user.isLogged,
    userAvatar: user.userAvatarHash
  }
}

export default connect(mapStateToProps)(AuthButton);
