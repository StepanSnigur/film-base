import React  from 'react'
import { AppStateType } from '../store/Store'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'

const LoginBoundary: React.FC = ({ children }) => {
  const isLogged = useSelector((state: AppStateType) => state.user.isLogged)
  return isLogged ? <>{children}</> : <Redirect to={{
    pathname: '/authForm',
    state: { title: 'Войти' }
  }} />
}

export default LoginBoundary
