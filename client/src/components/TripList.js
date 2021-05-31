import React, { useEffect, useState } from 'react'
import useTripStore from '../stores/TripStore'
import shallow from 'zustand/shallow'
import 'bootstrap/dist/css/bootstrap.min.css'
import bootstrap from 'bootstrap'
import BookingSection from './bookingSection'
import TripInfo from './tripInfo'
import StopOverList from './stopOverList'
import TripCard from './tripCard'
import BookingModal from './bookingModal'
const TripList = () => {
  const [trips, errorMessage, count] = useTripStore(
    (state) => [state.trips, state.errorMessage, state.count],
    shallow
  )
  const [tripToShow, setTripToShow] = useState({
    id: -1,
    check: true,
  })
  const [selectedTrip, setSelectedTrip] = useState(null)

  useEffect(() => {
    if (selectedTrip && trips.length) {
      setSelectedTrip((state) => trips.find((t) => t.id === selectedTrip.id))
    }
    if (!trips.length) {
      setSelectedTrip(null)
    }
  }, [trips])

  function chooseTrip(e) {
    const trip = trips.find(
      (trip) => trip.id === parseInt(e.target.getAttribute('data-trip-id'))
    )
    setSelectedTrip(trip)
  }

  return !errorMessage ? (
    <div className="container mt-5">
      <h2>nombre de voyages trouvée : {count}</h2>
      <h3>
        {trips.length} voyages sur {count} affiché
      </h3>
      <div className="row row-cols-1 row-cols-md-2">
        {trips.map((trip) => {
          return (
            <div className="col" key={trip.id}>
              <div className="card">
                <div className="card-header bg-transparent text-start ">
                  <span className="badge bg-dark text-light">{trip.id}</span>
                </div>
                {/* BODY */}
                {trip.hasOwnProperty('Company') ? (
                  <TripCard trip={trip} tripToShow={tripToShow} />
                ) : null}
                {/* FOOTER */}
                <div className="card-footer container">
                  <div className="row justify-content-evenly">
                    <div className="col">
                      <ToggleTripButton
                        trip={trip}
                        setTripToShow={setTripToShow}
                      />
                    </div>
                    <div className="col text-end">
                      {/* <button className="btn btn-primary" data-trip={trip.id}>
                        Réserver
                      </button> */}
                      {/* <BookingSection trip={trip} />
                       */}
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-trip-id={trip.id}
                        data-bs-target="#exampleModal"
                        onClick={chooseTrip}>
                        Réserver
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        <BookingModal trip={selectedTrip} />
      </div>
    </div>
  ) : (
    <div></div>
  )
}

const ToggleTripButton = ({ trip, setTripToShow }) => {
  const [text, setText] = useState('Escale')
  const [toggle, setToggle] = useState(true)
  function changeText() {
    toggle ? setText('Escales') : setText('Voyage')
  }
  useEffect(() => changeText(), [toggle])
  return (
    <button
      className="btn btn-primary"
      type="button"
      data-trip={trip.id}
      onClick={(e) => {
        setTripToShow((state) => ({
          id: e.target.getAttribute('data-trip'),
          check: !state.check,
        }))
        setToggle((state) => !state)
      }}>
      {text}
    </button>
  )
}

export default TripList
