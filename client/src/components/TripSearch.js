import React, { useEffect, useState } from 'react'
import useCompanyStore from '../stores/CompanyStore'
import shallow from 'zustand/shallow'
import useTripStore from '../stores/TripStore'
import SelectStation from './SelectStation'
const TripSearch = () => {
  const [fetchCompanies, companies, clearCompanies] = useCompanyStore(
    (state) => [state.fetchCompanies, state.companies, state.clearCompanies],
    shallow
  )
  const [searchQuery, setSearchQuery, addParam] = useTripStore(
    (state) => [state.searchQuery, state.setSearchQuery, state.addParam],
    shallow
  )
  const [{ startDate, endDate, company, lowerPrice, higherPrice }, setSearch] =
    useState({})

  function regenerateSearchObject(e) {
    let param = {}
    switch (e.target.name) {
      case 'startDate':
        param = { startDate: e.target.value }

        break
      case 'endDate':
        param = { endDate: e.target.value }
        break
      case 'company':
        param = { company: e.target.value }
        break
      case 'lowerPrice':
        param = { lowerPrice: e.target.value }
        break
      case 'higherPrice':
        param = { higherPrice: e.target.value }
      default:
        param = {}
        break
    }
    addParam(param)
    setSearch((search) => ({ ...search, ...param }))
  }
  useEffect(() => {
    fetchCompanies()
    return () => {
      clearCompanies()
    }
  })
  return (
    <div>
      <label>ville / station départ</label>
      <SelectStation name="startCity" />
      <label>ville / station d'arrivée</label>
      <SelectStation name="endCity" />
      <label>date de départ</label>
      <input
        type="date"
        name="startDate"
        name={startDate}
        onChange={regenerateSearchObject}></input>
      <input
        type="date"
        name="endDate"
        value={endDate}
        onChange={regenerateSearchObject}></input>
      <select name="company" value={company} onChange={regenerateSearchObject}>
        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
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

      <button onClick={() => console.log('boooom : ', searchQuery)}>
        Recherche
      </button>
      {/* 
    state, */}
    </div>
  )
}

export default TripSearch
