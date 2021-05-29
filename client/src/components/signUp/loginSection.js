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
  return (
    <div>
      <h1>Login</h1>
      {location.state?.from == 'signup' && location.state.value ? (
        <h2>un email de vérification a été envoyer dans votre boite </h2>
      ) : null}
      {location.state?.from == 'admin' && location.state.value ? (
        <h2>veuillez vous identifier </h2>
      ) : null}
      <div>
        <label>email</label>
        <input
          type="email"
          value={user.email}
          name="email"
          onChange={changeUserState}
        />
        <div>
          {loginErrors.filter((error) => error.param === 'email')[0]?.msg}
        </div>
      </div>
      <div>
        <label>Mot de passe</label>
        <input
          type="password"
          value={user.password}
          name="password"
          onChange={changeUserState}
        />
        <div>
          {loginErrors.filter((error) => error.param === 'password')[0]?.msg}
        </div>
      </div>
      <button onClick={send}>se connecter</button>
      <div>{errorMessage}</div>
    </div>
  )
}

export default LoginSection
