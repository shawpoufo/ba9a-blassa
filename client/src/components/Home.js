import React, { useEffect, useState } from 'react'
import SelectStation from './SelectStation'
import { Link, useHistory, useLocation } from 'react-router-dom'
import useStationStore from '../stores/StationStore'
import shallow from 'zustand/shallow'
import useTripStore from '../stores/TripStore'
import moment from 'moment-timezone'
const Home = () => {
  const history = useHistory()
  const [fetchStationsByCities, clearSBC] = useStationStore(
    (state) => [state.fetchStationsByCities, state.clearSBC],
    shallow
  )
  const addParam = useTripStore((state) => state.addParam)

  function goToTripLlist() {
    // let params = []
    // Object.entries(searchObject).forEach((prop) => {
    //   if (prop[1]) params.push({prop})
    //   // if (prop[1]) params = params.concat(`${prop[0]}=${prop[1]}&`)
    // })
    // // params = params.slice(0, -1)
    history.push(`/trips`)
  }
  useEffect(() => {
    fetchStationsByCities()
    return () => clearSBC()
  }, [])
  return (
    <div>
      <h1>Achetez vos tickets d'autocar au meilleur prix!</h1>
      <label>ville / station départ</label>
      <SelectStation name="startStation" />
      <label>ville / station d'arrivée</label>
      <SelectStation name="endStation" />
      <label>date de départ</label>
      <input
        type="date"
        value={moment().format('YYYY-MM-DD')}
        onChange={(e) => addParam({ startDate: e.target.value })}></input>
      <button onClick={() => goToTripLlist()}>Recherche</button>
    </div>
  )
}
export default Home
