import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import useAuthStore from '../../stores/authStore'
const LogoutSection = () => {
  function logout() {
    localStorage.clear()
    useAuthStore.setState({ token: '' })
  }
  const history = useHistory()

  useEffect(() => {
    logout()
    history.push('/')
  }, [])
  return <div></div>
}

export default LogoutSection
