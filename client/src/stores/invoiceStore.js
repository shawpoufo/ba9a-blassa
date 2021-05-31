import create from 'zustand'
import axios from 'axios'
import useAuthStore from './authStore'
const useInvoiceStore = create((set, get) => ({
  invoices: [],
  fetchInvoices: () => {
    axios
      .get('http://localhost:3000/user/invoice', {
        headers: { Authorization: `Bearer ${useAuthStore.getState().token}` },
      })
      .then((response) => {
        const invoices = response.data.payload
        set({ invoices: invoices })
      })
  },
}))

export default useInvoiceStore
