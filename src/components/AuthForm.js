import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { required } from '../utils/Validators';
import { Input } from './FormControls';

import { AuthUser } from '../actions/AuthActions';
import Preloader from './Preloader';

let AuthFormWrapper = styled.form`
    width: 300px;
    margin: 0 auto;
    margin-top: 20px;
`
let AuthFormInput = styled(Field)`
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
let FormBtn = styled.button`
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #eee;
    background: #7d97cd;
    font-size: 16px;
    cursor: pointer;
`
let ErrorMessage = styled.span`
    display: block;
    margin-bottom: 10px;
`
let RegistrationBtn = styled.a`
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

let AuthenticationForm = (props) => {
    return (
        <AuthFormWrapper onSubmit={props.handleSubmit}>
            <AuthFormInput
                component={Input}
                type="text"
                name="nickName"
                placeholder="Введите никнейм"
                validate={[required]}
            />
            <AuthFormInput
                component={Input}
                type="password"
                name="password"
                placeholder="Введите пароль"
                validate={[required]}
            />
            { props.error && <ErrorMessage>{props.error}</ErrorMessage> }
            <FormBtn type="submit">Войти</FormBtn>
            <RegistrationBtn href="https://www.themoviedb.org/account/signup" target="_blank">Регистрация</RegistrationBtn>
        </AuthFormWrapper>
    )
}
let ReduxAuthForm = reduxForm({
    form: 'auth'
})(AuthenticationForm);

class AuthForm extends Component {
    render() {
        let onSubmit = (formData) => {
            let { nickName, password } = formData;
            this.props.AuthUser(nickName, password);
        }

        return (
            <>
                { this.props.isLoading && <Preloader /> }
                {
                    this.props.isLogged ?
                    <Redirect to={'./profile'} /> :
                    <ReduxAuthForm onSubmit={onSubmit} />
                }
            </>
        );
    }
}

let mapStateToProps = ({ user }) => {
    return {
        isLogged: user.isLogged,
        isLoading: user.isLoading
    }
}

export default connect(mapStateToProps, { AuthUser })(AuthForm);