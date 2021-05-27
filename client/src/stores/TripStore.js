import create from 'zustand'
import axios from 'axios'

const useTripStore = create((set, get) => ({
  trips: [],
  count: 0,
  errorMessage: '',
  successMessage: '',
  searchQuery: '',
  searchObject: {},
  offset: null,
  selectedCity: '',
  resetOffset: () => set({ offset: null }),
  resetSearch: () =>
    set({
      offset: 0,
      count: null,
      errorMessage: '',
      searchObject: {},
      searchQuery: '',
    }),
  setSearchQuery: () => {
    let params = '?'
    Object.entries(get().searchObject).forEach((prop) => {
      if (prop[1] || prop[1] === 0)
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
    if (!params) params = get().searchQuery
    axios
      .get(`http://localhost:3000/admin/trip${params}`)
      .then((response) => {
        const { rows, offset, count } = response.data.payload
        console.log(offset, count)
        rows.sort((first, second) => first.startDate - second.startDate)
        set({
          trips: rows,
          errorMessage: '',
          offset: offset,
          count: count,
        })
      })
      .catch((error) => {
        if (error.response.status !== 500) {
          const errMessage = error.response.data.payload
          set({ errorMessage: errMessage ? errMessage : '' })
        } else console.log('500')
      })
  },
  addFullTrip: (company, tripData, startStation, endStation, stopOvers) => {
    const reqCompany = { companyId: company.id, companyName: company.name }
    const reqStartStation = {
      startStationId: startStation.id,
      startStationName: startStation.name,
      startCityName: startStation.city,
    }
    const reqEndStation = {
      endStationId: endStation.id,
      endStationName: endStation.name,
      endCityName: endStation.city,
    }
    const reqTripData = {
      ...tripData,
      startDate: `${tripData.startDate} ${tripData.startTime}`,
      endDate: `${tripData.endDate} ${tripData.endTime}`,
    }
    axios
      .post('http://localhost:3000/admin/fulltrip', {
        ...reqCompany,
        ...reqStartStation,
        ...reqEndStation,
        ...reqTripData,
        stopOvers,
      })
      .then((response) => {
        const fullTrip = response.data.payload
        set((state) => {
          return {
            trips: [...state.trips, fullTrip],
            errorMessage: '',
            successMesage: 'voyages ajouter avec succès',
          }
        })
      })
      .catch((error) => {
        if (error.response.status !== 500) {
          const em = error.response.data.payload
          set({ errorMessage: em, successMesage: '' })
        }
      })
  },
}))

export default useTripStore
