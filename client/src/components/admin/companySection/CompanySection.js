import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import shallow from 'zustand/shallow'
import useCompanyStore from '../../../stores/CompanyStore'
import GenericNav from '../../GenericNav'
import CompanyForm from './CompanyForm'
import CompanyList from './CompanyList'

const CompanySection = () => {
  const [
    companies,
    fetchCompanies,
    clearCompanies,
    selectedCompany,
    fetchCompanyById,
  ] = useCompanyStore(
    (state) => [
      state.companies,
      state.fetchCompanies,
      state.clearCompanies,
      state.selectedCompany,
      state.fetchCompanyById,
    ],
    shallow
  )
  function showCompanyInfo(e) {
    const id = parseInt(e.target.value)
    console.log(id)
    fetchCompanyById(id)
  }
  useEffect(() => {
    fetchCompanies()
    return () => {
      clearCompanies()
    }
  }, [])
  return (
    <div className="container">
      <select onChange={showCompanyInfo}>
        <option value={-1}>...</option>
        {companies.map((c) => {
          return (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          )
        })}
      </select>
      {selectedCompany ? <CompanyList /> : null}
    </div>
  )
}

export default CompanySection
