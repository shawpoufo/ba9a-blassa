import React, { useEffect, useState } from 'react'
import _uniqueId from 'lodash/uniqueId'
const StationPart = ({ cmpName, station, setStation, stationsByCities }) => {
  const [stations, setStations] = useState([])

  function getStation() {
    const extractedStations = []
    for (let res of stationsByCities) {
      for (let eStation of res.city.stations) {
        if (station.city === res.city.name) extractedStations.push(eStation)
      }
    }
    console.log('ex : ', extractedStations, 'sbc :', stationsByCities)
    setStations(extractedStations)
  }

  function changeStationState(e) {
    const searchedStation =
      e.target.name === `name`
        ? stations.find(
            (s) => s.name.toLowerCase() === e.target.value.toLowerCase()
          )
        : null
    console.log(searchedStation?.id)
    setStation((s) => {
      return {
        ...s,
        [e.target.name]: e.target.value,
        id: searchedStation ? searchedStation.id : s.id,
      }
    })
  }
  useEffect(() => {
    setStation((s) => {
      return { ...s, name: '', id: null }
    })
    getStation()
  }, [station.city])
  return (
    <div>
      {console.log(stations.length)}
      <label>
        {cmpName === 'startStation' ? 'ville de départ' : "ville d'arrivée"}{' '}
      </label>
      <input
        value={station.city}
        onChange={changeStationState}
        name={'city'}
        list={`${cmpName}citylist`}
      />
      <datalist id={`${cmpName}citylist`}>
        {stationsByCities.map((res, index) => (
          <option
            key={`${cmpName}-${index}-${res.city.name}`}
            value={res.city.name}
          />
        ))}
      </datalist>
      <label>
        {cmpName === 'startStation'
          ? "Station de d'épart"
          : "Station d'arrivée"}
      </label>
      <input
        value={station.name}
        onChange={changeStationState}
        list={`${cmpName}stationlist`}
        name={'name'}
        disabled={station.city ? false : true}
      />
      <datalist id={`${cmpName}stationlist`}>
        {stations.map((sta, index) => (
          <option key={`${cmpName}-${index}-${sta.city}`} value={sta.name} />
        ))}
      </datalist>
    </div>
  )
}

export default StationPart
