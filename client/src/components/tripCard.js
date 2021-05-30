import React, { useEffect, useState } from 'react'
import StopOverList from './stopOverList'
import TripInfo from './tripInfo'
const TripCard = ({ trip, tripToShow }) => {
  const [showTrip, setShowTrip] = useState(true)

  useEffect(() => {
    if (parseInt(tripToShow.id) === trip.id) {
      setShowTrip((state) => !state)
    }
  }, [tripToShow])
  return (
    <div>
      {showTrip ? (
        <TripInfo trip={trip} />
      ) : (
        <StopOverList stopOvers={trip.StopOvers} />
      )}
    </div>
  )
}

export default TripCard
