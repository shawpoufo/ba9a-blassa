import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import shallow from 'zustand/shallow'
import useAuthStore from '../stores/authStore'
import 'bootstrap/dist/css/bootstrap.min.css'
const Header = () => {
  const [getToken, token] = useAuthStore(
    (state) => [state.getToken, state.token],
    shallow
  )
  useEffect(() => {
    getToken()
  }, [])

  return (
    <div className="container">
      <div className="row justify-content-end">
        <div className="col-auto">
          {!useAuthStore.getState().token ? (
            <>
              <Link to="/signup" className="link-danger">
                s'inscrire
              </Link>
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
    </div>
  )
}

export default Header
