import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import shallow from 'zustand/shallow'
import useAuthStore from '../../stores/authStore'
const LoginSection = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const location = useLocation()
  const history = useHistory()
  const [login, errorMessage, token, loginErrors] = useAuthStore(
    (state) => [
      state.login,
      state.errorMessage,
      state.token,
      state.loginErrors,
    ],
    shallow
  )

  function changeUserState(e) {
    setUser((state) => ({ ...state, [e.target.name]: e.target.value }))
  }
  function send() {
    login({ ...user })
  }
  useEffect(() => {
    if (token) {
      useAuthStore.setState({ loginErrors: [], errorMessage: '' })
      history.push('/trips')
    }
  }, [token])
  useEffect(() => {
    return () => {
      useAuthStore.setState({ loginErrors: [], errorMessage: '' })
    }
  }, [])
  return (
    <div className="container">
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <h1>Login</h1>
          {location.state?.from == 'signup' && location.state.value === true ? (
            <h5 className="text-success">
              un email de vérification a été envoyer dans votre boite{' '}
            </h5>
          ) : null}
          {location.state?.from == 'admin' && location.state.value === true ? (
            <h5 className="text-danger">veuillez vous identifier </h5>
          ) : null}
          <div>
            <label className="me-5 form-label">email</label>
            <input
              className="ms-3 "
              type="email"
              value={user.email}
              name="email"
              onChange={changeUserState}
            />
            <div className="text-danger">
              {loginErrors.filter((error) => error.param === 'email')[0]?.msg}
            </div>
          </div>
          <div>
            <label>Mot de passe</label>
            <input
              className="ms-2"
              type="password"
              value={user.password}
              name="password"
              onChange={changeUserState}
            />
            <div className="text-danger">
              {
                loginErrors.filter((error) => error.param === 'password')[0]
                  ?.msg
              }
            </div>
          </div>
          <button className="btn btn-dark text-center mt-2" onClick={send}>
            se connecter
          </button>
          <div className="text-danger">{errorMessage}</div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  )
}

export default LoginSection
