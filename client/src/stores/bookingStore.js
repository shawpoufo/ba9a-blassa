import axios from 'axios'
import create from 'zustand'
import useAuthStore from '../stores/authStore'
import useTripStore from './TripStore'
const useBookingStore = create((set, get) => ({
  success: null,
  pay: (tripId, seats) => {
    axios
      .post(
        'http://localhost:3000/booking',
        { tripId, seats },
        {
          headers: { Authorization: `Bearer ${useAuthStore.getState().token}` },
        }
      )
      .then((response) => {
        useTripStore.getState().fetchTrips()
        set({ success: true })
      })
      .catch((error) => {
        if (error.response.status !== 500) {
          set({ success: false })
        }
      })
  },
}))

export default useBookingStore
