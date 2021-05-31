import React, { useEffect, useState } from 'react'
import shallow from 'zustand/shallow'
import useStationStore from '../../../stores/StationStore'
import moment from 'moment'
import { MdCancel } from 'react-icons/md'
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
    stopDate: moment().format('YYYY-MM-DD'),
    stopTime: moment().format('HH:mm'),
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
    setStopOver({
      id: null,
      name: '',
      city: '',
      stopDate: moment().format('YYYY-MM-DD'),
      stopTime: moment().format('HH:mm'),
    })
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
  function removeFromStopOvers(e) {
    const index = e.target.getAttribute('data-so')
    const newArrSo = selectedStopOvers.filter((s, i) => i !== parseInt(index))
    setSelectedStopOvers(newArrSo)
  }
  useEffect(() => {
    getStation()
  }, [stopOver.city])

  return (
    <div className="row row-cols-1  row-cols-sm-2">
      <div className="col">
        <div className="row row-cols-2 g-2">
          <label className="col">ville :</label>
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
        </div>
        <button className="btn btn-dark" onClick={addStopOver}>
          Ajouter
        </button>
      </div>
      <div className="col">
        {selectedStopOvers.map((sStopOver, index) => (
          <div key={index} className="row">
            <button
              data-so={index}
              type="button"
              className="btn btn-outline-danger mt-2"
              onClick={removeFromStopOvers}>
              <MdCancel />
              <span className="badge bg-secondary mx-1">{sStopOver.city}</span>
              <span className="badge bg-secondary mx-1">{sStopOver.name}</span>
              <span className="badge bg-secondary mx-1">
                {sStopOver.stopDate}
              </span>
              <span className="badge bg-secondary mx-1">
                {sStopOver.stopTime}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StopOverPart
