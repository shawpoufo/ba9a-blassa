import axios from 'axios'
import create from 'zustand'
import useAuthStore from './authStore'

const useUserStore = create((set, get) => ({
  fetchUser: async () => {
    try {
      const response = await axios.get('http://localhost:3000/user/info', {
        headers: { Authorization: `Bearer ${useAuthStore.getState().token}` },
      })
      return response.data.payload
    } catch (error) {}
  },
}))

export default useUserStore
