import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import shallow from 'zustand/shallow'
import GenericNav from '../../GenericNav'
import StationForm from './StationForm'
import StationList from './StationList'
import useStationStore from '../../../stores/StationStore'

const StationSection = () => {
  const [fetchStations, clearStations] = useStationStore(
    (state) => [state.fetchStations, state.clearStations],
    shallow
  )
  const { action } = useParams()
  // const [action, setAction] = useState('')
  const [actionComponent, setActionComponent] = useState(<StationList />)

  function renderAction() {
    switch (action) {
      case 'form':
        setActionComponent(<StationForm />)
        break

      default:
        setActionComponent(<StationList />)

        break
    }
  }
  useEffect(() => {
    fetchStations()
    return () => {
      clearStations()
    }
  }, [])

  useEffect(() => {
    renderAction()
  }, [action])
  return (
    <div>
      <h1>Station Administration</h1>
      <GenericNav
        actions={[
          { value: 'list', label: 'list des stations' },
          { value: 'form', label: 'formulaire' },
        ]}
        section="station"
      />
      {actionComponent}
    </div>
  )
}

export default StationSection
