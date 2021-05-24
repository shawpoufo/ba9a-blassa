import React, { useEffect, useState } from 'react'
import useStationStore from '../stores/StationStore'
import shallow from 'zustand/shallow'
import { useLocation } from 'react-router'
const SelectStation = ({ name }) => {
  const location = useLocation()

  const [addParam1, searchObject2] = useStationStore(
    (state) => [state.addParam, state.searchObject],
    shallow
  )
  const stationsByCities = useStationStore((state) => state.stationsByCities)
  const [station, setStation] = useState('')

  return (
    <select
      name={name}
      onChange={(e) => {
        console.log('state station : ', station)
        const selectedStation = e.target.value
        const sindex = e.target.options.selectedIndex
        const selectedCity = e.target[sindex].getAttribute('data-city')

        e.target.name === 'startCity'
          ? addParam1({ startCity: selectedCity })
          : addParam1({ endCity: selectedCity })
        setStation(selectedStation)
      }}
      value={station}>
      {console.log(searchObject2)}
      {stationsByCities.map((sbc) => {
        return (
          <optgroup key={sbc.city.name} label={sbc.city.name}>
            <option value={sbc.city.name} data-city={sbc.city.name}>
              {sbc.city.name}
            </option>
            {sbc.city.stations.map((station) => {
              return (
                <option
                  key={station.id}
                  value={station.name}
                  data-city={sbc.city.name}>
                  {station.name}
                </option>
              )
            })}
          </optgroup>
        )
      })}
    </select>
  )
}
export default SelectStation
