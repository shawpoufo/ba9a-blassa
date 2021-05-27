import React, { useEffect, useState } from 'react'
import shallow from 'zustand/shallow'
import { today } from '../../../helper/today'
import useStationStore from '../../../stores/StationStore'
import useTripStore from '../../../stores/TripStore'
import CompanyPart from './CompanyPart'
import StationPart from './StationPart'
import StopOverPart from './StopOverPart'
import TripPart from './TripPart'

const TripForm = () => {
  const [stationsByCities, fetchStationsByCities] = useStationStore(
    (state) => [state.stationsByCities, state.fetchStationsByCities],
    shallow
  )
  const [addFullTrip, errorMessage, successMesage] = useTripStore(
    (state) => [state.addFullTrip, state.errorMessage, state.successMessage],
    shallow
  )
  const [company, setCompany] = useState({ id: null, name: '' })
  const [tripData, setTripData] = useState({
    startDate: today(),
    endDate: today(),
    price: 0,
    seatCount: 0,
    startTime: '',
    endTime: '',
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
  useEffect(() => {
    fetchStationsByCities()
    // CLEAR if nedeed
  }, [])
  //---------------Functions
  function addTrip() {
    console.info(company, tripData, startStation, endStation, selectedStopOvers)
    // addFullTrip(company, tripData, startStation, endStation, selectedStopOvers)
  }
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
      <div> {errorMessage ? errorMessage : successMesage}</div>
    </div>
  )
}
export default TripForm
