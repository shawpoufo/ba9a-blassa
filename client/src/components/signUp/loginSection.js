import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import shallow from 'zustand/shallow'
import useAuthStore from '../../stores/authStore'
const LoginSection = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const location = useLocation()
  const [login, errorMessage] = useAuthStore(
    (state) => [state.login, state.errorMessage],
    shallow
  )
  function changeUserState(e) {
    setUser((state) => ({ ...state, [e.target.name]: e.target.value }))
  }
  function send() {
    login({ ...user })
  }
  useEffect(() => {
    console.log(errorMessage)
  }, [errorMessage])
  return (
    <div>
      <h1>Login</h1>

      {location.state ? (
        <h2>un email de vérification a été envoyer dans votre boite </h2>
      ) : null}
      <div>
        <label>email</label>
        <input
          type="email"
          value={user.email}
          name="email"
          onChange={changeUserState}
        />
        {/* <div>
          {signUpErrors.filter((error) => error.param === 'email')[0]?.msg}
        </div> */}
      </div>
      <div>
        <label>Mot de passe</label>
        <input
          type="password"
          value={user.password}
          name="password"
          onChange={changeUserState}
        />
        {/* <div>
          {signUpErrors.filter((error) => error.param === 'password')[0]?.msg}
        </div> */}
      </div>
      <button onClick={send}>se connecter</button>
      <div>{errorMessage}</div>
    </div>
  )
}

export default LoginSection
