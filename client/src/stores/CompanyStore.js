import axios from 'axios'
import create from 'zustand'

const useCompanyStore = create((set, get) => ({
  companies: [],
  selectedCompany: { id: 0, name: '' },
  errorMessage: '',
  successMessage: '',
  fetchCompanies: () => {
    axios.get(`http://localhost:3000/admin/company`).then((response) => {
      const payload = response.data.payload
      set({ companies: payload })
    })
  },
  fetchCompanyById: (id) => {
    axios
      .get(`http://localhost:3000/admin/company/${get().selectedCompany.id}`)
      .then((response) => {
        const payload = response.data.payload
        set({
          selectedCompany: { id: payload.id, name: payload.name },
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
  createCompany: () => {
    axios
      .post(`http://localhost:3000/admin/company`, {
        name: get().selectedCompany.name,
      })
      .then((response) => {
        const newCompany = response.data.payload
        set({
          companies: [...get().companies, newCompany],
          errorMessage: '',
          successMessage: 'company ajouter avec succèss!',
          selectedCompany: { id: 0, name: '' },
        })
      })
      .catch((error) => {
        if (error.response.status !== 500) {
          const message = error.response.data.payload

          set({ errorMessage: message, successMessage: '' })
        }
      })
  },
  updateCompany: () => {
    axios
      .put(`http://localhost:3000/admin/company/${get().selectedCompany.id}`, {
        name: get().selectedCompany.name,
      })
      .then((response) => {
        const updatedCompany = response.data.payload
        const newCompanyList = get().companies.map((company) =>
          company.id === updatedCompany.id
            ? { ...company, ...updatedCompany }
            : company
        )
        set({
          companies: newCompanyList,
          selectedCompany: updatedCompany,
          errorMessage: '',
          successMessage: 'company modifier avec succèss',
        })
      })
      .catch((error) => {
        if (error.response.status !== 500) {
          const message = error.response.data.payload
          set({ errorMessage: message, successMessage: '' })
        }
      })
  },
  removeCompany: (id) => {
    id = parseInt(id)
    axios
      .delete(`http://localhost:3000/admin/company`, {
        data: { id: parseInt(id) },
      })
      .then((response) => {
        const newCompanyList = get().companies.filter(
          (company) => company.id !== id
        )
        set({
          companies: newCompanyList,
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
  clearCompanies: () => set({ companies: [] }),
}))

export default useCompanyStore
