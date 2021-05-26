import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import shallow from 'zustand/shallow'
import useCompanyStore from '../../../stores/CompanyStore'
const CompanyList = () => {
  const [companies, removeCompany, errorMessage, successMessage] =
    useCompanyStore(
      (state) => [
        state.companies,
        state.removeCompany,
        state.errorMessage,
        state.successMessage,
      ],
      shallow
    )

  function remove(e) {
    if (window.confirm('veut tu supprimer la société ? ')) {
      removeCompany(e.target.getAttribute('data-company'))
    }
  }
  useEffect(() => {
    useCompanyStore.setState({ errorMessage: '', successMessage: '' })
  }, [])
  return (
    <div>
      <h4>{errorMessage ? errorMessage : successMessage}</h4>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => {
            return (
              <tr id={company.id} key={company.id}>
                <td>{company.id}</td>
                <td>{company.name}</td>
                <td>
                  <Link to={`/admin/company/form/${company.id}`}>update</Link>
                </td>
                <td>
                  <button data-company={company.id} onClick={remove}>
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
export default CompanyList
