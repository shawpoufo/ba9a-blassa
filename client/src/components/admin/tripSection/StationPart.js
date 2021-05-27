import React, { useEffect } from 'react'
import _uniqueId from 'lodash/uniqueId'
const StationPart = ({ cmpName, station, setStation, stations }) => {
  function changeStationState(e) {
    const searchedStation =
      e.target.name === `name`
        ? stations.find(
            (s) => s.name.toLowerCase() === e.target.value.toLowerCase()
          )
        : null
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
  }, [station.city])
  return (
    <div>
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
        {stations.map((sta, index) => (
          <option key={`${cmpName}-${index}-${sta.city}`} value={sta.city} />
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
        {stations.map((sta, index) =>
          sta.city === station.city ? (
            <option key={`${cmpName}-${index}-${sta.city}`} value={sta.name} />
          ) : null
        )}
      </datalist>
    </div>
  )
}

export default StationPart
