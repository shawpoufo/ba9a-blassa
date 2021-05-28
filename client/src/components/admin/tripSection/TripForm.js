import React, { useEffect, useState } from 'react'
import shallow from 'zustand/shallow'
import { today } from '../../../helper/today'
import useStationStore from '../../../stores/StationStore'
import useTripStore from '../../../stores/TripStore'
import CompanyPart from './CompanyPart'
import StationPart from './StationPart'
import StopOverPart from './StopOverPart'
import TripPart from './TripPart'
import moment from 'moment'

const TripForm = () => {
  const [stationsByCities, fetchStationsByCities] = useStationStore(
    (state) => [state.stationsByCities, state.fetchStationsByCities],
    shallow
  )
  const [addFullTrip, errorMessage, successMessage] = useTripStore(
    (state) => [state.addFullTrip, state.errorMessage, state.successMessage],
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
    }
  }, [successMessage])
  //--------------
  return (
    <div>
      <CompanyPart selectedCompany={company} setCompany={setCompany} />
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
      <TripPart
        startDate={tripData.startDate}
        endDate={tripData.endDate}
        price={tripData.price}
        seatCount={tripData.seatCount}
        startTime={tripData.startTime}
        endTime={tripData.endTime}
        setTripData={setTripData}
      />
      <StopOverPart
        selectedStopOvers={selectedStopOvers}
        setSelectedStopOvers={setSelectedStopOvers}
        stationsByCities={stationsByCities}
      />
      <button onClick={addTrip}>Ajouter</button>
      <div> {errorMessage ? errorMessage : successMessage}</div>
    </div>
  )
}
export default TripForm
