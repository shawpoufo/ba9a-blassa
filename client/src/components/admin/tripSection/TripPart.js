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
    <div className="row row-cols-2 row-cols-sm-4">
      <label className="col">date de départ : </label>
      <div className="col">
        <input
          type="date"
          value={startDate}
          name="startDate"
          onChange={changeTripDataState}
        />
      </div>
      <label className="col">Heure de départ : </label>
      <div className="col">
        <input
          type="time"
          value={startTime}
          name="startTime"
          onChange={changeTripDataState}
        />
      </div>
      <label className="col">date d'arrivée</label>

      <div className="col">
        <input
          type="date"
          value={endDate}
          name="endDate"
          onChange={changeTripDataState}
        />
      </div>
      <label className="col">Heure d'arrivée : </label>

      <div className="col">
        <input
          type="time"
          value={endTime}
          name="endTime"
          onChange={changeTripDataState}
        />
      </div>
      <label className="col">Prix :</label>
      <div>
        <input
          className="col"
          type="number"
          value={price}
          name="price"
          onChange={changeTripDataState}
        />
      </div>
      <label className="col">Nombre de place :</label>

      <div className="col">
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
