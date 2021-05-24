import React, { useEffect } from 'react'
import useTripStore from '../stores/TripStore'
import shallow from 'zustand/shallow'
import TripSearch from './TripSearch'
import TripList from './TripList'
import TripPagination from './TripPagination'
import { useLocation } from 'react-router'
const TripsSerction = () => {
  const [fetchTrips, clearTrips] = useTripStore(
    (state) => [state.fetchTrips, state.clearTrips],
    shallow
  )
  const location = useLocation()
  useEffect(() => {
    fetchTrips(location.search)
    return () => clearTrips()
  })
  return (
    <div>
      <TripSearch />
      <TripList />
      <TripPagination />
    </div>
  )
}
export default TripsSerction
