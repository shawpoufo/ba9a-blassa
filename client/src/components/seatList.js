import React, { Component, useEffect } from 'react'
import SvgSafetySeat from '../SafetySeat'

const SeatList = ({
  tripId,
  seatCount,
  Bookings,
  selectedSeats,
  setSelectedSeats,
}) => {
  function getSeatState(seat) {
    if (seat.isdisabled) return 'text-danger'
    else if (seat.isSelected) return 'text-primary'
    else return 'text-dark'
  }
  function getSeatsObjects() {
    const seatList = []
    for (let i = 1; i <= seatCount; i++) {
      seatList.push({
        number: i,
        isSelected: selectedSeats.includes(i),
        isdisabled: Bookings.find((b) => b.seatNumber === i) ? true : false,
      })
    }
    return seatList
  }
  function changeColor(e) {
    e.target.classList.toggle('text-dark')
    e.target.classList.toggle('text-primary')
  }
  function chooseSeat(e) {
    if (!e.target.classList.contains('text-danger')) {
      const seatNum = parseInt(e.target.getAttribute('data-seat-number'))
      changeColor(e)
      setSelectedSeats((state) =>
        state.find((s) => s === seatNum)
          ? state.filter((s) => parseInt(s) !== parseInt(seatNum))
          : [...state, parseInt(seatNum)]
      )
    }
    e.stopPropagation()
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-3"></div>

        <div className="col">
          <div className="row row-cols-4">
            {getSeatsObjects().map((seat) => (
              <div key={`${tripId}-${seat.number}`} className="col">
                <div className="row row-cols-1 text-center ">
                  <div
                    className="col h1"
                    role="button"
                    data-seat-number={seat.number}
                    onClick={chooseSeat}
                    className={getSeatState(seat)}>
                    <SvgSafetySeat
                      width="1.4em"
                      height="1.4em"
                      className={'h1'}
                      pointerEvents="none"
                    />
                  </div>
                  <div className={`col text-end ${getSeatState(seat)}`}>
                    {seat.number}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-3"></div>
      </div>
    </div>
  )
}

export default SeatList
