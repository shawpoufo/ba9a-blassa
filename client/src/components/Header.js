import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import shallow from 'zustand/shallow'
import useAuthStore from '../stores/authStore'

const Header = () => {
  const [getToken, token] = useAuthStore(
    (state) => [state.getToken, state.token],
    shallow
  )
  useEffect(() => {
    getToken()
  }, [])

  return (
    <div>
      <div>
        {!useAuthStore.getState().token ? (
          <>
            <Link to="/signup">s'inscrire</Link>
            <Link to="/login">se connecter</Link>
          </>
        ) : (
          <>
            <label> connected </label>
            <Link to="/logout">se déconnecter</Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
