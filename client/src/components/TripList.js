import React from 'react'
import useTripStore from '../stores/TripStore'
import shallow from 'zustand/shallow'

const TripList = () => {
  const [trips, errorMessage] = useTripStore(
    (state) => [
      state.fetchTrips,
      state.trips,
      state.errorMessage,
      state.clearTrips,
    ],
    shallow
  )

  return !errorMessage ? (
    <div>
      <h2>number of trips : {trips.length}</h2>
      {trips.map((trip) => {
        return (
          <ul key={trip.id}>
            <li>{trip.Start.city}</li>
            <li>{trip.End.city}</li>
            <li>{trip.price}</li>
            <li>{trip.startDate}</li>
            <li>{trip.price}</li>
            <li>{trip.Company.name}</li>
          </ul>
        )
      })}
    </div>
  ) : (
    <div>{errorMessage}</div>
  )
}
export default TripList
