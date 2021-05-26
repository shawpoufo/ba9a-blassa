import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useStationStore from '../../../stores/StationStore'
import shallow from 'zustand/shallow'
const StationForm = () => {
  const { id } = useParams()
  const [
    selectedStation,
    fetchStationById,
    errorMessage,
    createStation,
    updateStation,
    successMessage,
  ] = useStationStore(
    (state) => [
      state.selectedStation,
      state.fetchStationById,
      state.errorMessage,
      state.createStation,
      state.updateStation,
      state.successMessage,
    ],
    shallow
  )

  const [stationName, setStationName] = useState('')
  useEffect(() => {
    useStationStore.setState({ successMessage: '', errorMessage: '' })
    if (id) {
      useStationStore.setState({
        selectedStation: { ...selectedStation, id },
      })
      fetchStationById(id)
    }
    return () => {
      useStationStore.setState({
        selectedStation: { id: 0, name: '', city: '' },
      })
    }
  }, [])

  useEffect(() => {
    if (!stationName && id) setStationName(selectedStation.name)
  }, [selectedStation])

  useEffect(() => {
    useStationStore.setState({
      selectedStation: { id: 0, name: '', city: '' },
      errorMessage: '',
    })
    setStationName('')
  }, [id])

  function update(e) {
    useStationStore.setState({ selectedStation: selectedStation })
    updateStation()
    setStationName(useStationStore.getState().selectedStation.name)
  }
  function create(e) {
    createStation()
  }
  return (
    <div>
      {errorMessage !== 'station introuvable' ? (
        <div>
          <h3>
            {' '}
            {selectedStation.id
              ? 'Modifier la station : '
              : 'Ajoute une nouvelle station '}
            {stationName}
          </h3>
          <label>Station name</label>
          <input
            type="text"
            id={selectedStation.id}
            value={selectedStation.name}
            onChange={(e) =>
              useStationStore.setState({
                selectedStation: { ...selectedStation, name: e.target.value },
              })
            }
          />
          <label>Ville </label>

          <input
            type="text"
            name="city"
            value={selectedStation.city}
            onChange={(e) =>
              useStationStore.setState({
                selectedStation: { ...selectedStation, city: e.target.value },
              })
            }
          />
          {selectedStation.id ? (
            <button onClick={update}>Modifier</button>
          ) : (
            <button onClick={create}>Ajouter</button>
          )}
        </div>
      ) : (
        ''
      )}
      {errorMessage ? (
        <h3>Error : {errorMessage}</h3>
      ) : (
        <h3>{successMessage}</h3>
      )}
    </div>
  )
}
export default StationForm
