import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router'
import shallow from 'zustand/shallow'
import useAuthStore from '../../stores/authStore'
const EmailValidationSection = () => {
  const [validateEmail, errorMessage, successMessage] = useAuthStore(
    (state) => [state.validateEmail, state.errorMessage, state.successMessage],
    shallow
  )
  const location = useLocation()
  const history = useHistory()
  useEffect(() => {
    validateEmail(location.search)
  }, [])
  useEffect(() => {
    if (successMessage) history.push('/login', 'validated')
  }, [successMessage])
  return (
    <div>
      <h1>{errorMessage}</h1>
    </div>
  )
}

export default EmailValidationSection
