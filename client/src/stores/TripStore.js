import create from 'zustand'
import axios from 'axios'

const useTripStore = create((set, get) => ({
  trips: [],
  errorMessage: '',
  searchQuery: '',
  searchObject: {},
  setQuery: () => {
    let params = '?'
    Object.entries(get().searchObject).forEach((prop) => {
      params = params.concat(`${prop[0]}=${prop[1]}&`)
    })
    set({ searchQuery: params.slice(0, -1) })
  },
  addParam: (param) => {
    set((state) => ({
      searchObject: { ...state.searchObject, ...param },
    }))
  },
  clearTrips: () => set({ trips: [] }),
  fetchTrips: (params) => {
    axios
      .get(`http://localhost:3000/admin/trip${params}`)
      .then((response) => {
        const { rows } = response.data.payload
        set((state) => {
          return { trips: [...state.trips, ...rows] }
        })
        set({ errorMessage: '' })
      })
      .catch((error) => {
        const errMessage = error.response.data.response.data.payload.message
        set({ errorMessage: errMessage ? errMessage : '' })
      })
  },
}))

export default useTripStore
