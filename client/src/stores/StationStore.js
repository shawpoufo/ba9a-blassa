import axios from 'axios'
import create from 'zustand'

const useStationStore = create((set, get) => ({
  station: [],
  searchObject: {},
  stationsByCities: [],
  addParam: (param) => {
    set((state) => ({
      searchObject: { ...state.searchObject, ...param },
    }))
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
  clearSBC: () => set({ stationsByCities: [] }),
}))

export default useStationStore
