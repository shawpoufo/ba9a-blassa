import React from 'react'
import useTripStore from '../stores/TripStore'
import shallow from 'zustand/shallow'

const TripList = () => {
  const [trips, errorMessage, count] = useTripStore(
    (state) => [state.trips, state.errorMessage, state.count],
    shallow
  )

  return !errorMessage ? (
    <div>
      <h2>nombre de voyages trouvée : {count}</h2>
      <h3>
        {trips.length} voyages sur {count} affiché
      </h3>
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
