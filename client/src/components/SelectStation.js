import React, { useEffect, useRef, useState } from 'react'
import useStationStore from '../stores/StationStore'
import shallow from 'zustand/shallow'
import { useLocation } from 'react-router'
import useTripStore from '../stores/TripStore'
const SelectStation = ({ name }) => {
  const location = useLocation()
  const [selectedValue, setSelectedValue] = useState({ id: -1, city: '' })
  const [stationsByCities] = useStationStore(
    (state) => [state.stationsByCities],
    shallow
  )
  const [addParam, searchObject] = useTripStore(
    (state) => [state.addParam, state.searchObject],
    shallow
  )
  const [station, setStation] = useState('')

  return (
    <select
      name={name}
      value={selectedValue}
      onChange={(e) => {
        const selectedStation = e.target.value
        const sindex = e.target.options.selectedIndex
        const selectedCity = e.target[sindex].getAttribute('data-city')
        const selectName = e.target.name
        const rmStId = selectedCity === selectedStation
        const paramStation = rmStId
          ? { [selectName]: undefined }
          : { [selectName]: selectedStation }
        // if (location.pathname === '/') {
        //   addParamHome(paramStation)
        //   addParamHome({
        //     [selectName === 'startStation' ? 'startCity' : 'endCity']:
        //       selectedCity,
        //   })
        // }

        addParam(paramStation)
        addParam({
          [selectName === 'startStation'
            ? 'startCity'
            : 'endCity']: `${selectedCity}`,
        })

        setStation(selectedStation)
      }}
      value={station}>
      <option value="-1"> choisissez une ville ou une station </option>
      {stationsByCities.map((sbc) => {
        return (
          <optgroup key={sbc.city.name} label={sbc.city.name}>
            {/* city ne comparte pas value car ce n'est pas une station */}
            <option data-city={sbc.city.name}>{sbc.city.name}</option>
            {sbc.city.stations.map((station) => {
              return (
                <option
                  key={station.id}
                  value={station.id}
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
