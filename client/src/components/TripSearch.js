import React, { useEffect, useState } from 'react'
import useCompanyStore from '../stores/CompanyStore'
import shallow from 'zustand/shallow'
import useTripStore from '../stores/TripStore'
import SelectStation from './SelectStation'
import useStationStore from '../stores/StationStore'

const TripSearch = () => {
  const [fetchCompanies, companiesF, clearCompanies] = useCompanyStore(
    (state) => [state.fetchCompanies, state.companies, state.clearCompanies],
    shallow
  )
  const [
    searchQuery,
    setSearchQuery,
    addParam,
    searchObject,
    resetOffset,
    fetchTrips,
  ] = useTripStore(
    (state) => [
      state.searchQuery,
      state.setSearchQuery,
      state.addParam,
      state.searchObject,
      state.resetOffset,
      state.fetchTrips,
    ],
    shallow
  )
  const [fetchStationsByCities, clearSBC] = useStationStore((state) => [
    state.fetchStationsByCities,
    state.clearSBC,
  ])
  const [
    { startDate, endDate, companies, lowerPrice, higherPrice },
    setSearch,
  ] = useState({
    startDate: new Date(),
    endDate: new Date(),
    companies: 0,
    lowerPrice: 0,
    higherPrice: 900,
  })

  function regenerateSearchObject(e) {
    let param = {}
    switch (e.target.name) {
      case 'startDate':
        param = { startDate: e.target.value }
        break
      case 'endDate':
        param = { endDate: e.target.value }
        break
      case 'companies':
        param = { companies: e.target.value }
        break
      case 'lowerPrice':
        param = { lowerPrice: e.target.value }
        break
      case 'higherPrice':
        param = { higherPrice: e.target.value }
        break
      default:
        param = {}
        break
    }

    setSearch((search) => {
      return { ...search, ...param }
    })
    addParam(param)
  }
  function search() {
    resetOffset()
    addParam({ offset: null })
    setSearchQuery()
    fetchTrips()
  }
  useEffect(() => {
    fetchCompanies()
    fetchStationsByCities()
    return () => {
      clearCompanies()
      clearSBC()
    }
  }, [])

  return (
    <div>
      <label>ville / station départ</label>
      <SelectStation name="startStation" />
      <label>ville / station d'arrivée</label>
      <SelectStation name="endStation" />
      <label>date de départ</label>
      <input
        type="date"
        name="startDate"
        value={startDate}
        onChange={regenerateSearchObject}></input>
      <label>date d'arrivée</label>
      <input
        type="date"
        name="endDate"
        value={endDate}
        onChange={regenerateSearchObject}></input>
      <select
        name="companies"
        value={companies}
        onChange={regenerateSearchObject}>
        {companiesF.map((cmp) => (
          <option key={cmp.id} value={cmp.id}>
            {cmp.name}
          </option>
        ))}
      </select>
      <label>Prix minimum</label>
      <input
        type="range"
        name="lowerPrice"
        min={0}
        max={1000}
        step={1}
        value={lowerPrice}
        onChange={regenerateSearchObject}
      />
      <label>Prix maximum</label>
      <input
        type="range"
        name="higherPrice"
        min={0}
        max={1000}
        step={1}
        value={higherPrice}
        onChange={regenerateSearchObject}
      />

      <button
        onClick={() => {
          search()
        }}>
        Recherche
      </button>
    </div>
  )
}

export default TripSearch
