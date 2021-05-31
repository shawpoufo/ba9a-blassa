import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import GenericNav from '../../GenericNav'
import TripForm from './TripForm'
import TripList from './TripList'

const TripSection = () => {
  const { action } = useParams()
  const [actionComponent, setActionComponent] = useState(<TripList />)

  function renderAction() {
    switch (action) {
      case 'form':
        setActionComponent(<TripForm />)
        break

      default:
        setActionComponent(<TripList />)

        break
    }
  }
  useEffect(() => {
    renderAction()
  }, [action])
  return (
    <div>
      <h1>Voyages Administration</h1>
      {/* <GenericNav
        actions={[
          { value: 'list', label: 'list des voyages' },
          { value: 'form', label: 'formulaire' },
        ]}
        section="voyage"
      />
      {actionComponent} */}
      <TripForm />
    </div>
  )
}
export default TripSection
