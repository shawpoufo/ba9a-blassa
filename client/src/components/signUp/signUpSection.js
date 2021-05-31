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
    <div className="container">
      <h1>s'inscrire</h1>
      <div className="row row-cols-3">
        <div className="col-12 col-sm-6">
          <div className="row row-cols-1">
            <div className="col mb-3">
              <input
                className="form-control"
                type="text"
                value={user.firstName}
                name="firstName"
                placeholder="prénom"
                onChange={changeUserState}
              />
              <div className="text-danger">
                {
                  signUpErrors.filter((error) => error.param === 'firstName')[0]
                    ?.msg
                }
              </div>
            </div>
            <div className="col mb-3">
              <input
                className="form-control"
                type="text"
                value={user.lastName}
                name="lastName"
                placeholder="nom"
                onChange={changeUserState}
              />
              <div className="text-danger">
                {
                  signUpErrors.filter((error) => error.param === 'lastName')[0]
                    ?.msg
                }
              </div>
            </div>
            <div className="col mb-3">
              <input
                className="form-control"
                type="email"
                value={user.email}
                name="email"
                placeholder="email"
                onChange={changeUserState}
              />
              <div className="text-danger">
                {
                  signUpErrors.filter((error) => error.param === 'email')[0]
                    ?.msg
                }
              </div>
            </div>
            <div className="col mb-3">
              <input
                className="form-control"
                type="password"
                value={user.password}
                name="password"
                placeholder="mot de passe"
                onChange={changeUserState}
              />
              <div className="text-danger">
                {
                  signUpErrors.filter((error) => error.param === 'password')[0]
                    ?.msg
                }
              </div>
            </div>
            <div className="col mb-3">
              <input
                className="form-control"
                type="password"
                value={user.rePassword}
                name="rePassword"
                placeholder="retaper le mot de passe"
                onChange={changeUserState}
                required={true}
              />
              <div className="text-danger">
                {user.rePassword && user.rePassword !== user.password
                  ? 'le "re-mot de passe" doit être similaire au mot de passe"'
                  : null}
              </div>
            </div>
          </div>
        </div>
        <div className="col-1 col-sm-3"></div>
        <div className="col-1 col-sm-3"></div>
      </div>
      <button className="btn btn-outline-info" onClick={send}>
        s'inscrire
      </button>
    </div>
  )
}

export default SignUpSection
