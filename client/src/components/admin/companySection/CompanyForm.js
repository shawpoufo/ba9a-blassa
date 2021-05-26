import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useCompanyStore from '../../../stores/CompanyStore'
import shallow from 'zustand/shallow'
const CompanyForm = () => {
  const { id } = useParams()
  const [
    selectedCompany,
    fetchCompanyById,
    errorMessage,
    createCompany,
    updateCompany,
    successMessage,
  ] = useCompanyStore(
    (state) => [
      state.selectedCompany,
      state.fetchCompanyById,
      state.errorMessage,
      state.createCompany,
      state.updateCompany,
      state.successMessage,
    ],
    shallow
  )

  const [companyName, setCompanyName] = useState('')
  useEffect(() => {
    useCompanyStore.setState({ successMessage: '', errorMessage: '' })
    if (id) {
      useCompanyStore.setState({
        selectedCompany: { ...selectedCompany, id },
      })
      fetchCompanyById(id)
    }
    return () => {
      useCompanyStore.setState({ selectedCompany: { id: 0, name: '' } })
    }
  }, [])
  useEffect(() => {
    if (!companyName && id) setCompanyName(selectedCompany.name)
  }, [selectedCompany])

  useEffect(() => {
    useCompanyStore.setState({
      selectedCompany: { id: 0, name: '' },
      errorMessage: '',
    })
    setCompanyName('')
  }, [id])

  function update(e) {
    useCompanyStore.setState({ selectedCompany: selectedCompany })
    updateCompany()
    setCompanyName(useCompanyStore.getState().selectedCompany.name)
  }
  function create(e) {
    createCompany()
  }
  return (
    <div>
      {errorMessage.trim() !== 'company introuvable' ? (
        <div>
          <h3>
            {' '}
            {selectedCompany.id
              ? 'Modifier la compagnie : '
              : 'Ajoute une nouvelle compagnie '}
            {companyName}
          </h3>
          <input
            type="text"
            id={selectedCompany.id}
            value={selectedCompany.name}
            onChange={(e) =>
              useCompanyStore.setState({
                selectedCompany: { ...selectedCompany, name: e.target.value },
              })
            }
          />
          {selectedCompany.id ? (
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
export default CompanyForm
