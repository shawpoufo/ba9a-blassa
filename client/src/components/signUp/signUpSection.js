import React, { useState } from 'react'

const SignUpSection = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: '',
  })
  function changeUserState(e) {
    setUser((state) => ({ ...state, [e.target.name]: e.target.value }))
  }
  function signUP() {
    //validate
  }
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
      </div>
      <div>
        <label>Nom</label>
        <input
          type="text"
          value={user.lastName}
          name="lastName"
          onChange={changeUserState}
        />
      </div>
      <div>
        <label>email</label>
        <input
          type="email"
          value={user.email}
          name="email"
          onChange={changeUserState}
        />
      </div>
      <div>
        <label>Mot de passe</label>
        <input
          type="password"
          value={user.password}
          name="password"
          onChange={changeUserState}
        />
      </div>
      <div>
        <label>Retaper le Mot de passe</label>
        <input
          type="password"
          value={user.rePassword}
          name="rePassword"
          onChange={changeUserState}
        />
      </div>
      <button>s'inscrire</button>
    </div>
  )
}

export default SignUpSection
