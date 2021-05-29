import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import shallow from 'zustand/shallow'
import useAuthStore from '../../stores/authStore'
const SignUpSection = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: '',
  })
  const [signUp, signUpErrors, successMessage] = useAuthStore(
    (state) => [state.signUp, state.signUpErrors, state.successMessage],
    shallow
  )
  const history = useHistory()
  function changeUserState(e) {
    setUser((state) => ({ ...state, [e.target.name]: e.target.value }))
  }
  function send() {
    signUp({ ...user })
  }
  useEffect(() => {
    if (successMessage) {
      useAuthStore.setState({ signUpErrors: [] })
      history.push('/login', { from: 'signup', value: true })
    }
  }, [successMessage])

  return (
    <div>
      <h1>s'inscrire</h1>
      <div>
        <label>Prenom</label>
        <input
          type="text"
          value={user.firstName}
          name="firstName"
          onChange={changeUserState}
        />
        <div>
          {signUpErrors.filter((error) => error.param === 'firstName')[0]?.msg}
        </div>
      </div>
      <div>
        <label>Nom</label>
        <input
          type="text"
          value={user.lastName}
          name="lastName"
          onChange={changeUserState}
        />
        <div>
          {signUpErrors.filter((error) => error.param === 'lastName')[0]?.msg}
        </div>
      </div>
      <div>
        <label>email</label>
        <input
          type="email"
          value={user.email}
          name="email"
          onChange={changeUserState}
        />
        <div>
          {signUpErrors.filter((error) => error.param === 'email')[0]?.msg}
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
          {signUpErrors.filter((error) => error.param === 'password')[0]?.msg}
        </div>
      </div>
      <div>
        <label>Retaper le Mot de passe</label>
        <input
          type="password"
          value={user.rePassword}
          name="rePassword"
          onChange={changeUserState}
          required={true}
        />
        <div>
          {user.rePassword && user.rePassword !== user.password
            ? 'le "re-mot de passe" doit être similaire au mot de passe"'
            : null}
        </div>
      </div>
      <button onClick={send}>s'inscrire</button>
    </div>
  )
}

export default SignUpSection
