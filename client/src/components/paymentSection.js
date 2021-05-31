import React, { useState } from 'react'
const PaymentSection = ({ selectedSeats, trip }) => {
  return (
    <div className="container dropdown">
      <label className="form-control">
        de {trip.Start.city} vers : {trip.End.city}
      </label>
      <label className="form-control">prix du voyage: {trip.price}</label>
      <div>
        {selectedSeats.map((seat) => (
          <span key={seat} className="badge rounded-pill bg-primary">
            {seat}
          </span>
        ))}
      </div>
      <label className="form-control">
        prix totale à payé : {trip.price * selectedSeats.length}
      </label>
    </div>
  )
}

export default PaymentSection
