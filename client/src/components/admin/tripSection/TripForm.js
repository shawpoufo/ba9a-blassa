import React, { useEffect, useState } from 'react'
import shallow from 'zustand/shallow'
import useStationStore from '../../../stores/StationStore'
import CompanyPart from './CompanyPart'
import StationPart from './StationPart'
import StopOverPart from './StopOverPart'
import TripPart from './TripPart'

const TripForm = () => {
  const [station, fectchStations] = useStationStore(
    (state) => [state.station, state.fetchStations],
    shallow
  )

  const [company, setCompany] = useState({ id: null, name: '' })
  const [tripData, setTripData] = useState({
    startDate: '',
    endDate: '',
    price: 0,
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
  useEffect(() => console.log({ tripData, company }), [tripData, company])
  useEffect(() => console.info(selectedStopOvers), [selectedStopOvers])
  useEffect(() => {
    fectchStations()
  }, [])
  return (
    <div>
      <CompanyPart selectedCompany={company} setCompany={setCompany} />
      <StationPart
        cmpName="startStation"
        station={startStation}
        setStation={setStartStation}
        stations={station}
      />
      <StationPart
        cmpName="endStation"
        station={endStation}
        setStation={setEndStation}
        stations={station}
      />
      <TripPart
        startDate={tripData.startDate}
        endDate={tripData.endDate}
        price={tripData.price}
        setTripData={setTripData}
      />
      <StopOverPart
        selectedStopOvers={selectedStopOvers}
        setSelectedStopOvers={setSelectedStopOvers}
        stations={station}
      />
      <button>Ajouter</button>
    </div>
  )
}
export default TripForm
