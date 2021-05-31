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
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          BA9ABLASSA
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
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
              <li className="nav-item">
                <Link className="nav-link" to="/logout">
                  se déconnecter
                </Link>
              </li>
            )}
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
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
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
