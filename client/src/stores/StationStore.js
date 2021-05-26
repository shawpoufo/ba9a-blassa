import axios from 'axios'
import create from 'zustand'

const useStationStore = create((set, get) => ({
  station: [],
  searchObject: {},
  stationsByCities: [],
  selectedStation: { id: 0, name: '', city: '' },
  errorMessage: '',
  successMessage: '',
  addParam: (param) => {
    set((state) => ({
      searchObject: { ...state.searchObject, ...param },
    }))
  },
  fetchStations: () => {
    axios.get(`http://localhost:3000/admin/station`).then((response) => {
      const payload = response.data.payload
      set({ station: payload })
    })
  },
  fetchStationsByCities: () => {
    axios
      .get('http://localhost:3000/admin/station/city')
      .then((response) => {
        const payload = response.data.payload
        set({ stationsByCities: payload })
      })
      .catch((error) => console.log('something wrong !', error))
  },
  fetchStationById: (id) => {
    axios
      .get(`http://localhost:3000/admin/station/${get().selectedStation.id}`)
      .then((response) => {
        const payload = response.data.payload
        set({
          selectedStation: {
            id: payload.id,
            name: payload.name,
            city: payload.city,
          },
          errorMessage: '',
        })
      })
      .catch((error) => {
        if (error.response.data.status !== 500) {
          const message = error.response.data?.payload
          set({ errorMessage: message, successMessage: '' })
        }
      })
  },
  createStation: () => {
    axios
      .post(`http://localhost:3000/admin/station`, {
        name: get().selectedStation.name,
        city: get().selectedStation.city,
      })
      .then((response) => {
        const newStation = response.data.payload
        set({
          station: [...get().station, newStation],
          errorMessage: '',
          successMessage: 'station ajouter avec succèss!',
          selectedStation: { id: 0, name: '', city: '' },
        })
      })
      .catch((error) => {
        if (error.response.status !== 500) {
          const message = error.response.data.payload

          set({ errorMessage: message, successMessage: '' })
        }
      })
  },
  updateStation: () => {
    axios
      .patch(
        `http://localhost:3000/admin/station/${get().selectedStation.id}`,
        {
          name: get().selectedStation.name,
          city: get().selectedStation.city,
        }
      )
      .then((response) => {
        const updatedStation = response.data.payload
        const newStationList = get().station.map((Station) =>
          Station.id === updatedStation.id
            ? { ...Station, ...updatedStation }
            : Station
        )
        set({
          station: newStationList,
          selectedStation: updatedStation,
          errorMessage: '',
          successMessage: 'Station modifier avec succèss',
        })
      })
      .catch((error) => {
        if (error.response.status !== 500) {
          const message = error.response.data.payload
          set({ errorMessage: message, successMessage: '' })
        } else {
          set({ errorMessage: 'something wrong', successMessage: '' })
        }
      })
  },
  removeStation: (id) => {
    id = parseInt(id)
    axios
      .delete(`http://localhost:3000/admin/station`, {
        data: { id: parseInt(id) },
      })
      .then((response) => {
        const newStationList = get().station.filter(
          (Station) => Station.id !== id
        )
        set({
          station: newStationList,
          errorMessage: '',
          successMessage: response.data.payload,
        })
      })
      .catch((error) => {
        if (error.response.status !== 500) {
          const message = error.response.data.payload
          set({ errorMessage: message, successMessage: '' })
        }
      })
  },
  clearSBC: () => set({ stationsByCities: [] }),
  clearStations: () => set({ station: [] }),
}))

export default useStationStore
