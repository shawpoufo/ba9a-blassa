import create from 'zustand'
import axios from 'axios'
const useAuthStore = create((set, get) => ({
  token: '',
  signUpErrors: [],
  loginErrors: [],
  successMessage: false,
  errorMessage: '',
  signUp: (user) => {
    axios
      .post('http://localhost:3000/auth/signup', { ...user })
      .then((response) => {
        set({
          successMessage: true,
          signUpErrors: [],
          loginErrors: [],
        })
      })
      .catch((error) => {
        if (error.response.status !== 500) {
          const signUpMessages = error.response.data.payload
          set({ signUpErrors: signUpMessages, successMessage: false })
        }
      })
  },
  login: ({ email, password }) => {
    axios
      .post('http://localhost:3000/auth/login', { email, password })
      .then((response) => {
        const token = response.data.payload
        localStorage.setItem('token', token)
        set({ successMessage: true, errorMessage: '', token: token })
      })
      .catch((error) => {
        if (error.response.status !== 500) {
          const message = error.response.data.payload
          console.log(message)
          const err = Array.isArray(message)
            ? { errorMessage: '', loginErrors: message }
            : { errorMessage: message, loginErrors: [] }
          set({ ...err, successMessage: false })
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
  checkRole: async (role) => {
    try {
      const data = await axios.post(
        `http://localhost:3000/auth/checkrole`,
        { role },
        {
          headers: { Authorization: `Bearer ${get().token}` },
        }
      )

      return data.data.payload
    } catch (error) {
      if (error.response.status !== 500) {
        return false
      }
    }
  },
}))
export default useAuthStore
