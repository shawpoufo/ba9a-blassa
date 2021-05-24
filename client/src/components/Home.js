import React, { useEffect, useState } from 'react'
import SelectStation from './SelectStation'
import { Link, useHistory, useLocation } from 'react-router-dom'
import useStationStore from '../stores/StationStore'
import shallow from 'zustand/shallow'
const Home = () => {
  const history = useHistory()
  const [fetchStationsByCities, searchObject, addParam, clearSBC] =
    useStationStore(
      (state) => [
        state.fetchStationsByCities,
        state.searchObject,
        state.addParam,
        state.clearSBC,
      ],
      shallow
    )

  function goToTripLlist() {
    let params = '?'
    Object.entries(searchObject).forEach((prop) => {
      params = params.concat(`${prop[0]}=${prop[1]}&`)
    })
    params = params.slice(0, -1)
    history.push(`/trips${params}`)
  }
  useEffect(() => {
    fetchStationsByCities()
    return () => clearSBC()
  }, [])
  return (
    <div>
      <h1>Achetez vos tickets d'autocar au meilleur prix!</h1>
      <label>ville / station départ</label>
      <SelectStation name="startCity" />
      <label>ville / station d'arrivée</label>
      <SelectStation name="endCity" />
      <label>date de départ</label>
      <input
        type="date"
        onChange={(e) => addParam({ startDate: e.target.value })}></input>
      <button onClick={() => goToTripLlist()}>Recherche</button>
    </div>
  )
}
export default Home
