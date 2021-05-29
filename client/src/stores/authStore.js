import create from 'zustand'
import axios from 'axios'
const AuthStore = create((set, get) => ({
  token: '',
  signUpErrors: [],
  successMessage: '',
  errorMessage: '',
  signUp: (user) => {
    axios
      .post('http://localhost:3000/auth/signup', { ...user })
      .then((response) => {
        set({
          successMessage:
            'vous êtes inscrit avec succès , valider votre compte depuis votre boitre email',
          signUpErrors: [],
        })
      })
      .catch((error) => {
        if (error.response.status !== 500) {
          const signUpMessages = error.response.data.payload
          set({ signUpErrors: signUpMessages, successMessage: true })
        }
      })
  },
  login: ({ email, password }) => {
    axios
      .post('http://localhost:3000/auth/login', { email, password })
      .then((response) => {
        const token = response.data.payload
        localStorage.setItem('token', token)
        set({ successMessage: true, errorMessage: '' })
      })
      .catch((error) => {
        if (error.response.status !== 500) {
          const message = error.response.data.payload
          set({ errorMessage: message, successMessage: false })
        }
      })
  },
  validateEmail: (key) => {
    axios
      .post(`http://localhost:3000/auth/validateemail${key}`)
      .then((response) => {
        set({ successMessage: true, errorMessage: '' })
      })
      .catch((error) => {
        if (error.response.status !== 500) {
          const message = error.response.data.payload
          set({ errorMessage: message, successMessage: false })
        }
      })
  },
  getToken: () => {
    set({ token: localStorage.getItem('token') })
  },
}))
export default AuthStore