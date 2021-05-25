import axios from 'axios'
import create from 'zustand'

const useCompanyStore = create((set, get) => ({
  companies: [],
  fetchCompanies: () => {
    axios.get(`http://localhost:3000/admin/company`).then((response) => {
      const payload = response.data.payload
      set({ companies: payload })
    })
  },
  clearCompanies: () => set({ companies: [] }),
}))

export default useCompanyStore
