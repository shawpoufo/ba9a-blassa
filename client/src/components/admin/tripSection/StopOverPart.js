import React, { useEffect, useState } from 'react'
import shallow from 'zustand/shallow'
import useStationStore from '../../../stores/StationStore'
import { today } from '../../../helper/today'
//----private function

//------component
const StopOverPart = ({
  stationsByCities,
  selectedStopOvers,
  setSelectedStopOvers,
}) => {
  const [stopOver, setStopOver] = useState({
    id: null,
    name: '',
    city: '',
    stopDate: today(),
    stopTime: '',
  })
  const [stations, setStations] = useState([])

  useEffect(() => {
    setStopOver((s) => {
      return { ...s, name: '', id: null }
    })
  }, [stopOver.city])

  function changeStopOver(e) {
    const searchedStation =
      e.target.name === 'name'
        ? stations.find(
            (s) => s.name.toLowerCase() === e.target.value.toLowerCase()
          )
        : null
    setStopOver((s) => {
      return {
        ...s,
        [e.target.name]: e.target.value,
        id: searchedStation ? searchedStation.id : s.id,
      }
    })
  }
  function addStopOver() {
    setSelectedStopOvers((list) => [
      ...list,
      { ...stopOver, startDate: `${stopOver.stopDate} ${stopOver.stopTime}` },
    ])
  }
  function getStation() {
    const extractedStations = []
    for (let res of stationsByCities) {
      for (let station of res.city.stations) {
        if (stopOver.city === res.city.name) extractedStations.push(station)
      }
    }
    setStations(extractedStations)
  }
  useEffect(() => {
    getStation()
  }, [stopOver.city])

  return (
    <div>
      <div>
        <label>ville :</label>
        <input
          value={stopOver.city}
          onChange={changeStopOver}
          name="city"
          list="citylist"
        />
        <datalist id="citylist">
          {stationsByCities.map((res) => (
            <option key={res.city.name} value={res.city.name} />
          ))}
        </datalist>
        <label>station :</label>
        <input
          value={stopOver.name}
          onChange={changeStopOver}
          name="name"
          list="stationlist"
          disabled={stopOver.city ? false : true}
        />
        <datalist id="stationlist">
          {stations.map((station) => (
            <option key={station.name} value={station.name} />
          ))}
        </datalist>
        <label>Date de l'escale</label>
        <input
          type="date"
          value={stopOver.stopDate}
          onChange={changeStopOver}
          name="stopDate"
        />

        <label>heure de l'escale</label>
        <input
          type="time"
          value={stopOver.stopTime}
          onChange={changeStopOver}
          name="stopTime"
        />

        <button onClick={addStopOver}>Ajouter</button>
      </div>
      <div>
        {selectedStopOvers.map((sStopOver, index) => (
          <div key={index}>
            <label>{sStopOver.city}</label> ; <label>{sStopOver.name}</label> ;
            <label>{sStopOver.stopDate}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StopOverPart
