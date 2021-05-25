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
      <TripSearch />
      <TripList />
      <TripPagination />
    </div>
  )
}
export default TripsSerction
