import React, { useEffect } from 'react'
import useCompanyStore from '../../../stores/CompanyStore'
import shallow from 'zustand/shallow'

const CompanyPart = ({ selectedCompany, setCompany }) => {
  const [companies, fetchCompanies] = useCompanyStore(
    (state) => [state.companies, state.fetchCompanies],
    shallow
  )

  function changeCompanyState(e) {
    const name = e.target.value
    const c = companies.find((x) => x.name === name)
    setCompany({ id: c?.id ? c?.id : null, name })
  }

  useEffect(() => {
    fetchCompanies()
  }, [])
  return (
    <div>
      <div>
        <label>Company </label>
        <input
          onInput={changeCompanyState}
          name="company"
          list="companies"
          value={selectedCompany.name}
        />
        <datalist id="companies">
          {companies.map((company) => {
            return <option key={company.id} value={company.name} />
          })}
        </datalist>
      </div>
    </div>
  )
}

export default CompanyPart
