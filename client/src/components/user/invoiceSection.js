import React, { useEffect, useState } from 'react'
import useInvoiceStore from '../../stores/invoiceStore'
import shallow from 'zustand/shallow'
import moment from 'moment-timezone'

const InvoiceSection = () => {
  const [fetchInvoices, invoices] = useInvoiceStore(
    (state) => [state.fetchInvoices, state.invoices],
    shallow
  )
  const [reRender, setReRender] = useState(true)
  useEffect(() => {
    fetchInvoices()
    return () => {
      useInvoiceStore.setState({ invoices: [] })
    }
  }, [])

  function getBookings(invoice) {
    return (
      <tr className="table-light" key={`${invoice.id}-`}>
        <td>Numéros de place</td>
        <td colSpan="5">
          {invoice.bookings.map((b) => {
            return (
              <span
                key={`${invoice.id}-${b.seatNumber}`}
                className="badge bg-warning text-dark ms-2">
                {b.seatNumber}
              </span>
            )
          })}
        </td>
      </tr>
    )
  }
  function renderInvoiceData(invoice) {
    return (
      <tr key={invoice.id}>
        <td>{invoice.id}</td>
        <td>{moment(invoice.date).format('DD-MM-YYYY HH:mm')}</td>
        <td>{invoice.total}</td>
        <td>{invoice.company.name}</td>
        <td>{invoice.start.city}</td>
        <td>{invoice.end.city}</td>
      </tr>
    )
  }
  function renderInvoices() {
    return (
      <tbody>
        {invoices.map((i, index) => {
          return [renderInvoiceData(i), getBookings(i)]
        })}
      </tbody>
    )
  }
  return (
    <table className="table table-dark table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">date</th>
          <th scope="col">totale</th>
          <th scope="col">company</th>
          <th scope="col">départ</th>
          <th scope="col">arrivée</th>
        </tr>
      </thead>
      {renderInvoices()}
    </table>
  )
}

export default InvoiceSection
