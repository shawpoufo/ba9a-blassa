import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import shallow from 'zustand/shallow'
import useCompanyStore from '../../../stores/CompanyStore'
import StopOverListCMP from './StopOverListCMP'
import TripInfo from '../../tripInfo'
const CompanyList = () => {
  const [selectedCompany, errorMessage, successMessage, fetchCompanyById] =
    useCompanyStore(
      (state) => [
        state.selectedCompany,
        state.errorMessage,
        state.successMessage,
        state.fetchCompanyById,
      ],
      shallow
    )
  useEffect(() => {
    useCompanyStore.setState({ errorMessage: '', successMessage: '' })
  }, [selectedCompany])
  return (
    <div className="container">
      {selectedCompany?.Trips.map((trip) => {
        return (
          <div key={trip.id} className="row row-cols-1 row-cols-sm-2">
            <div className="card col">
              <div className="card-header">Voyage : {trip.id}</div>
              <TripInfo trip={trip} />
              <div className="card-footer">
                <label className="btn">
                  Totale de gain :{' '}
                  <span className="badge bg-dark">
                    {trip.price * trip.bookingsCount} MAD
                  </span>
                </label>
              </div>
            </div>
            <div className="card col">
              <div className="card-header">Escales</div>
              <StopOverListCMP stopOvers={trip.StopOvers} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default CompanyList
