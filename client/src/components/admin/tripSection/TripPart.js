import React from 'react'
const TripPart = ({
  startDate,
  endDate,
  price,
  seatCount,
  setTripData,
  startTime,
  endTime,
}) => {
  function changeTripDataState(e) {
    setTripData((trip) => {
      return { ...trip, [e.target.name]: e.target.value }
    })
  }
  return (
    <div>
      <div>
        <label>date de départ : </label>
        <input
          type="date"
          value={startDate}
          name="startDate"
          onChange={changeTripDataState}
        />
      </div>
      <div>
        <label>Heure de départ : </label>
        <input
          type="time"
          value={startTime}
          name="startTime"
          onChange={changeTripDataState}
        />
      </div>
      <div>
        <label>date d'arrivée</label>
        <input
          type="date"
          value={endDate}
          name="endDate"
          onChange={changeTripDataState}
        />
      </div>
      <div>
        <label>Heure d'arrivée : </label>
        <input
          type="time"
          value={endTime}
          name="endTime"
          onChange={changeTripDataState}
        />
      </div>
      <div>
        <label>Prix :</label>
        <input
          type="number"
          value={price}
          name="price"
          onChange={changeTripDataState}
        />
      </div>
      <div>
        <label>Nombre de place :</label>
        <input
          type="number"
          value={seatCount}
          name="seatCount"
          onChange={changeTripDataState}
        />
      </div>
    </div>
  )
}

export default TripPart
