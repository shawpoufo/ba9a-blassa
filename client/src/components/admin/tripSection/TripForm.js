import React, { useEffect, useState } from 'react'
import shallow from 'zustand/shallow'
import useStationStore from '../../../stores/StationStore'
import useTripStore from '../../../stores/TripStore'
import CompanyPart from './CompanyPart'
import StationPart from './StationPart'
import StopOverPart from './StopOverPart'
import TripPart from './TripPart'
import moment from 'moment'
import useCompanyStore from '../../../stores/CompanyStore'

const TripForm = () => {
  const [stationsByCities, fetchStationsByCities] = useStationStore(
    (state) => [state.stationsByCities, state.fetchStationsByCities],
    shallow
  )
  const [addFullTrip, errorMessage, successMessage] = useTripStore(
    (state) => [state.addFullTrip, state.errorMessage, state.successMessage],
    shallow
  )
  const [companies, fetchCompanies] = useCompanyStore(
    (state) => [state.companies, state.fetchCompanies],
    shallow
  )
  const [company, setCompany] = useState({ id: null, name: '' })
  const [tripData, setTripData] = useState({
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    price: 0,
    seatCount: 0,
    startTime: moment().format('HH:mm'),
    endTime: moment().format('HH:mm'),
  })
  const [selectedStopOvers, setSelectedStopOvers] = useState([])
  const [startStation, setStartStation] = useState({
    id: null,
    name: '',
    city: '',
  })
  const [endStation, setEndStation] = useState({
    id: null,
    name: '',
    city: '',
  })

  function clearState() {
    setCompany({ id: null, name: '' })
    setTripData({
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
      price: 0,
      seatCount: 0,
      startTime: moment().format('HH:mm'),
      endTime: moment().format('HH:mm'),
    })
    setStartStation({
      id: null,
      name: '',
      city: '',
    })
    setEndStation({
      id: null,
      name: '',
      city: '',
    })
    setSelectedStopOvers([])
  }
  useEffect(() => {
    fetchStationsByCities()
    fetchCompanies()
    return () => {
      useTripStore.setState({ successMessage: '', errorMessage: '' })
    }
  }, [])
  //---------------Functions
  function addTrip() {
    addFullTrip(company, tripData, startStation, endStation, selectedStopOvers)
  }
  //---if the add tripp succed
  useEffect(() => {
    if (successMessage) {
      clearState()
      fetchStationsByCities()
      fetchCompanies()
    }
  }, [successMessage])
  //--------------
  return (
    <div className="container mb-5 pb-3">
      <CompanyPart
        companies={companies}
        selectedCompany={company}
        setCompany={setCompany}
      />
      <hr />
      <StationPart
        cmpName="startStation"
        station={startStation}
        setStation={setStartStation}
        stationsByCities={stationsByCities}
      />
      <StationPart
        cmpName="endStation"
        station={endStation}
        setStation={setEndStation}
        stationsByCities={stationsByCities}
      />
      <hr />

      <TripPart
        startDate={tripData.startDate}
        endDate={tripData.endDate}
        price={tripData.price}
        seatCount={tripData.seatCount}
        startTime={tripData.startTime}
        endTime={tripData.endTime}
        setTripData={setTripData}
      />
      <hr />

      <StopOverPart
        selectedStopOvers={selectedStopOvers}
        setSelectedStopOvers={setSelectedStopOvers}
        stationsByCities={stationsByCities}
      />
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <button
            className="text-align-center text-darker btn btn-outline-warning px-5 ms-5 mt-3"
            onClick={addTrip}>
            valider
          </button>
        </div>
        <div className="col"></div>
      </div>

      <h4 className={`${errorMessage ? 'text-danger' : 'text-success'} row`}>
        {' '}
        {errorMessage ? errorMessage : successMessage}
      </h4>
    </div>
  )
}
export default TripForm
