import React from 'react'
import { Link } from 'react-router-dom'

const NavSection = () => {
  return (
    <nav>
      <Link to="/admin">Home</Link>
      <Link to="/admin/company">company</Link>
      <Link to="/admin/voyage">voyage</Link>
    </nav>
  )
}
export default NavSection
