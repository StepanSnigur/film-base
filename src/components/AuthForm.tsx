import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../store/Store';
import styled from 'styled-components';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { required } from '../utils/Validators';
import { Input, CheckboxInput } from './FormControls';

import { AuthUser } from '../actions/AuthActions';
import Preloader from './Preloader';

import showPasswordIcon from '../img/showPasswordIcon.png';
import hidePasswordIcon from '../img/hidePasswordIcon.png';

const AuthFormWrapper = styled.form`
  width: 300px;
  margin: 0 auto;
  margin-top: 20px;
`
const AuthFormInput = styled(Field)`
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 35px;
  padding: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #eee;
  font-size: 16px;
`
const RememberMeCheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  label {
    margin-left: 7px;
  }
`
const PasswordInputWrapper = styled.div`
  position: relative;
`
const ShowPasswordBtn = styled.span`
  position: absolute;
  right: 7px;
  top: calc(35px/2);
  transform: translateY(-50%);
  width: 25px;
  height: 25px;
  line-height: 25px;
  cursor: pointer;
  
  img {
    width: 100%;
    height: auto;
  }
`
const FormBtn = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #eee;
  background: #7d97cd;
  font-size: 16px;
  cursor: pointer;
`
const ErrorMessage = styled.span`
  display: block;
  margin-bottom: 10px;
`
const RegistrationBtn = styled.a`
  width: 100%;
  height: 40px;
  display: block;
  margin-top: 7px;
  border-radius: 5px;
  border: 1px solid #eee;
  background: #7d97cd;
  font-size: 16px;
  line-height: 40px;
  text-decoration: none;
  text-align: center;
  color: #000;
  cursor: pointer;
`

const AuthenticationForm: React.FC<InjectedFormProps> = props => {
  const [isPasswordVisible, changePasswordVisible] = useState(false)

  return (
    <AuthFormWrapper onSubmit={props.handleSubmit}>
      <AuthFormInput
        // @ts-ignore
        component={Input}
        type="text"
        name="nickName"
        placeholder="Введите никнейм"
        validate={[required]}
      />
      <PasswordInputWrapper>
        <AuthFormInput
          // @ts-ignore
          component={Input}
          type={isPasswordVisible ? "text" : "password"}
          name="password"
          placeholder="Введите пароль"
          validate={[required]}
        />
        <ShowPasswordBtn onClick={() => changePasswordVisible(!isPasswordVisible)}>
          <img
            src={isPasswordVisible ? hidePasswordIcon : showPasswordIcon}
            alt={isPasswordVisible ? "hide password" : "show password"}
          />
        </ShowPasswordBtn>
      </PasswordInputWrapper>
      <RememberMeCheckboxWrapper>
        <Field
          component={CheckboxInput}
          id="rememberMe"
          name="rememberMe"
        />
        <label htmlFor="rememberMe">запомнить меня</label>
      </RememberMeCheckboxWrapper>
      {props.error && <ErrorMessage>{props.error}</ErrorMessage>}
      <FormBtn type="submit">Войти</FormBtn>
      <RegistrationBtn href="https://www.themoviedb.org/account/signup" target="_blank">Регистрация</RegistrationBtn>
    </AuthFormWrapper>
  )
}
interface IFormData {
  nickName: string,
  password: string,
  rememberMe: boolean
}
const ReduxAuthForm = reduxForm<IFormData>({
  form: 'auth'
})(AuthenticationForm)

interface IAuthForm {
  isLoading: boolean,
  isLogged: boolean,
  AuthUser: (nickName: string, password: string, rememberMe: boolean) => void
}
const AuthForm: React.FC<IAuthForm> = ({ isLoading, isLogged, AuthUser }) => {
  const onSubmit = (formData: IFormData) => {
    const { nickName, password, rememberMe } = formData
    AuthUser(nickName, password, rememberMe)
  }

  return (
    <>
      {isLoading && <Preloader/>}
      {isLogged ? <Redirect to={'./profile'}/> : <ReduxAuthForm onSubmit={onSubmit}/>}
    </>
  )
}

const mapStateToProps = ({ user }: AppStateType) => {
  return {
    isLogged: user.isLogged,
    isLoading: user.isLoading
  }
}

export default connect(mapStateToProps, { AuthUser })(AuthForm);
