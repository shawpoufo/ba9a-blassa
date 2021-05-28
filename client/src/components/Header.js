import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <div>
        <Link to="/signup">s'inscrire</Link>
        <Link to="/signin">se connecter</Link>
      </div>
    </div>
  )
}

export default Header
