import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import shallow from 'zustand/shallow'
import useCompanyStore from '../../../stores/CompanyStore'
import GenericNav from '../../GenericNav'
import CompanyForm from './CompanyForm'
import CompanyList from './CompanyList'

const CompanySection = () => {
  const [fetchCompanies, clearCompanies] = useCompanyStore(
    (state) => [state.fetchCompanies, state.clearCompanies],
    shallow
  )
  const { action } = useParams()
  // const [action, setAction] = useState('')
  const [actionComponent, setActionComponent] = useState(<CompanyList />)

  function renderAction() {
    switch (action) {
      case 'form':
        setActionComponent(<CompanyForm />)
        break

      default:
        setActionComponent(<CompanyList />)

        break
    }
  }
  useEffect(() => {
    fetchCompanies()
    return () => {
      clearCompanies()
    }
  }, [])

  useEffect(() => {
    renderAction()
  }, [action])
  return (
    <div>
      <h1>Company Administration</h1>
      <GenericNav
        actions={[
          { value: 'list', label: 'list de sociétés' },
          { value: 'form', label: 'formulaire' },
        ]}
        section="company"
      />
      {actionComponent}
    </div>
  )
}

export default CompanySection
