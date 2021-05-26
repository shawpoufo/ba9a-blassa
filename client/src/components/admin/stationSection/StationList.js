import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import shallow from 'zustand/shallow'
import useStationStore from '../../../stores/StationStore'
const StationList = () => {
  const [station, removeStation, errorMessage, successMessage] =
    useStationStore(
      (state) => [
        state.station,
        state.removeStation,
        state.errorMessage,
        state.successMessage,
      ],
      shallow
    )

  function remove(e) {
    if (window.confirm('veut tu supprimer la station ? ')) {
      removeStation(e.target.getAttribute('data-station'))
    }
  }
  useEffect(() => {
    useStationStore.setState({ errorMessage: '', successMessage: '' })
  }, [])
  return (
    <div>
      <h4>{errorMessage ? errorMessage : successMessage}</h4>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>nom</th>
            <th>ville</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {station.map((stt) => {
            return (
              <tr id={stt.id} key={stt.id}>
                <td>{stt.id}</td>
                <td>{stt.name}</td>
                <td>{stt.city}</td>

                <td>
                  <Link to={`/admin/station/form/${stt.id}`}>update</Link>
                </td>
                <td>
                  <button data-station={stt.id} onClick={remove}>
                    delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default StationList
