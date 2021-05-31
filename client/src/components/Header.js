import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import shallow from 'zustand/shallow'
import useAuthStore from '../stores/authStore'
import 'bootstrap/dist/css/bootstrap.min.css'
const Header = () => {
  const [getToken, token, checkRole] = useAuthStore(
    (state) => [state.getToken, state.token, state.checkRole],
    shallow
  )
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    getToken()
  }, [])

  useEffect(async () => {
    const check = await checkRole('admin')
    console.log(`is admin ${check}`)
    setIsAdmin(check)
  }, [token])

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/trips">
          BA9ABLASSA
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {!useAuthStore.getState().token ? (
              <>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    s'inscrire
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    se connecter
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">
                    se déconnecter
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Actions
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink">
                    {isAdmin ? (
                      <li>
                        <Link to="/admin/trip/form" className="dropdown-item">
                          voyage
                        </Link>
                      </li>
                    ) : (
                      <li>
                        <Link to="/invoice" className="dropdown-item">
                          Facture
                        </Link>
                      </li>
                    )}
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
