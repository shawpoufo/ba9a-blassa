import React, { useEffect, useState } from 'react'
import shallow from 'zustand/shallow'
import SvgSafetySeat from '../SafetySeat'
import useBookingStore from '../stores/bookingStore'
import PaymentSection from './paymentSection'
import SeatList from './seatList'
const BookingModal = ({ trip }) => {
  const [selectedSeats, setSelectedSeats] = useState([])
  const [step, setStep] = useState(0)
  const [message, setMessage] = useState('')
  const [success, pay] = useBookingStore(
    (state) => [state.success, state.pay],
    shallow
  )
  useEffect(() => {
    if (success) {
      setStep(1)
      setMessage('Réservation éffectué avec succès ')
    } else {
      setStep(0)
      setMessage('')
    }
    setSelectedSeats([])
  }, [trip])

  function booking(e) {
    if (step) {
      pay(trip.id, selectedSeats)
    } else {
      next()
    }
  }
  function back(e) {
    setMessage('')
    setStep(0)
    useBookingStore.setState({ success: false })
  }
  function next() {
    if (!selectedSeats.length) {
      setMessage('veuillez choisire au moin une place')
      useBookingStore.setState((state) => ({ success: false }))
    } else {
      setStep(1)
      setMessage('')
    }
  }
  useEffect(() => {
    if (step) {
      if (!success) setMessage('veuillez vous connectez! ')
    }
  }, [success])

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Voyage : {trip.id}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {step ? (
                <PaymentSection selectedSeats={selectedSeats} trip={trip} />
              ) : (
                <SeatList
                  selectedSeats={selectedSeats}
                  tripId={trip.id}
                  seatCount={trip.seatCount}
                  Bookings={trip.Bookings}
                  setSelectedSeats={setSelectedSeats}
                />
              )}
            </div>
            <div className="modal-footer container">
              <div className="row">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal">
                    Fermer
                  </button>
                </div>
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={step ? false : true}
                    onClick={back}>
                    précedent
                  </button>
                </div>
                <div className="col">
                  <button
                    type="button"
                    className={`btn ${step ? 'btn-danger' : 'btn-primary'}`}
                    onClick={booking}>
                    {step ? 'Payer' : 'suivant'}
                  </button>
                </div>
              </div>
              <div className="row">
                <div
                  className={`col ${success ? 'text-success' : 'text-danger'}`}>
                  {message}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingModal
