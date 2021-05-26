import React from 'react'
import { Link } from 'react-router-dom'

const GenericNav = ({ actions, section }) => {
  return (
    <div>
      {actions.map((action, index) => {
        return (
          <Link key={index} to={`/admin/${section}/${action.value}`}>
            {action.label}
          </Link>
        )
      })}
    </div>
  )
}

export default GenericNav
