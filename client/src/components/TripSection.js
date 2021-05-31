import React, { useEffect } from 'react'
import useTripStore from '../stores/TripStore'
import shallow from 'zustand/shallow'
import TripSearch from './TripSearch'
import TripList from './TripList'
import TripPagination from './TripPagination'
import { useLocation } from 'react-router'
const TripsSerction = () => {
  const [setSearchQuery, clearTrips, resetSearch, fetchTrips] = useTripStore(
    (state) => [
      state.setSearchQuery,
      state.clearTrips,
      state.resetSearch,
      state.fetchTrips,
    ],
    shallow
  )
  const location = useLocation()
  useEffect(() => {
    setSearchQuery()
    fetchTrips()
    return () => {
      clearTrips()
      resetSearch()
    }
  }, [])
  return (
    <div>
      <h1 className="text-center">
        Achetez vos tickets d'autocar au meilleur prix!
      </h1>
      <h5 className="h5 text-center">
        chez{' '}
        <span className="badge rounded-pill bg-info text-dark me-3">
          BA9ABLASSA
        </span>
        🚏🚌 🚌
      </h5>
      <TripSearch />
      <TripList />
      <TripPagination />
    </div>
  )
}
export default TripsSerction
