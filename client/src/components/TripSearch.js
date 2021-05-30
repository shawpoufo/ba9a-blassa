import React, { useEffect, useState } from 'react'
import useCompanyStore from '../stores/CompanyStore'
import shallow from 'zustand/shallow'
import useTripStore from '../stores/TripStore'
import SelectStation from './SelectStation'
import useStationStore from '../stores/StationStore'
import moment from 'moment-timezone'

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
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    companies: 0,
    lowerPrice: 0,
    higherPrice: 900,
  })

  useEffect(() => console.log(searchObject))

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
    <div className="container bg-dark overflow-hidden rounded-3 shadow-lg">
      <div className="row mx-3 my-3">
        <div className="col">
          <div className="row row-cols-1 gy-3">
            <div className="col list-group">
              <label className="text-white form-label">
                ville / station départ
              </label>
              <SelectStation name="startStation" />
            </div>
            <div className="col list-group">
              <label className="text-white form-label">date de départ</label>
              <input
                className="form-control"
                type="date"
                name="startDate"
                value={startDate}
                onChange={regenerateSearchObject}></input>
            </div>

            <div className="col list-group">
              <label className="text-white form-label">
                Prix minimum : {lowerPrice}
              </label>
              <input
                className="form-range"
                type="range"
                name="lowerPrice"
                min={0}
                max={1000}
                step={1}
                value={lowerPrice}
                onChange={regenerateSearchObject}
              />
            </div>
          </div>
        </div>

        <div className="col ms-3">
          <div className="row row-cols-1 gy-3">
            <div className="col list-group">
              <label className="text-white form-label">
                ville / station d'arrivée
              </label>
              <SelectStation name="endStation" />
            </div>
            <div className="col list-group">
              <label className="text-white form-label">date d'arrivée</label>
              <input
                className="form-control"
                type="date"
                name="endDate"
                value={endDate}
                onChange={regenerateSearchObject}></input>
            </div>

            <div className="col list-group">
              <label className="text-white form-label">
                Prix maximum : {higherPrice}
              </label>
              <input
                className="form-range"
                type="range"
                name="higherPrice"
                min={0}
                max={1000}
                step={1}
                value={higherPrice}
                onChange={regenerateSearchObject}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <select
          className="form-select"
          name="companies"
          value={companies}
          onChange={regenerateSearchObject}>
          <option value="-1">Choisissez un société</option>
          {companiesF.map((cmp) => (
            <option key={cmp.id} value={cmp.id}>
              {cmp.name}
            </option>
          ))}
        </select>
      </div>
      <div className="row justify-content-center">
        <div className="col-auto ">
          <button
            className="btn btn-primary my-3"
            onClick={() => {
              search()
            }}>
            Recherche
          </button>
        </div>
      </div>
    </div>
  )
}

export default TripSearch
